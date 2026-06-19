const NETWORK_ERROR_PARTS = [
  "failed to fetch",
  "fetch failed",
  "load failed",
  "networkerror",
  "network error",
];

export function getAuthErrorMessage(error: unknown) {
  const fallback = "Something went wrong. Please try again.";

  if (!(error instanceof Error)) {
    return fallback;
  }

  const message = error.message.trim();
  const normalizedMessage = message.toLowerCase();

  if (normalizedMessage.includes("supabase is not configured")) {
    return "Login is not configured yet. Check the Supabase environment variables in Vercel.";
  }

  if (NETWORK_ERROR_PARTS.some((part) => normalizedMessage.includes(part))) {
    return "Could not reach Supabase. Check your connection, then make sure the Supabase URL and publishable key are set for this Vercel domain.";
  }

  return message || fallback;
}
