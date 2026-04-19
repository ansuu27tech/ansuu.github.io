import { NextResponse } from 'next/server';
import { getLogs } from '@/lib/logger';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const logs = await getLogs();
        return NextResponse.json(logs);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
    }
}
