import { SiteNav } from "@/components/site-nav"
import { ThemeSwitcher } from "@/components/theme-switcher"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex w-full flex-1 flex-col items-center gap-20">
        <SiteNav />

        <div className="flex w-full max-w-5xl flex-1 flex-col items-center gap-20 p-5">
          {children}
        </div>

        <footer className="mx-auto flex w-full items-center justify-center gap-8 border-t py-16 text-center text-xs">
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  )
}
