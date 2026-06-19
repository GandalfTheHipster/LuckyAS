import { LoginForm } from "@/components/login/login-form";
import { SiteNav } from "@/components/site-nav";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { XIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="relative flex min-h-screen flex-col items-center">
      <div className="flex w-full flex-1 flex-col items-center gap-20">
        <SiteNav />

        <div className="flex w-full max-w-5xl flex-1 flex-col items-center gap-20 p-5" />

        <footer className="mx-auto flex w-full items-center justify-center gap-8 border-t py-16 text-center text-xs">
          <ThemeSwitcher />
        </footer>
      </div>

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6">
        <div
          className="relative w-full max-w-sm"
          role="dialog"
          aria-label="Sign in"
          aria-modal="true"
        >
          <Link
            href="/"
            className="absolute right-3 top-3 z-10 rounded-full bg-background/80 p-2 text-muted-foreground shadow-sm ring-offset-background transition hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Close sign in"
          >
            <XIcon className="size-4" />
          </Link>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
