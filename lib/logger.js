// lib/logger.js
export function logRequest(req) {
    const log = `[${new Date().toISOString()}] ${req.method} ${req.url}`;
    console.log(log);
  }
  