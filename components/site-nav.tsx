import Link from "next/link";
import { Suspense } from "react";

import { AuthButton } from "@/components/auth-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { hasEnvVars } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/bape/olympics", label: "Olympics" },
  { href: "/bape/beerpong", label: "Beer Pong" },
];

const mobileNavItems = [
  { href: "/", label: "Home" },
  { href: "/bape/olympics", label: "Olympics" },
  { href: "/bape/beerpong", label: "Beer Pong" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl flex-col gap-3 px-5 py-3 md:h-16 md:flex-row md:items-center md:justify-between md:gap-4 md:py-0">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-9 items-center border-l-2 border-foreground pl-3 text-sm font-bold tracking-[0.25em] transition group-hover:pl-4 sm:pl-0 sm:group-hover:pl-0">
            <span className="sm:hidden">NE.</span>
          </span>
          <span className="hidden text-sm font-semibold tracking-[0.18em] sm:inline">
            NOAHEDGE
          </span>
        </Link>

        <nav className="flex w-full items-center rounded-full border border-border/70 bg-muted/35 p-1 text-sm md:hidden">
          {mobileNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1 rounded-full px-3 py-2 text-center text-muted-foreground transition hover:bg-background hover:text-foreground hover:shadow-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <nav className="hidden items-center rounded-full border border-border/70 bg-muted/35 p-1 text-sm md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-muted-foreground transition hover:bg-background hover:text-foreground hover:shadow-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {!hasEnvVars ? (
            <EnvVarWarning />
          ) : (
            <Suspense>
              <AuthButton />
            </Suspense>
          )}
        </div>
      </div>
    </header>
  );
}
