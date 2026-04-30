import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { Suspense } from "react";
import { CardImage } from "@/components/ui/image_card"
import { SocialLinks } from "@/components/landing/SocialLinks"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>NOAHEDGE.COM</Link>
            </div>
              <Suspense>
                <AuthButton />
              </Suspense>
          </div>
        </nav>
        <div className="flex-1 flex flex-col items-center gap-20 max-w-5xl p-5">
          <Hero />
          <SocialLinks />
          <main className="grid flex-1 grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3">
            <CardImage
              imageSrc="https://i.postimg.cc/wB8jxcqN/IMG-0666.jpg"
              title="Bape Olympics"
              description="Inspiring people through the Olympics values of friendship, respect and copious alcohol intake"
              badge="Featured"
              buttonText="View Event"
              href="/bape/olympics"
            />
            <CardImage
              imageSrc="https://i.postimg.cc/XNHN9xC0/Chat-GPT-Image-Apr-29-2026-at-11-11-38-AM.png"
              title="LuckyAS"
              description="Capstone Project"
              badge=""
              buttonText="View Project"
              href="/luckyas/login"
            />
            <CardImage
              imageSrc="https://i.postimg.cc/cL9WcSc3/bpl-logo.png"
              title="Bape Beer Pong League"
              description="The Bape Beer Pong League"
              badge=""
              buttonText="View Project"
              href="/bape/beerpong"
            />
          </main>
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
              Supabase
            </a>
          </p>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}