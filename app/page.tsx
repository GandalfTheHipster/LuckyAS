import { Hero } from "@/components/hero"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { CardImage } from "@/components/ui/image_card"
import { SocialLinks } from "@/components/landing/SocialLinks"
import { SiteNav } from "@/components/site-nav"

const projects = [
  {
    imageSrc: "https://i.postimg.cc/wB8jxcqN/IMG-0666.jpg",
    title: "Bape Olympics",
    description:
      "Inspiring people through the Olympic values of friendship, respect, and copious alcohol intake.",
    badge: "Featured",
    buttonText: "View Event",
    href: "/bape/olympics",
  },
  {
    imageSrc: "https://i.postimg.cc/cL9WcSc3/bpl-logo.png",
    title: "Bape Beer Pong League",
    description:
      "The official hub for fixtures, standings, teams, playoffs, and league chaos.",
    badge: "League",
    buttonText: "View League",
    href: "/bape/beerpong",
  },
]

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-24 right-0 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-muted blur-3xl" />
      </div>

      <div className="flex min-h-screen w-full flex-col items-center">
        <SiteNav />

        <div className="flex w-full max-w-6xl flex-1 flex-col items-center px-5 py-12 sm:py-16">
          <section className="flex w-full flex-col items-center gap-8 rounded-[2rem] border border-border/60 bg-card/50 px-6 py-12 text-center shadow-sm backdrop-blur sm:px-10">
            <Hero />
            <SocialLinks />
          </section>

          <section id="projects" className="w-full py-16">
            <div className="mb-8">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground">
                Projects
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                What&apos;s going on?
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div
                  key={project.href}
                  className="group rounded-2xl transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <CardImage {...project} />
                </div>
              ))}
            </div>
          </section>
        </div>

        <footer className="w-full border-t border-border/60 bg-background/80">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-5 py-8">
            <ThemeSwitcher />
          </div>
        </footer>
      </div>
    </main>
  )
}
