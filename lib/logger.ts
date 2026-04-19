import fs from 'fs';
import path from 'path';

const LOG_FILE_PATH = path.join(process.cwd(), 'data', 'logs.json');

export interface LogEntry {
    timestamp: string;
    path: string;
    userAgent: string;
    ip: string;
    country?: string;
    deviceType?: string;
    browser?: string;
}

// Helper to ensure directory exists
const ensureDirectoryExists = () => {
    const dir = path.dirname(LOG_FILE_PATH);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

export const saveLog = async (entry: Omit<LogEntry, 'timestamp'>) => {
    ensureDirectoryExists();

    const newLog: LogEntry = {
        ...entry,
        timestamp: new Date().toISOString(),
    };

    let logs: LogEntry[] = [];

    if (fs.existsSync(LOG_FILE_PATH)) {
        try {
            const fileContent = fs.readFileSync(LOG_FILE_PATH, 'utf-8');
            logs = JSON.parse(fileContent);
        } catch (error) {
            console.error('Error reading log file:', error);
        }
    }

    logs.push(newLog);

    try {
        fs.writeFileSync(LOG_FILE_PATH, JSON.stringify(logs, null, 2));
    } catch (error) {
        console.error('Error writing log file:', error);
    }
};

export const getLogs = async (): Promise<LogEntry[]> => {
    if (!fs.existsSync(LOG_FILE_PATH)) {
        return [];
    }
    try {
        const fileContent = fs.readFileSync(LOG_FILE_PATH, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error('Error reading log file:', error);
        return [];
    }
};
