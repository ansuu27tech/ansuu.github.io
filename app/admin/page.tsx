"use client";

import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { Download, RefreshCw } from "lucide-react";

interface LogEntry {
    timestamp: string;
    path: string;
    userAgent: string;
    ip: string;
    country?: string;
}

export default function AdminPage() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            // In a real app we'd have a separate GET endpoint, 
            // but for now let's assume we can fetch data or we just add a GET handler to the same route
            // Wait, I didn't add a GET handler to /api/track in the plan.
            // I should add a simple GET route or action.
            // Let's create a server action or just use an API route. 
            // I'll create a new API route for fetching logs or modify the track one.
            // Actually, let's just make a new endpoint /api/logs for admin.
            const res = await fetch("/api/logs");
            if (res.ok) {
                const data = await res.json();
                setLogs(data.reverse()); // Show newest first
            }
        } catch (error) {
            console.error("Failed to fetch logs", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(logs);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Visitor Logs");
        XLSX.writeFile(workbook, `visitor_logs_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold font-heading">Visitor Logs</h1>
                        <p className="text-gray-400 mt-2">Monitor website traffic and analytics</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={fetchLogs}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg flex items-center gap-2 transition-colors border border-white/10"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </button>
                        <button
                            onClick={downloadExcel}
                            className="px-4 py-2 bg-brand-mint text-black font-bold rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
                        >
                            <Download className="w-4 h-4" />
                            Export Excel
                        </button>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm opacity-90">
                            <thead className="bg-white/5 text-gray-400 uppercase tracking-wider text-xs">
                                <tr>
                                    <th className="px-6 py-4">Time</th>
                                    <th className="px-6 py-4">Path</th>
                                    <th className="px-6 py-4">IP Address</th>
                                    <th className="px-6 py-4">Country</th>
                                    <th className="px-6 py-4">User Agent</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {logs.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                            No logs found yet.
                                        </td>
                                    </tr>
                                )}
                                {logs.map((log, i) => (
                                    <tr key={i} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                            {new Date(log.timestamp).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-brand-mint">{log.path}</td>
                                        <td className="px-6 py-4 font-mono text-gray-400">{log.ip}</td>
                                        <td className="px-6 py-4">{log.country || '-'}</td>
                                        <td className="px-6 py-4 max-w-xs truncate text-gray-500" title={log.userAgent}>
                                            {log.userAgent}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
