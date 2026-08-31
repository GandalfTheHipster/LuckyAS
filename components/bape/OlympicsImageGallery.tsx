"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

import type { OlympicImage } from "@/lib/data/olympics/olympics-template"
import { cn } from "@/lib/utils"

export function OlympicsImageGallery({
  images,
  title,
}: {
  images: OlympicImage[]
  title: string
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activeImage = activeIndex === null ? null : images[activeIndex]
  const hasMultipleImages = images.length > 1

  const showPrevious = useCallback(() => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null) return currentIndex
      return (currentIndex - 1 + images.length) % images.length
    })
  }, [images.length])

  const showNext = useCallback(() => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null) return currentIndex
      return (currentIndex + 1) % images.length
    })
  }, [images.length])

  useEffect(() => {
    if (activeIndex === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null)
      if (event.key === "ArrowLeft") showPrevious()
      if (event.key === "ArrowRight") showNext()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeIndex, showNext, showPrevious])

  return (
    <>
      <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group block w-full break-inside-avoid overflow-hidden rounded-2xl border bg-card text-left transition hover:border-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
          >
            <div
              className={cn(
                "relative w-full overflow-hidden",
                getThumbnailRatio(image.orientation, index),
              )}
            >
              <Image
                src={image.src}
                alt={image.caption ?? `${title} image ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                priority={index === 0}
              />
                <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-x-3 bottom-3">
                <p className="line-clamp-2 text-sm font-semibold leading-snug text-white">
                  {image.caption ?? `Image ${index + 1}`}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {activeImage && activeIndex !== null ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image preview`}
        >
          <button
            type="button"
            className="absolute right-3 top-3 z-10 grid size-11 place-items-center rounded-full border border-white/15 bg-black/40 text-white transition hover:bg-black/60 sm:right-5 sm:top-5"
            onClick={() => setActiveIndex(null)}
            aria-label="Close image preview"
          >
            <X className="size-5" aria-hidden="true" />
          </button>

          {hasMultipleImages ? (
            <button
              type="button"
            className="absolute left-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/40 text-white transition hover:bg-black/60 sm:left-5"
              onClick={showPrevious}
              aria-label="Previous image"
            >
              <ChevronLeft className="size-6" aria-hidden="true" />
            </button>
          ) : null}

          <div className="flex h-full w-full max-w-6xl flex-col items-center justify-center gap-4">
            <div className="relative h-[72vh] w-full overflow-hidden rounded-2xl bg-black sm:h-[78vh]">
              <Image
                src={activeImage.src}
                alt={activeImage.caption ?? `${title} image ${activeIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            <div className="w-full max-w-3xl text-center text-white">
              <p className="text-sm font-semibold text-white/95 sm:text-base">
                {activeImage.caption ?? `Image ${activeIndex + 1}`}
              </p>
              {hasMultipleImages ? (
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                  {activeIndex + 1} / {images.length}
                </p>
              ) : null}
            </div>
          </div>

          {hasMultipleImages ? (
            <button
              type="button"
            className="absolute right-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/40 text-white transition hover:bg-black/60 sm:right-5"
              onClick={showNext}
              aria-label="Next image"
            >
              <ChevronRight className="size-6" aria-hidden="true" />
            </button>
          ) : null}
        </div>
      ) : null}
    </>
  )
}

function getThumbnailRatio(
  orientation: OlympicImage["orientation"],
  index: number,
) {
  if (orientation === "portrait") return "aspect-[3/4]"
  if (orientation === "square") return "aspect-square"
  if (orientation === "landscape") return "aspect-[4/3]"

  return index % 5 === 1 || index % 5 === 4
    ? "aspect-[3/4]"
    : "aspect-[4/3]"
}
