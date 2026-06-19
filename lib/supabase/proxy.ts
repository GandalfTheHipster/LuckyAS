import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseEnv, hasSupabaseEnv } from "@/lib/supabase/env";

const SESSION_CHECK_TIMEOUT_MS = 4_000;

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  if (!hasSupabaseEnv) {
    return supabaseResponse;
  }

  const { supabaseUrl, supabasePublishableKey } = getSupabaseEnv();

  const supabase = createServerClient(
    supabaseUrl,
    supabasePublishableKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const { data } = await Promise.race([
    supabase.auth.getClaims(),
    new Promise<{ data: null }>((resolve) =>
      setTimeout(() => resolve({ data: null }), SESSION_CHECK_TIMEOUT_MS),
    ),
  ]);

  if (!data?.claims) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
