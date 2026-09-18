'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AlertCircle, Loader2, RotateCcw, ScanLine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ImageUploader } from '@/components/image-uploader'
import { AnalysisResultView } from '@/components/analysis-result'
import type { AnalysisResult } from '@/lib/mock-analysis'

type Status = 'idle' | 'analyzing' | 'done' | 'error'

export function FoodAnalyzer() {
  const [status, setStatus] = useState<Status>('idle')
  const [image, setImage] = useState<string | null>(null)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function analyzeImage(dataUrl: string) {
    setImage(dataUrl)
    setStatus('analyzing')
    setResult(null)
    setError(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: dataUrl }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Falha ao analisar a imagem.')
      }

      setResult(data)
      setStatus('done')
    } catch (err: any) {
      console.error('Erro na análise:', err)
      setError(err?.message || 'Não foi possível analisar a imagem. Verifique sua conexão e tente novamente.')
      setStatus('error')
    }
  }

  function reset() {
    setStatus('idle')
    setImage(null)
    setResult(null)
    setError(null)
  }

  if (status === 'idle') {
    return <ImageUploader onSelect={analyzeImage} />
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="flex flex-col gap-4 lg:sticky lg:top-8 lg:self-start">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border bg-muted shadow-sm">
          {image && (
            <Image
              src={image || '/placeholder.svg'}
              alt="Foto da refeição enviada"
              fill
              className="object-cover"
              unoptimized
            />
          )}
          {status === 'analyzing' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/70 backdrop-blur-sm">
              <span className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg">
                <ScanLine className="size-4 animate-pulse" />
                Analisando com Inteligência Artificial…
              </span>
            </div>
          )}
        </div>
        <Button
          variant="outline"
          onClick={reset}
          className="w-full rounded-2xl"
          disabled={status === 'analyzing'}
        >
          <RotateCcw className="size-4" />
          Analisar outra foto
        </Button>
      </div>

      <div>
        {status === 'analyzing' && <AnalyzingSkeleton />}
        {status === 'done' && result && <AnalysisResultView result={result} />}
        {status === 'error' && (
          <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-destructive/20 bg-destructive/10 p-8 text-center">
            <AlertCircle className="size-10 text-destructive" />
            <div className="flex flex-col gap-1.5">
              <h3 className="font-display text-lg font-semibold text-destructive">
                Falha na análise
              </h3>
              <p className="text-sm text-muted-foreground max-w-md">
                {error}
              </p>
            </div>
            {image && (
              <Button
                onClick={() => analyzeImage(image)}
                variant="default"
                className="rounded-2xl mt-2"
              >
                Tentar novamente
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function AnalyzingSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 text-sm font-medium text-primary">
        <Loader2 className="size-4 animate-spin" />
        OpenAI calculando calorias, macros e alimentos identificados…
      </div>
      <div className="h-8 w-2/3 animate-pulse rounded-lg bg-muted" />
      <div className="h-44 w-full animate-pulse rounded-3xl bg-muted" />
      <div className="h-56 w-full animate-pulse rounded-3xl bg-muted" />
    </div>
  )
}

