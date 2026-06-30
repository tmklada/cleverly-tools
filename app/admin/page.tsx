import { isAuthenticated } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import { loginAction } from "./actions";

export const metadata = { title: "Admin Login — cleverly.tools", robots: { index: false } };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const auth = await isAuthenticated();
  if (auth) redirect("/admin/dashboard");

  const { error } = await searchParams;

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">⚡</div>
          <h1 className="text-2xl font-bold text-white">cleverly.tools</h1>
          <p className="text-gray-400 text-sm mt-1">Admin Panel</p>
        </div>

        <form action={loginAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              autoFocus
              placeholder="Enter admin password"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-400 text-sm rounded-xl px-4 py-3">
              ❌ Wrong password. Try again.
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
          >
            Login →
          </button>
        </form>
      </div>
    </div>
  );
}
