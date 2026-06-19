"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type OlympicsImageCarouselProps = {
  images: string[]
  title: string
  location: string
  host?: string
}

export function OlympicsImageCarousel({
  images,
  title,
  location,
  host,
}: OlympicsImageCarouselProps) {
  const usableImages = images.filter(Boolean)
  const [index, setIndex] = useState(0)
  const hasMultipleImages = usableImages.length > 1
  const activeImage = usableImages[index] ?? usableImages[0]

  if (!activeImage) return null

  function goToImage(nextIndex: number) {
    if (!hasMultipleImages) return

    const wrappedIndex =
      (nextIndex + usableImages.length) % usableImages.length
    setIndex(wrappedIndex)
  }

  return (
    <div className="relative h-[360px] overflow-hidden rounded-[1.5rem] border bg-card shadow-sm sm:h-[420px] lg:h-[520px]">
      <Image
        src={activeImage}
        alt={`${title} photo ${index + 1}`}
        fill
        priority={index === 0}
        className="object-cover object-center"
        sizes="(max-width: 1024px) 100vw, 760px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/70">
          {location}
        </p>
        {host ? (
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">
            Hosted at {host}.
          </p>
        ) : null}
      </div>

      {hasMultipleImages ? (
        <>
          <div className="absolute right-4 top-4 rounded-full bg-black/45 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {index + 1} / {usableImages.length}
          </div>
          <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 justify-between">
            <Button
              type="button"
              size="icon"
              variant="secondary"
              className="rounded-full bg-black/45 text-white backdrop-blur hover:bg-black/60 hover:text-white"
              onClick={() => goToImage(index - 1)}
            >
              <ChevronLeft className="size-5" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              type="button"
              size="icon"
              variant="secondary"
              className="rounded-full bg-black/45 text-white backdrop-blur hover:bg-black/60 hover:text-white"
              onClick={() => goToImage(index + 1)}
            >
              <ChevronRight className="size-5" />
              <span className="sr-only">Next image</span>
            </Button>
          </div>
          <div className="absolute bottom-4 right-4 flex gap-1.5">
            {usableImages.map((image, imageIndex) => (
              <button
                key={`${image}-${imageIndex}`}
                type="button"
                className={cn(
                  "size-2 rounded-full bg-white/40 transition",
                  imageIndex === index && "w-5 bg-white",
                )}
                onClick={() => goToImage(imageIndex)}
              >
                <span className="sr-only">Go to image {imageIndex + 1}</span>
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}
