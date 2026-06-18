import Link from "next/link"
import { Github, Linkedin, Instagram, Youtube } from "lucide-react"

export function SocialLinks() {
  const iconClass =
    "h-8 w-8 text-muted-foreground hover:text-foreground transition"

  const links = {
    github: "https://github.com/GandalfTheHipster",
    linkedin: "https://www.linkedin.com/in/noahkedge/",
    instagram: "https://www.instagram.com/_noahedge/",
    youtube: "https://www.youtube.com/@noahkobeedge",
  }

  return (
    <div className="flex items-center gap-6">
      <Link href={links.github} target="_blank">
        <Github className={iconClass} />
      </Link>

      <Link href={links.linkedin} target="_blank">
        <Linkedin className={iconClass} />
      </Link>

      <Link href={links.instagram} target="_blank">
        <Instagram className={iconClass} />
      </Link>

      <Link href={links.youtube} target="_blank">
        <Youtube className={iconClass} />
      </Link>
    </div>
  )
}