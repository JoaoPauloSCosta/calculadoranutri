import { Leaf, Camera, Zap, ShieldCheck } from 'lucide-react'
import { FoodAnalyzer } from '@/components/food-analyzer'

const FEATURES = [
  {
    icon: Camera,
    title: 'Basta uma foto',
    description: 'Envie a imagem do prato e deixe a análise cuidar do resto.',
  },
  {
    icon: Zap,
    title: 'Resultado instantâneo',
    description: 'Calorias e macros estimados em segundos, sem digitação.',
  },
  {
    icon: ShieldCheck,
    title: 'Detalhado por item',
    description: 'Veja a contribuição calórica de cada componente da refeição.',
  },
]

export default function Page() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-12 px-5 py-10 sm:px-8 sm:py-16">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Leaf className="size-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            NutriLens
          </span>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          IA OpenAI Ativa
        </span>
      </header>

      <section className="flex flex-col items-center gap-5 text-center">
        <span className="flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-accent-foreground">
          <Leaf className="size-3.5 text-primary" />
          Contagem de calorias por inteligência artificial
        </span>
        <h1 className="max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground text-balance sm:text-5xl">
          Descubra as calorias da sua refeição em uma foto
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
          Envie uma imagem do seu prato e receba uma estimativa precisa de calorias e
          macronutrientes calculados pela visão computacional da OpenAI.
        </p>
      </section>

      <section className="w-full">
        <FoodAnalyzer />
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col gap-3 rounded-3xl border border-border bg-card p-6"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <feature.icon className="size-5" />
            </span>
            <h3 className="font-display text-base font-semibold text-foreground">
              {feature.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              {feature.description}
            </p>
          </div>
        ))}
      </section>

      <footer className="mt-auto pt-4 text-center text-xs text-muted-foreground">
        NutriLens · Análise nutricional inteligente alimentada por OpenAI Vision.
      </footer>
    </main>
  )
}
