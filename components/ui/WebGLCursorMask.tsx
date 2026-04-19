"use client";

import { useRef, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// GLSL SOURCE
// ─────────────────────────────────────────────────────────────────────────────

const VERT_SRC = /* glsl */ `#version 300 es
in vec2 a_pos;
out vec2 v_uv;
void main() {
  v_uv        = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG_SRC = /* glsl */ `#version 300 es
precision highp float;

in  vec2 v_uv;
out vec4 fragColor;

uniform sampler2D u_base;
uniform sampler2D u_reveal;

uniform vec2  u_blobs[20];
uniform float u_radii[20];
uniform int   u_count;
uniform vec2  u_resolution;
uniform vec2  u_texResolution;

void main() {
  vec2 uv  = v_uv;

  // Aspect-ratio correction for the image texture (Object-Fit: Contain, Bottom-Center aligned)
  vec2 texUV = uv;
  if (u_texResolution.x > 0.0 && u_texResolution.y > 0.0) {
    float rs = u_resolution.x / u_resolution.y;
    float ri = u_texResolution.x / u_texResolution.y;
    vec2 texAspect = vec2(1.0);
    
    if (rs > ri) {
      texAspect = vec2(rs / ri, 1.0);
    } else {
      texAspect = vec2(1.0, ri / rs);
    }
    texUV.x = (uv.x - 0.5) * texAspect.x + 0.5;
    texUV.y = uv.y * texAspect.y;
  }

  // Aspect-ratio correction so blobs appear circular on screen.
  // Both the UV sample position and each blob position are scaled by (w/h, 1),
  // keeping the Y axis as the reference unit. The radius stays in Y-UV units.
  vec2 asp = vec2(u_resolution.x / u_resolution.y, 1.0);

  // ── Metaball scalar field ─────────────────────────────────────────────────
  float field = 0.0;
  for (int i = 0; i < 20; i++) {
    if (i >= u_count) break;
    vec2  d = (uv - u_blobs[i]) * asp;   // aspect-corrected distance
    float r = u_radii[i];
    field += (r * r) / max(dot(d, d), 0.00001);
  }

  // Organic liquid threshold
  float mask = smoothstep(0.80, 1.10, field);

  // ── Base layer & Reveal layer ───────────────────────────────────────────────
  vec4 dark;
  vec4 vivid;
  if (texUV.x < 0.0 || texUV.x > 1.0 || texUV.y < 0.0 || texUV.y > 1.0) {
    dark = vec4(0.0);
    vivid = vec4(0.0);
  } else {
    dark = texture(u_base, texUV);
    float ca   = mask * (1.0 - mask) * 0.022;
    vec2  dir  = uv - 0.5;
    float rC   = texture(u_reveal, texUV + dir * ca * 1.8).r;
    float gC   = texture(u_reveal, texUV + dir * ca * 0.6).g;
    float bC   = texture(u_reveal, texUV - dir * ca * 0.4).b;
    float aC   = texture(u_reveal, texUV).a;
    vivid = vec4(rC, gC, bC, aC);
  }

  // ── Rim glow: isolate the edge ring, apply a blue→red gradient ───────────
  float rim      = smoothstep(0.0, 0.3, mask) * (1.0 - smoothstep(0.7, 1.0, mask));
  vec3  rimColor = mix(vec3(0.2, 0.6, 1.0), vec3(1.0, 0.2, 0.35), v_uv.x);
  vec4  glow     = vec4(rimColor * rim * 0.22, 0.0);

  // ── Final composite ───────────────────────────────────────────────────────
  // Standard alpha blending to keep the helmet completely solid where it shouldn't be transparent
  vec3 blendedReveal = mix(dark.rgb, vivid.rgb, vivid.a);
  vec3 finalRGB = mix(dark.rgb, blendedReveal, mask) + glow.rgb;
  
  // Calculate final alpha preserving transparency outside the mask
  // Inside the mask, use the solid helmet's alpha
  float finalAlpha = mix(dark.a, max(dark.a, vivid.a), mask);
  
  // Ensure the glow ring adds alpha so it's fully visible
  finalAlpha = clamp(finalAlpha + length(glow.rgb) * 2.0, 0.0, 1.0);

  fragColor = vec4(finalRGB, finalAlpha);
}`;

// ─────────────────────────────────────────────────────────────────────────────
// GL HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function compileShader(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    throw new Error('Shader compile error:\n' + gl.getShaderInfoLog(s));
  }
  return s;
}

function createProgram(gl: WebGL2RenderingContext, vert: string, frag: string): WebGLProgram {
  const p = gl.createProgram()!;
  gl.attachShader(p, compileShader(gl, gl.VERTEX_SHADER, vert));
  gl.attachShader(p, compileShader(gl, gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    throw new Error('Program link error:\n' + gl.getProgramInfoLog(p));
  }
  return p;
}

function loadTexture(gl: WebGL2RenderingContext, src: string, onLoad: (w: number, h: number) => void): WebGLTexture {
  const tex = gl.createTexture()!;
  // Temporary 1x1 pixel until loaded
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    onLoad(img.width, img.height);
  };
  img.src = src;
  return tex;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  bgSrc: string;
  fgSrc: string;
}

export default function WebGLCursorMask({ bgSrc, fgSrc }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Context Setup ───────────────────────────────────────────────────────
    const gl = canvas.getContext('webgl2', { antialias: true, alpha: true });
    if (!gl) {
      console.warn("WebGL2 not supported, cursor mask disabled.");
      return;
    }
    
    // Transparent background integration
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let program: WebGLProgram;
    try {
      program = createProgram(gl, VERT_SRC, FRAG_SRC);
    } catch (e) {
      console.error(e);
      return;
    }
    gl.useProgram(program);

    // ── Fullscreen quad ─────────────────────────────────────────────────────
    const quadBuf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // ── Uniforms ────────────────────────────────────────────────────────────
    const uBase = gl.getUniformLocation(program, 'u_base');
    const uReveal = gl.getUniformLocation(program, 'u_reveal');
    const uBlobs = gl.getUniformLocation(program, 'u_blobs');
    const uRadii = gl.getUniformLocation(program, 'u_radii');
    const uCount = gl.getUniformLocation(program, 'u_count');
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uTexRes = gl.getUniformLocation(program, 'u_texResolution');
    gl.uniform1i(uBase, 0);
    gl.uniform1i(uReveal, 1);

    // ── Load Textures ───────────────────────────────────────────────────────
    let texW = 0, texH = 0;
    const onLoad = (w: number, h: number) => { 
      if (w > 0 && h > 0) { texW = w; texH = h; }
    };
    const texBase = loadTexture(gl, bgSrc, onLoad);
    const texReveal = loadTexture(gl, fgSrc, onLoad);

    // ── Resize ─────────────────────────────────────────────────────────────
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const w = Math.floor(window.innerWidth * DPR);
      const h = Math.floor(window.innerHeight * DPR);
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.useProgram(program);
      gl.uniform2f(uRes, w, h);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // ── Particle System ─────────────────────────────────────────────────────
    const MAX_TRAIL = 19;
    const cursor = {
      x: -2.0, y: -2.0,
      tx: -2.0, ty: -2.0,
      r: 0.115,
    };
    const trail: Array<{ x: number, y: number, tx: number, ty: number, r: number, life: number, decay: number }> = [];
    
    let lastSpawnMs = 0;
    let prevUX = -1, prevUY = -1;

    function toUV(cx: number, cy: number) {
      // Use window coordinates since this mask sits absolute fullscreen
      return {
        x: cx / window.innerWidth,
        y: 1.0 - cy / window.innerHeight,
      };
    }

    function handleMove(cx: number, cy: number) {
      const { x: mx, y: my } = toUV(cx, cy);

      // Teleport immediately if coming from off-screen
      if (cursor.x < -1) {
        cursor.x = mx;
        cursor.y = my;
      }
      
      cursor.tx = mx;
      cursor.ty = my;

      if (prevUX >= 0) {
        const dx = mx - prevUX;
        const dy = my - prevUY;
        const speed = Math.sqrt(dx * dx + dy * dy);
        const now = performance.now();

        if (speed > 0.0008 && now - lastSpawnMs > 25 && trail.length < MAX_TRAIL) {
          const r = Math.min(0.058 + speed * 3.2, 0.12);
          trail.push({
            x: mx, y: my,
            tx: mx, ty: my,
            r,
            life: 1.0,
            decay: 0.010 + Math.random() * 0.008,
          });
          lastSpawnMs = now;
        }
      }
      prevUX = mx;
      prevUY = my;
    }

    const onMouse = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onLeave = () => { prevUX = -1; prevUY = -1; cursor.tx = -2.0; cursor.ty = -2.0; cursor.x = -2.0; cursor.y = -2.0; };
    const onTouch = (e: TouchEvent) => handleMove(e.touches[0].clientX, e.touches[0].clientY);

    // Note: since this is an absolute/fixed background layer, we bind
    // listeners to the window so we always get events.
    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('mouseleave', onLeave, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true }); // Need passive true for performance, we don't preventDefault here

    // ── Render loop ─────────────────────────────────────────────────────────
    let raf = 0;
    const posArr = new Float32Array(20 * 2);
    const radArr = new Float32Array(20);

    function frame() {
      raf = requestAnimationFrame(frame);
      if (!gl) return;

      if (cursor.tx > -1) {
        cursor.x += (cursor.tx - cursor.x) * 0.09;
        cursor.y += (cursor.ty - cursor.y) * 0.09;
      }

      for (let i = trail.length - 1; i >= 0; i--) {
        const b = trail[i];
        b.life -= b.decay;
        if (b.life < 0.01) { trail.splice(i, 1); continue; }
        b.x += (b.tx - b.x) * 0.16;
        b.y += (b.ty - b.y) * 0.16;
      }

      posArr[0] = cursor.x;
      posArr[1] = cursor.y;
      radArr[0] = cursor.r;

      for (let i = 0; i < trail.length; i++) {
        const b = trail[i];
        const idx = i + 1;
        posArr[idx * 2] = b.x;
        posArr[idx * 2 + 1] = b.y;
        radArr[idx] = b.r * Math.pow(b.life, 0.55);
      }

      const count = Math.min(1 + trail.length, 20);

      gl.useProgram(program);
      gl.uniform2fv(uBlobs, posArr);
      gl.uniform1fv(uRadii, radArr);
      gl.uniform1i(uCount, count);
      gl.uniform2f(uTexRes, texW, texH);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texBase);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, texReveal);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('touchmove', onTouch);
      gl?.deleteProgram(program);
      gl?.deleteBuffer(quadBuf);
      gl?.deleteTexture(texBase);
      gl?.deleteTexture(texReveal);
    };
  }, [bgSrc, fgSrc]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
