import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { SocialLinks } from "@/components/landing/SocialLinks"
import { SiteNav } from "@/components/site-nav"

const projects = [
  {
    imageSrc: "https://i.postimg.cc/wB8jxcqN/IMG-0666.jpg",
    title: "Bape Olympics",
    description:
      "A living archive and event hub for BAPE's annual Olympics, with yearly results, events, teams, and all-time standings.",
    badge: "Featured",
    buttonText: "View Event",
    href: "/bape/olympics",
  },
  {
    imageSrc: "https://i.postimg.cc/cL9WcSc3/bpl-logo.png",
    title: "Bape Beer Pong League",
    description:
      "The official hub for fixtures, standings, teams, playoffs, and league records.",
    badge: "League",
    buttonText: "View League",
    href: "/bape/beerpong",
  },
  {
    title: "LuckyAS",
    description:
      "A CRUD application for managing class project allocation, built as a software engineering assignment.",
    badge: "Coming Soon",
    buttonText: "Coming Soon",
  },
]

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="flex min-h-screen w-full flex-col items-center">
        <SiteNav />

        <div className="flex w-full max-w-6xl flex-1 flex-col items-center px-5 py-12 sm:py-16">
          <section className="grid w-full items-center gap-10 py-8 md:grid-cols-[1.1fr_0.9fr] md:py-14">
            <div className="flex flex-col items-start gap-7">
              <div className="space-y-5">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  Noah Edge
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                  I&apos;m a West Australian software engineering student at
                  Curtin University with a passion for history, politics and video
                  games.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild>
                  <Link href="#projects">View Projects</Link>
                </Button>
              </div>
              <SocialLinks />
            </div>

            <div className="relative mx-auto w-full max-w-sm md:max-w-md">
              <div className="absolute -inset-4 rounded-[2rem] bg-muted/60" />
              <div className="relative overflow-hidden rounded-[1.5rem] border bg-card shadow-xl">
                <Image
                  src="https://i.postimg.cc/yYGh0bHx/IMG-8793.jpg"
                  alt="Noah Edge"
                  width={900}
                  height={1200}
                  priority
                  className="aspect-[4/5] h-full w-full object-cover object-[center_32%]"
                />
              </div>
            </div>
          </section>

          <section id="projects" className="w-full py-16">
            <div className="mb-8 max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground">
                Projects
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Current work
              </h2>
              <p className="mt-3 text-muted-foreground">
                A mix of personal tools, event archives, and class projects I am
                actively building or shaping.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Card
                  key={project.title}
                  className="group flex h-full flex-col overflow-hidden pt-0 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    {project.imageSrc ? (
                      <>
                        <Image
                          src={project.imageSrc}
                          alt=""
                          width={700}
                          height={400}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                      </>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <div className="text-center">
                          <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
                            Coming Soon
                          </p>
                          <p className="mt-2 text-3xl font-semibold">
                            LuckyAS
                          </p>
                        </div>
                      </div>
                    )}
                    <Badge className="absolute left-4 top-4" variant="secondary">
                      {project.badge}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto">
                    {project.href ? (
                      <Button asChild className="w-full">
                        <Link href={project.href}>{project.buttonText}</Link>
                      </Button>
                    ) : (
                      <Button className="w-full" disabled>
                        {project.buttonText}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
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
