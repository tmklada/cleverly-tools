export interface ErrorEntry {
  id: string;
  timestamp: string;
  tool: string;
  platform: string;
  url: string;
  error: string;
  statusCode?: number;
}

// In-memory store (survives within the same serverless instance)
const MAX_ERRORS = 100;
const errorLog: ErrorEntry[] = [];

export function logError(entry: Omit<ErrorEntry, "id" | "timestamp">) {
  const newEntry: ErrorEntry = {
    id: Math.random().toString(36).slice(2, 9),
    timestamp: new Date().toISOString(),
    ...entry,
  };
  errorLog.unshift(newEntry);
  if (errorLog.length > MAX_ERRORS) errorLog.pop();
}

export function getErrors(): ErrorEntry[] {
  return [...errorLog];
}

export function clearErrors() {
  errorLog.length = 0;
}
