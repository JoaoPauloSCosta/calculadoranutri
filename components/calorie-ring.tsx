type CalorieRingProps = {
  calories: number
  dailyGoal?: number
}

export function CalorieRing({ calories, dailyGoal = 2000 }: CalorieRingProps) {
  const size = 176
  const stroke = 14
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const pct = Math.min(calories / dailyGoal, 1)
  const dash = circumference * pct

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--primary)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          className="transition-[stroke-dasharray] duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-4xl font-bold tabular-nums text-foreground">
          {calories}
        </span>
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          kcal
        </span>
        <span className="mt-1 text-[11px] text-muted-foreground">
          {Math.round(pct * 100)}% da meta diária
        </span>
      </div>
    </div>
  )
}
