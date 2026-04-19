import { NextRequest, NextResponse } from 'next/server';
import { saveLog } from '@/lib/logger';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // 1. Get IP Address
        let ip = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown';

        if (ip.includes(',')) {
            ip = ip.split(',')[0].trim();
        }

        // 2. Identify Country
        let country = request.headers.get('x-vercel-ip-country') ||
            request.headers.get('cf-ipcountry') || // Cloudflare fallback
            null;

        // 3. Fallback: Localhost / Private IP checks
        if (ip === '::1' || ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
            country = 'Local Dev';
        }

        // 4. Fallback: External API (only if valid public IP and country missing)
        if (!country && ip !== 'unknown' && ip.length > 6) {
            try {
                // Short timeout to not block the request too long
                const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=country`, { signal: AbortSignal.timeout(1000) });
                if (geoRes.ok) {
                    const geoData = await geoRes.json();
                    if (geoData.country) country = geoData.country;
                }
            } catch (e) {
                // Ignore API errors/timeouts
                console.warn('Geo lookup failed', e);
            }
        }

        // Default if all else fails
        country = country || 'Unknown';

        // simple masking for storage
        let maskedIp = ip;
        if (ip.includes('.') && ip.split('.').length === 4) {
            maskedIp = ip.split('.').slice(0, 3).join('.') + '.xxx';
        }

        await saveLog({
            path: body.path || '/',
            userAgent: body.userAgent || 'unknown',
            ip: maskedIp,
            country,
        });

        return NextResponse.json({ success: true, debug: { ip: maskedIp, country } });
    } catch (error) {
        console.error('Tracking error:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
