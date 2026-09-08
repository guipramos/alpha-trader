"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginInput, loginSchema } from "../schemas/login-schema";
import {
  AUTH_COOKIE,
  AUTH_TOKEN_VALUE,
  FAKE_EMAIL,
  FAKE_PASSWORD,
} from "./auth";

export async function login(data: LoginInput) {
  const parsed = loginSchema.safeParse(data);

  if (!parsed.success) {
    return { error: "Dados inválidos" };
  }

  if (
    parsed.data.email !== FAKE_EMAIL ||
    parsed.data.password !== FAKE_PASSWORD
  ) {
    return { error: "Credenciais inválidas" };
  }

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, AUTH_TOKEN_VALUE, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: parsed.data.rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
  });

  redirect("/dashboard");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
  redirect("/signin");
}
