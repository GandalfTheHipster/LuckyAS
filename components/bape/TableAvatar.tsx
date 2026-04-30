import Image from "next/image"

type TableAvatarProps = {
  src: string
  alt?: string
  size?: number
  rounded?: boolean
}

export function TableAvatar({
  src,
  alt = "avatar",
  size = 36,
  rounded = true,
}: TableAvatarProps) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden ${
        rounded ? "rounded-full" : "rounded-md"
      }`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={`${size}px`}
      />
    </div>
  )
}