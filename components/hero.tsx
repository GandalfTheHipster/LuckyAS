import { NextLogo } from "./next-logo";
import { SupabaseLogo } from "./supabase-logo";

export function Hero() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <h1 className="text-3xl lg:text-4xl font-bold !leading-tight mx-auto max-w-xl text-center">
        Let's get this bread. 🍞{" "}
      </h1>
    </div>
  );
}
