"use client";
import { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";

export default function WifiQrCodeGenerator() {
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [security, setSecurity] = useState<"WPA" | "WEP" | "nopass">("WPA");
  const [hidden, setHidden] = useState(false);
  const [generated, setGenerated] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function getWifiString() {
    return `WIFI:T:${security};S:${ssid};P:${password};H:${hidden};;`;
  }

  function generate() {
    if (!ssid) return;
    setGenerated(true);
  }

  useEffect(() => {
    if (!generated || !canvasRef.current || !ssid) return;
    QRCode.toCanvas(canvasRef.current, getWifiString(), {
      width: 256,
      errorCorrectionLevel: "M",
      margin: 2,
    }).catch(() => {});
  }, [generated, ssid, password, security, hidden]);

  function download() {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `wifi-${ssid}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Network Name (SSID)
        </label>
        <input
          type="text"
          value={ssid}
          onChange={(e) => { setSsid(e.target.value); setGenerated(false); }}
          placeholder="MyWiFiNetwork"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Password
        </label>
        <input
          type="text"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setGenerated(false); }}
          placeholder="Password"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Security Type
          </label>
          <div className="flex gap-2">
            {(["WPA", "WEP", "nopass"] as const).map((s) => (
              <button
                key={s}
                onClick={() => { setSecurity(s); setGenerated(false); }}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  security === s
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                {s === "nopass" ? "None" : s}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 pt-6">
          <input
            type="checkbox"
            id="hidden"
            checked={hidden}
            onChange={(e) => { setHidden(e.target.checked); setGenerated(false); }}
            className="w-4 h-4 accent-blue-600"
          />
          <label htmlFor="hidden" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Hidden Network
          </label>
        </div>
      </div>

      <button
        onClick={generate}
        disabled={!ssid}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold rounded-xl transition-colors"
      >
        Generate WiFi QR Code
      </button>

      {generated && ssid && (
        <div className="flex flex-col items-center gap-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
          <canvas ref={canvasRef} className="rounded-lg" />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Scan to connect to <strong>{ssid}</strong>
          </p>
          <button
            onClick={download}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
          >
            Download PNG
          </button>
        </div>
      )}
    </div>
  );
}
