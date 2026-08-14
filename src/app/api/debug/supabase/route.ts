import { NextResponse } from "next/server";
import { getSupabase } from "@/db/index";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const envInfo = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? "SET ✅" : "NOT SET ❌",
    SUPABASE_URL: process.env.SUPABASE_URL ? "SET ✅" : "NOT SET ❌",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "SET ✅ (length: " + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length + ")" : "NOT SET ❌",
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? "SET ✅ (length: " + process.env.SUPABASE_ANON_KEY.length + ")" : "NOT SET ❌",
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? "SET ✅ (length: " + process.env.SUPABASE_SERVICE_ROLE_KEY.length + ")" : "NOT SET ❌",
    VERCEL: process.env.VERCEL ? "YES" : "NO",
    NODE_ENV: process.env.NODE_ENV || "unknown",
  };

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({
      success: false,
      error: "Supabase client is NULL — no valid URL + Key combination found in environment variables",
      env: envInfo,
    }, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  }

  // Test 1: Read from settings table
  const { data: settingsData, error: settingsError } = await supabase
    .from("settings")
    .select("id, site_name")
    .eq("id", 1)
    .maybeSingle();

  // Test 2: Read from hero_banners table
  const { data: bannersData, error: bannersError } = await supabase
    .from("hero_banners")
    .select("id, title")
    .limit(5);

  // Test 3: Read from works table
  const { data: worksData, error: worksError } = await supabase
    .from("works")
    .select("id, title")
    .limit(5);

  // Test 4: Try a write + rollback (insert then delete a test banner)
  let writeTest = "NOT TESTED";
  const { data: testInsert, error: insertError } = await supabase
    .from("hero_banners")
    .insert([{
      title: "__DIAG_TEST__",
      subtitle: "test",
      image_url: "https://test.com/test.jpg",
      button_text: "test",
      button_link: "#test",
      is_active: false,
      badge_text: "test",
    }])
    .select();

  if (insertError) {
    writeTest = `WRITE FAILED ❌: ${JSON.stringify(insertError)}`;
  } else if (testInsert && testInsert.length > 0) {
    // Clean up the test row
    const testId = testInsert[0].id;
    await supabase.from("hero_banners").delete().eq("id", testId);
    writeTest = `WRITE SUCCESS ✅ (inserted id=${testId}, then deleted)`;
  } else {
    writeTest = "WRITE RETURNED EMPTY — possible RLS blocking insert";
  }

  return NextResponse.json({
    success: true,
    env: envInfo,
    tests: {
      settingsRead: settingsError
        ? { status: "FAIL ❌", error: JSON.stringify(settingsError) }
        : { status: "OK ✅", data: settingsData },
      bannersRead: bannersError
        ? { status: "FAIL ❌", error: JSON.stringify(bannersError) }
        : { status: "OK ✅", count: bannersData?.length, data: bannersData },
      worksRead: worksError
        ? { status: "FAIL ❌", error: JSON.stringify(worksError) }
        : { status: "OK ✅", count: worksData?.length, data: worksData },
      writeTest,
    },
  }, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
