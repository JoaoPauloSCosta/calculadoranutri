import type { AnalysisResult } from '@/lib/mock-analysis'
import { CalorieRing } from '@/components/calorie-ring'
import { MacroBars } from '@/components/macro-bars'
import { Sparkles, CircleCheck, Leaf } from 'lucide-react'

function HealthScore({ score }: { score: number }) {
  const label = score >= 70 ? 'Saudável' : score >= 50 ? 'Moderado' : 'Indulgente'
  const tone =
    score >= 70
      ? 'text-primary'
      : score >= 50
        ? 'text-[var(--chart-2)]'
        : 'text-[var(--chart-3)]'
  return (
    <div className="flex items-center gap-2">
      <Leaf className={`size-4 ${tone}`} />
      <span className={`text-sm font-semibold ${tone}`}>
        {label} · {score}/100
      </span>
    </div>
  )
}

export function AnalysisResultView({ result }: { result: AnalysisResult }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" />
            Análise concluída · {Math.round(result.confidence * 100)}% de confiança
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground text-balance">
            {result.dishName}
          </h2>
          <span className="text-sm text-muted-foreground">Porção: {result.servingSize}</span>
        </div>
        <HealthScore score={result.healthScore} />
      </div>

      <div className="grid gap-6 rounded-3xl border border-border bg-card p-6 sm:grid-cols-[auto_1fr] sm:items-center">
        <div className="flex justify-center">
          <CalorieRing calories={result.totalCalories} />
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-sm font-medium text-muted-foreground">
            Distribuição de macronutrientes
          </span>
          <MacroBars macros={result.macros} />
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-3xl border border-border bg-card p-6">
        <span className="text-sm font-semibold text-foreground">Itens identificados</span>
        <ul className="flex flex-col divide-y divide-border">
          {result.items.map((item) => (
            <li key={item.name} className="flex items-center justify-between gap-4 py-3">
              <div className="flex items-center gap-3">
                <CircleCheck className="size-4 shrink-0 text-primary" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">{item.name}</span>
                  <span className="text-xs text-muted-foreground">{item.portion}</span>
                </div>
              </div>
              <span className="font-display text-sm font-semibold tabular-nums text-foreground">
                {item.calories} kcal
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-2">
        {result.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground text-pretty">
        Estimativa calculada via OpenAI Vision para fins informativos e de conscientização alimentar.
      </p>
    </div>
  )
}
