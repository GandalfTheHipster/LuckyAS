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

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-9 items-center border-l-2 border-foreground pl-3 text-sm font-bold tracking-[0.25em] transition group-hover:pl-4">
            NE.
          </span>
          <span className="hidden text-sm font-semibold tracking-[0.18em] sm:inline">
            NOAHEDGE
          </span>
        </Link>

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

        <div className="flex items-center gap-2">
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
