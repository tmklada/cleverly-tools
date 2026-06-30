"use client";
import { useState } from "react";

interface LineItem {
  id: number;
  description: string;
  qty: number;
  rate: number;
}

let nextId = 1;

export default function InvoiceGenerator() {
  const [bizName, setBizName] = useState("Your Company");
  const [bizAddress, setBizAddress] = useState("123 Main St, City, State 10001");
  const [bizEmail, setBizEmail] = useState("hello@company.com");
  const [clientName, setClientName] = useState("Client Name");
  const [clientAddress, setClientAddress] = useState("456 Client Ave, City, State");
  const [clientEmail, setClientEmail] = useState("client@email.com");
  const [invoiceNo, setInvoiceNo] = useState("INV-001");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState("");
  const [taxRate, setTaxRate] = useState("0");
  const [notes, setNotes] = useState("Thank you for your business!");
  const [items, setItems] = useState<LineItem[]>([
    { id: nextId++, description: "Service / Product", qty: 1, rate: 100 },
  ]);

  const addItem = () => {
    setItems((prev) => [...prev, { id: nextId++, description: "", qty: 1, rate: 0 }]);
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateItem = (id: number, field: keyof LineItem, value: string | number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  const subtotal = items.reduce((s, i) => s + i.qty * i.rate, 0);
  const tax = subtotal * (parseFloat(taxRate) / 100);
  const total = subtotal + tax;

  const print = () => window.print();

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #invoice-print, #invoice-print * { visibility: visible; }
          #invoice-print { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="no-print grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Your Business</h3>
            <div className="space-y-3">
              {[
                { label: "Business Name", val: bizName, set: setBizName },
                { label: "Address", val: bizAddress, set: setBizAddress },
                { label: "Email", val: bizEmail, set: setBizEmail },
              ].map(({ label, val, set }) => (
                <div key={label}>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</label>
                  <input value={val} onChange={(e) => set(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Client Info</h3>
            <div className="space-y-3">
              {[
                { label: "Client Name", val: clientName, set: setClientName },
                { label: "Address", val: clientAddress, set: setClientAddress },
                { label: "Email", val: clientEmail, set: setClientEmail },
              ].map(({ label, val, set }) => (
                <div key={label}>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</label>
                  <input value={val} onChange={(e) => set(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 sm:col-span-2">
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[
                { label: "Invoice #", val: invoiceNo, set: setInvoiceNo },
                { label: "Date", val: invoiceDate, set: setInvoiceDate, type: "date" },
                { label: "Due Date", val: dueDate, set: setDueDate, type: "date" },
              ].map(({ label, val, set, type }) => (
                <div key={label}>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</label>
                  <input type={type || "text"} value={val} onChange={(e) => set(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="invoice-print" className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-black text-gray-900 dark:text-white">{bizName}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 whitespace-pre-line">{bizAddress}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{bizEmail}</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">INVOICE</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">#{invoiceNo}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Date: {invoiceDate}</p>
              {dueDate && <p className="text-sm text-red-500">Due: {dueDate}</p>}
            </div>
          </div>

          <div className="mb-6 bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Bill To</p>
            <p className="font-bold text-gray-900 dark:text-white">{clientName}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{clientAddress}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{clientEmail}</p>
          </div>

          <table className="w-full mb-6">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 text-sm font-semibold text-gray-600 dark:text-gray-400">Description</th>
                <th className="text-right py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 w-16">Qty</th>
                <th className="text-right py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 w-24">Rate</th>
                <th className="text-right py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 w-24">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 dark:border-gray-800 group">
                  <td className="py-2">
                    <input value={item.description} onChange={(e) => updateItem(item.id, "description", e.target.value)}
                      className="no-print w-full bg-transparent text-gray-900 dark:text-white focus:outline-none text-sm border-b border-transparent focus:border-blue-500" placeholder="Item description" />
                    <span className="hidden print:block text-gray-900 dark:text-white text-sm">{item.description}</span>
                  </td>
                  <td className="py-2 text-right">
                    <input type="number" value={item.qty} onChange={(e) => updateItem(item.id, "qty", parseFloat(e.target.value) || 0)}
                      className="no-print w-16 bg-transparent text-right text-gray-900 dark:text-white focus:outline-none text-sm border-b border-transparent focus:border-blue-500" />
                    <span className="hidden print:block">{item.qty}</span>
                  </td>
                  <td className="py-2 text-right">
                    <input type="number" value={item.rate} onChange={(e) => updateItem(item.id, "rate", parseFloat(e.target.value) || 0)}
                      className="no-print w-24 bg-transparent text-right text-gray-900 dark:text-white focus:outline-none text-sm border-b border-transparent focus:border-blue-500" />
                    <span className="hidden print:block">${item.rate.toFixed(2)}</span>
                  </td>
                  <td className="py-2 text-right text-sm font-medium text-gray-900 dark:text-white">
                    ${(item.qty * item.rate).toFixed(2)}
                    <button onClick={() => removeItem(item.id)} className="no-print ml-2 text-red-400 hover:text-red-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="no-print mb-4">
            <button onClick={addItem} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">+ Add line item</button>
          </div>

          <div className="flex justify-between items-start">
            <div className="no-print flex-1 mr-8">
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Notes</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none" />
            </div>
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <span>Tax</span>
                  <input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="no-print w-12 px-1 py-0.5 text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                  <span>%</span>
                </div>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white border-t border-gray-300 dark:border-gray-600 pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {notes && <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic hidden print:block">{notes}</p>}
        </div>

        <div className="no-print flex justify-end">
          <button onClick={print} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow transition-colors">
            🖨 Print / Download Invoice
          </button>
        </div>
      </div>
    </>
  );
}
