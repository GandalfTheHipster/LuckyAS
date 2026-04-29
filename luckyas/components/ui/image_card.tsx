import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Link from "next/link"

type CardImageProps = {
  imageSrc: string;
  title: string;
  description: string;
  badge?: string;
  buttonText?: string;
  grayscale?: boolean;
  href?: string;
};

export function CardImage({
  imageSrc,
  title,
  description,
  badge,
  buttonText = "View",
  grayscale = false,
  href,
}: CardImageProps) {
  return (
    <Card className="flex h-full w-full flex-col overflow-hidden pt-0">
      {/* Image */}
      <div className="relative aspect-video w-full overflow-hidden">
        <div className="absolute inset-0 z-10 bg-black/35" />

        <img
          src={imageSrc}
          alt={title}
          className={`absolute inset-0 h-full w-full object-cover object-center brightness-60 dark:brightness-40 ${
            grayscale ? "grayscale" : ""
          }`}
        />
      </div>

      {/* Content */}
      <CardHeader>
        {badge && (
          <CardAction>
            <Badge variant="secondary">{badge}</Badge>
          </CardAction>
        )}

        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      {/* Footer */}
      <CardFooter className="mt-auto">
        {href ? (
          <Button asChild className="w-full">
            <Link href={href}>{buttonText}</Link>
          </Button>
        ) : (
          <Button className="w-full">{buttonText}</Button>
        )}
      </CardFooter>
    </Card>
  );
}