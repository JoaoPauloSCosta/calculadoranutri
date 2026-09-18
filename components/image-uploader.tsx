'use client'

import { useCallback, useRef, useState } from 'react'
import { ImagePlus, Upload } from 'lucide-react'

type ImageUploaderProps = {
  onSelect: (dataUrl: string) => void
}

export function ImageUploader({ onSelect }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file || !file.type.startsWith('image/')) return
      const reader = new FileReader()
      reader.onload = () => onSelect(reader.result as string)
      reader.readAsDataURL(file)
    },
    [onSelect],
  )

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
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
      className={`group flex w-full flex-col items-center justify-center gap-5 rounded-3xl border-2 border-dashed px-6 py-16 text-center transition-colors ${
        dragging
          ? 'border-primary bg-primary/5'
          : 'border-border bg-card hover:border-primary/50 hover:bg-accent/40'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <span
        className={`flex size-16 items-center justify-center rounded-2xl transition-colors ${
          dragging ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
        }`}
      >
        <ImagePlus className="size-8" />
      </span>
      <div className="flex flex-col gap-1.5">
        <span className="font-display text-lg font-semibold text-foreground">
          Arraste uma foto da sua refeição
        </span>
        <span className="text-sm text-muted-foreground">
          ou clique para escolher um arquivo do seu dispositivo
        </span>
      </div>
      <span className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
        <Upload className="size-4" />
        Selecionar imagem
      </span>
      <span className="text-xs text-muted-foreground">PNG, JPG ou WEBP até 10 MB</span>
    </button>
  )
}
