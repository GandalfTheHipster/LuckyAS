import { SiteNav } from "@/components/site-nav"
import { ThemeSwitcher } from "@/components/theme-switcher"

export default function BapeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <SiteNav />

        {/* CONTENT */}
        <div className="flex-1 flex flex-col items-center gap-20 max-w-5xl p-5 w-full">
          {children}
        </div>

        {/* FOOTER */}
        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <ThemeSwitcher />
        </footer>

      </div>
    </main>
  )
}
