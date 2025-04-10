"use client"
export const imageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
    return `/student-photos/${src}?w=${width}&q=${quality || 75}`
  }