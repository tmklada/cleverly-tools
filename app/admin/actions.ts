"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { login } from "@/lib/admin-auth";
import fs from "fs";
import path from "path";

const SESSION_COOKIE = "admin_session";
const BLOG_DIR = path.join(process.cwd(), "content/blog");

export async function loginAction(formData: FormData) {
  const password = formData.get("password") as string;
  const ok = await login(password);

  if (ok) {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
    redirect("/admin/dashboard");
  } else {
    redirect("/admin?error=1");
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin");
}

export async function createPostAction(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const tags = formData.get("tags") as string;
  const relatedTool = formData.get("relatedTool") as string;
  const content = formData.get("content") as string;
  const featured = formData.get("featured") === "on";

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

  const date = new Date().toISOString().split("T")[0];

  const frontmatter = `---
title: "${title}"
description: "${description}"
date: "${date}"
author: "cleverly.tools"
category: "${category}"
tags: [${tags.split(",").map(t => `"${t.trim()}"`).join(", ")}]
${relatedTool ? `relatedTool: "${relatedTool}"` : ""}
${featured ? "featured: true" : ""}
---

${content}`;

  if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });
  fs.writeFileSync(path.join(BLOG_DIR, `${slug}.md`), frontmatter, "utf-8");

  redirect(`/admin/blog?success=1`);
}

export async function updatePostAction(formData: FormData) {
  const slug = formData.get("slug") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const tags = formData.get("tags") as string;
  const relatedTool = formData.get("relatedTool") as string;
  const content = formData.get("content") as string;
  const featured = formData.get("featured") === "on";
  const date = formData.get("date") as string;

  const frontmatter = `---
title: "${title}"
description: "${description}"
date: "${date}"
updatedDate: "${new Date().toISOString().split("T")[0]}"
author: "cleverly.tools"
category: "${category}"
tags: [${tags.split(",").map(t => `"${t.trim()}"`).join(", ")}]
${relatedTool ? `relatedTool: "${relatedTool}"` : ""}
${featured ? "featured: true" : ""}
---

${content}`;

  fs.writeFileSync(path.join(BLOG_DIR, `${slug}.md`), frontmatter, "utf-8");
  redirect(`/admin/blog?updated=1`);
}

export async function deletePostAction(formData: FormData) {
  const slug = formData.get("slug") as string;
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  redirect("/admin/blog?deleted=1");
}
