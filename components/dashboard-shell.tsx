import * as React from "react"
import { Suspense } from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { AuthButton } from "@/components/auth-button"
import { EnvVarWarning } from "@/components/env-var-warning"
import { SiteHeader } from "@/components/site-header"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { BackButton } from "@/components/ui/back_button"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { createClient } from "@/lib/supabase/luckyas/server"
import { hasEnvVars } from "@/lib/utils"

export async function DashboardShell({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()

  const claims = data?.claims

  const sidebarUser = {
    name: claims?.email?.split("@")[0] ?? "Guest",
    email: claims?.email ?? "",
    avatar: "",
    isLoggedIn: Boolean(claims),
  }

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <BackButton />
            </div>
          </div>
        </nav>

        <div className="flex-1 w-full max-w-5xl p-5">
          <SidebarProvider
            style={
              {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
              } as React.CSSProperties
            }
          >
            <AppSidebar variant="inset" user={sidebarUser} />

            <SidebarInset>
              <SiteHeader />

              <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                  <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    {children}
                  </div>
                </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>
            Powered by{" "}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              NextJS
            </a>
          </p>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  )
}