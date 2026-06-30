import { NextResponse } from "next/server";
import { getErrors, clearErrors } from "@/lib/error-store";
import { cookies } from "next/headers";

async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "authenticated";
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ errors: getErrors() });
}

export async function DELETE() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  clearErrors();
  return NextResponse.json({ ok: true });
}
