"use client";
import { useState } from "react";

type Delimiter = "," | ";" | "\t";

function csvToJson(csv: string, delimiter: Delimiter, hasHeaders: boolean): unknown[] {
  const lines = csv.trim().split(/\r?\n/).filter(l => l.trim());
  if (lines.length === 0) throw new Error("Empty CSV");

  const splitLine = (line: string): string[] => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
        else inQuotes = !inQuotes;
      } else if (ch === delimiter && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    result.push(current.trim());
    return result;
  };

  if (!hasHeaders) {
    return lines.map(line => splitLine(line));
  }

  const headers = splitLine(lines[0]);
  return lines.slice(1).map(line => {
    const values = splitLine(line);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => { obj[h] = values[i] ?? ""; });
    return obj;
  });
}

export default function CsvToJson() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [delimiter, setDelimiter] = useState<Delimiter>(",");
  const [hasHeaders, setHasHeaders] = useState(true);
  const [copied, setCopied] = useState(false);

  function convert() {
    setError("");
    setOutput("");
    if (!input.trim()) { setError("Please enter CSV data"); return; }
    try {
      const json = csvToJson(input, delimiter, hasHeaders);
      setOutput(JSON.stringify(json, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
    }
  }

  function copy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function download() {
    const blob = new Blob([output], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "data.json";
    a.click();
  }

  const sampleCsv = `name,age,city\nAlice,28,NYC\nBob,34,LA\nCarol,22,Chicago`;

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">CSV Input</label>
          <button onClick={() => setInput(sampleCsv)} className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400">Load Sample</button>
        </div>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={6}
          placeholder={"name,age,city\nAlice,28,NYC\nBob,34,LA"}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
        />
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Delimiter</label>
          <div className="flex gap-1">
            {([",", ";", "\t"] as Delimiter[]).map(d => (
              <button key={d} onClick={() => setDelimiter(d)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${delimiter === d ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}>
                {d === "\t" ? "Tab" : d === "," ? "Comma" : "Semicolon"}
              </button>
            ))}
          </div>
        </div>
        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300 mt-4 sm:mt-0">
          <input type="checkbox" checked={hasHeaders} onChange={e => setHasHeaders(e.target.checked)} className="w-4 h-4 accent-blue-600" />
          First row as headers
        </label>
      </div>

      {error && <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{error}</p>}

      <button onClick={convert}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
        Convert to JSON
      </button>

      {output && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">JSON Output</p>
            <div className="flex gap-2">
              <button onClick={copy} className="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                {copied ? "Copied!" : "Copy"}
              </button>
              <button onClick={download} className="text-xs px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                Download .json
              </button>
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            rows={8}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-900 text-green-400 font-mono text-sm resize-none focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
