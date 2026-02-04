import { useState } from 'react'
import { X } from 'lucide-react'

interface ImageLightboxProps {
  images: string[]
  projectName: string
}

export function ImageLightbox({ images, projectName }: ImageLightboxProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleImageDoubleClick = (img: string) => {
    setSelectedImage(img)
  }

  const handleClose = () => {
    setSelectedImage(null)
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking the backdrop, not the image
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((img, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border bg-muted cursor-pointer"
            onDoubleClick={() => handleImageDoubleClick(img)}
          >
            <img
              src={img}
              alt={`${projectName} screenshot ${index + 1}`}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={handleBackdropClick}
        >
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={selectedImage}
            alt={`${projectName} enlarged`}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
          />
        </div>
      )}
    </>
  )
}
