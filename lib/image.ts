const DEFAULT_MAX_DIMENSION = 1600
const DEFAULT_QUALITY = 0.8

type CompressImageOptions = {
  maxDimension?: number
  quality?: number
}

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

export async function compressImage(file: File, options: CompressImageOptions = {}): Promise<string> {
  const { maxDimension = DEFAULT_MAX_DIMENSION, quality = DEFAULT_QUALITY } = options

  try {
    const objectUrl = URL.createObjectURL(file)
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image()
        image.onload = () => resolve(image)
        image.onerror = () => reject(new Error('Não foi possível carregar a imagem.'))
        image.src = objectUrl
      })

      const scale = Math.min(1, maxDimension / Math.max(img.width, img.height))
      const width = Math.round(img.width * scale)
      const height = Math.round(img.height * scale)

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('Canvas não suportado.')

      ctx.drawImage(img, 0, 0, width, height)

      const dataUrl = canvas.toDataURL('image/jpeg', quality)
      if (!dataUrl || dataUrl === 'data:,') throw new Error('Falha ao gerar imagem comprimida.')

      return dataUrl
    } finally {
      URL.revokeObjectURL(objectUrl)
    }
  } catch (err) {
    console.warn('Falha ao comprimir imagem, usando arquivo original:', err)
    return readAsDataURL(file)
  }
}
