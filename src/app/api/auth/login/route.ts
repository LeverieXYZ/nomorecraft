import { NextResponse } from "next/server";
import { getSupabase } from "@/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const supabase = getSupabase();
    if (supabase) {
      const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .maybeSingle();

      if (!error && user && user.password_hash === password) {
        return NextResponse.json({
          success: true,
          user: { id: user.id, email: user.email, name: user.name },
          token: "jwt-token-nomorecraft-admin-supabase",
        });
      }
    }

    // Default Fallback Admin Check
    if ((email === "admin@nomorecraft.com" || email === "admin") && password === "admin123") {
      return NextResponse.json({
        success: true,
        user: { id: 1, email: "admin@nomorecraft.com", name: "Admin No More Craft" },
        token: "mock-jwt-token-nomorecraft-admin",
      });
    }

    return NextResponse.json({ success: false, error: "Email atau kata sandi salah" }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
