'use client'

import { useCallback, useRef, useState } from 'react'
import { Camera, ImagePlus, Upload } from 'lucide-react'
import { compressImage } from '@/lib/image'

type ImageUploaderProps = {
  onSelect: (dataUrl: string) => void
}

export function ImageUploader({ onSelect }: ImageUploaderProps) {
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const handleFile = useCallback(
    async (file: File | undefined) => {
      if (!file || !file.type.startsWith('image/')) return
      const dataUrl = await compressImage(file)
      onSelect(dataUrl)
    },
    [onSelect],
  )

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragging(false)
        handleFile(e.dataTransfer.files?.[0])
      }}
      className={`flex w-full flex-col items-center justify-center gap-5 rounded-3xl border-2 border-dashed px-6 py-16 text-center transition-colors ${
        dragging
          ? 'border-primary bg-primary/5'
          : 'border-border bg-card hover:border-primary/50 hover:bg-accent/40'
      }`}
    >
      <span
        className={`flex size-16 items-center justify-center rounded-2xl transition-colors ${
          dragging ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
        }`}
      >
        <ImagePlus className="size-8" />
      </span>
      <div className="flex flex-col gap-1.5">
        <span className="font-display text-lg font-semibold text-foreground">
          Envie uma foto da sua refeição
        </span>
        <span className="text-sm text-muted-foreground">
          tire uma foto na hora ou escolha uma imagem da galeria
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => {
            handleFile(e.target.files?.[0])
            e.target.value = ''
          }}
        />
        <button
          type="button"
          onClick={() => cameraInputRef.current?.click()}
          className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
        >
          <Camera className="size-4" />
          Tirar foto
        </button>

        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            handleFile(e.target.files?.[0])
            e.target.value = ''
          }}
        />
        <button
          type="button"
          onClick={() => galleryInputRef.current?.click()}
          className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:opacity-90"
        >
          <Upload className="size-4" />
          Escolher da galeria
        </button>
      </div>

      <span className="text-xs text-muted-foreground">
        PNG, JPG ou WEBP — a imagem é redimensionada automaticamente antes do envio
      </span>
    </div>
  )
}
