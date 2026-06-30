import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "admin_session";
const SESSION_VALUE = "authenticated";

export async function requireAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  if (session?.value !== SESSION_VALUE) {
    redirect("/admin");
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value === SESSION_VALUE;
}

export async function login(password: string): Promise<boolean> {
  return password === (process.env.ADMIN_PASSWORD ?? "cleverly2026");
}
