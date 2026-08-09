"use client";

import React, { useEffect, useRef } from "react";

interface ParticleTextProps {
  text: string;
  particleSize?: number;
  density?: number;
  color?: string;
  highlightColor?: string;
  scatter?: number;
  gatherDuration?: number;
  stagger?: number;
  pointerRepel?: number;
  repelRadius?: number;
  idleDrift?: number;
  trigger?: "mount" | "hover" | "click";
  fontSize?: string | number;
  fontWeight?: string | number;
  fontFamily?: string;
  glow?: boolean;
}

export default function ParticleText({
  text,
  particleSize = 2.2,
  density = 4,
  color = "#ffffff",
  highlightColor = "#ffffff",
  scatter = 190,
  gatherDuration = 1600,
  stagger = 420,
  pointerRepel = 42,
  repelRadius = 120,
  idleDrift = 0.8,
  trigger = "mount",
  fontSize = 100,
  fontWeight = 800,
  fontFamily = "inherit",
  glow = false,
}: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let particles: any[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000, radius: repelRadius };

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Basic font parsing logic
      let parsedFontSize = 100;
      if (typeof fontSize === "string") {
         if (fontSize.includes("clamp")) {
             // simplified: just use a responsive size based on canvas width, made massive for visibility
             parsedFontSize = Math.max(100, Math.min(canvas.width * 0.25, 200));
         } else {
             parsedFontSize = parseInt(fontSize) || 100;
         }
      } else {
         parsedFontSize = fontSize;
      }
      
      // Resolve Next.js CSS variable to actual font family name
      let actualFontFamily = fontFamily || "sans-serif";
      if (actualFontFamily.startsWith("var(")) {
          // Extract the variable name (e.g., --font-syne) and get its computed value
          const varName = actualFontFamily.match(/var\(([^)]+)\)/)?.[1];
          if (varName) {
              actualFontFamily = window.getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || "sans-serif";
          } else {
              actualFontFamily = "sans-serif";
          }
      } else if (actualFontFamily === "inherit") {
          actualFontFamily = window.getComputedStyle(canvas).fontFamily || "sans-serif";
      }
      
      // Fallback if the extracted value is empty
      if (!actualFontFamily) actualFontFamily = "sans-serif";
      
      ctx.fillStyle = "white";
      ctx.font = `${fontWeight} ${parsedFontSize}px ${actualFontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < canvas.height; y += density) {
        for (let x = 0; x < canvas.width; x += density) {
          const index = (y * canvas.width + x) * 4;
          const alpha = imgData[index + 3];

          if (alpha > 128) {
            const isHighlight = Math.random() > 0.8;
            const targetX = x;
            const targetY = y;
            
            // Random start position based on scatter
            const startX = targetX + (Math.random() - 0.5) * scatter * 5;
            const startY = targetY + (Math.random() - 0.5) * scatter * 5;

            particles.push({
              x: startX,
              y: startY,
              targetX,
              targetY,
              size: particleSize * (Math.random() * 0.5 + 0.5),
              color: isHighlight ? highlightColor : color,
              vx: 0,
              vy: 0,
              delay: Math.random() * stagger,
              time: 0,
              drifX: (Math.random() - 0.5) * idleDrift,
              drifY: (Math.random() - 0.5) * idleDrift,
            });
          }
        }
      }
    };

    let lastTime = 0;
    const animate = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.time += dt;
        if (p.time < p.delay && trigger === "mount") return;

        // Spring towards target
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        
        // Mouse repel
        const distToMouse = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        let forceX = 0;
        let forceY = 0;
        
        if (distToMouse < mouse.radius) {
          const force = (mouse.radius - distToMouse) / mouse.radius;
          const angle = Math.atan2(p.y - mouse.y, p.x - mouse.x);
          forceX = Math.cos(angle) * force * pointerRepel;
          forceY = Math.sin(angle) * force * pointerRepel;
        }

        // Basic ease (interpolate gather duration)
        const ease = 0.05 + Math.min((p.time / gatherDuration) * 0.05, 0.05);
        p.x += (dx * ease) + forceX + (Math.sin(time * 0.001 + p.x) * p.drifX);
        p.y += (dy * ease) + forceY + (Math.cos(time * 0.001 + p.y) * p.drifY);

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
        mouse.x = -1000;
        mouse.y = -1000;
    }
    
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    
    // Ensure font is loaded before reading pixels
    document.fonts.ready.then(() => {
        resize();
        lastTime = performance.now();
        animate(lastTime);
    });

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [text, particleSize, density, color, highlightColor, scatter, gatherDuration, stagger, pointerRepel, repelRadius, idleDrift, trigger, fontSize, fontWeight, fontFamily, glow]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full block" 
      style={{
        filter: glow ? `drop-shadow(0 0 10px ${highlightColor})` : 'none'
      }}
    />
  );
}
