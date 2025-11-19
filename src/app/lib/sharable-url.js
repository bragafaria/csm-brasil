// app/lib/shareable-url.js   ← 100% safe for client + server

import LZString from "lz-string";

export function createPermanentReportUrl(data) {
  const jsonStr = JSON.stringify(data);
  const compressed = LZString.compressToEncodedURIComponent(jsonStr);
  const typeCodeWithDashes = data.results?.typeCode || "UNKNOWN";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return `${baseUrl}/report/${typeCodeWithDashes}?data=${compressed}`;
}
