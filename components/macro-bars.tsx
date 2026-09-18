import type { Macros } from '@/lib/mock-analysis'
import { macroCalories } from '@/lib/mock-analysis'

const MACRO_META = [
  { key: 'protein', label: 'Proteínas', color: 'var(--chart-1)' },
  { key: 'carbs', label: 'Carboidratos', color: 'var(--chart-2)' },
  { key: 'fat', label: 'Gorduras', color: 'var(--chart-3)' },
] as const

export function MacroBars({ macros }: { macros: Macros }) {
  const cals = macroCalories(macros)
  const totalCals = cals.protein + cals.carbs + cals.fat

  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
        {MACRO_META.map((m) => (
          <div
            key={m.key}
            style={{
              width: `${(cals[m.key] / totalCals) * 100}%`,
              backgroundColor: m.color,
            }}
            className="h-full transition-all duration-700"
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {MACRO_META.map((m) => (
          <div key={m.key} className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: m.color }}
                aria-hidden="true"
              />
              <span className="text-xs font-medium text-muted-foreground">{m.label}</span>
            </div>
            <span className="font-display text-xl font-semibold tabular-nums text-foreground">
              {macros[m.key]}
              <span className="ml-0.5 text-sm font-normal text-muted-foreground">g</span>
            </span>
            <span className="text-[11px] text-muted-foreground">
              {Math.round((cals[m.key] / totalCals) * 100)}% das calorias
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
