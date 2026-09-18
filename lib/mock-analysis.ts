export type FoodItem = {
  name: string
  calories: number
  portion: string
}

export type Macros = {
  /** gramas */
  protein: number
  carbs: number
  fat: number
}

export type AnalysisResult = {
  dishName: string
  confidence: number
  totalCalories: number
  servingSize: string
  healthScore: number
  macros: Macros
  items: FoodItem[]
  tags: string[]
}

/**
 * Conjunto de refeições simuladas. Enquanto a integração real com o modelo de
 * visão não é feita, sorteamos um destes resultados para demonstrar a interface.
 */
const MOCK_MEALS: AnalysisResult[] = [
  {
    dishName: 'Bowl de frango grelhado',
    confidence: 0.94,
    totalCalories: 620,
    servingSize: '1 tigela (450 g)',
    healthScore: 82,
    macros: { protein: 48, carbs: 55, fat: 22 },
    items: [
      { name: 'Peito de frango grelhado', calories: 280, portion: '180 g' },
      { name: 'Arroz integral', calories: 190, portion: '150 g' },
      { name: 'Brócolis no vapor', calories: 55, portion: '90 g' },
      { name: 'Abacate', calories: 95, portion: '40 g' },
    ],
    tags: ['Rico em proteína', 'Balanceado', 'Fonte de fibras'],
  },
  {
    dishName: 'Hambúrguer com batatas fritas',
    confidence: 0.91,
    totalCalories: 980,
    servingSize: '1 combo',
    healthScore: 38,
    macros: { protein: 42, carbs: 88, fat: 52 },
    items: [
      { name: 'Hambúrguer bovino', calories: 540, portion: '1 unidade' },
      { name: 'Batatas fritas', calories: 340, portion: '120 g' },
      { name: 'Molho especial', calories: 100, portion: '2 colheres' },
    ],
    tags: ['Alto teor calórico', 'Rico em gordura'],
  },
  {
    dishName: 'Salada Caesar com salmão',
    confidence: 0.89,
    totalCalories: 430,
    servingSize: '1 prato (320 g)',
    healthScore: 76,
    macros: { protein: 34, carbs: 18, fat: 26 },
    items: [
      { name: 'Salmão grelhado', calories: 220, portion: '120 g' },
      { name: 'Alface romana', calories: 25, portion: '80 g' },
      { name: 'Croutons', calories: 90, portion: '30 g' },
      { name: 'Molho Caesar', calories: 95, portion: '1 colher' },
    ],
    tags: ['Rico em ômega-3', 'Baixo carboidrato'],
  },
  {
    dishName: 'Panqueca de banana com frutas',
    confidence: 0.87,
    totalCalories: 390,
    servingSize: '2 panquecas',
    healthScore: 64,
    macros: { protein: 12, carbs: 68, fat: 9 },
    items: [
      { name: 'Panquecas de aveia', calories: 240, portion: '2 unidades' },
      { name: 'Frutas vermelhas', calories: 60, portion: '80 g' },
      { name: 'Mel', calories: 90, portion: '1 colher' },
    ],
    tags: ['Café da manhã', 'Fonte de energia'],
  },
  {
    dishName: 'Pizza margherita',
    confidence: 0.92,
    totalCalories: 810,
    servingSize: '3 fatias',
    healthScore: 45,
    macros: { protein: 33, carbs: 95, fat: 34 },
    items: [
      { name: 'Massa de pizza', calories: 380, portion: '3 fatias' },
      { name: 'Queijo mussarela', calories: 300, portion: '90 g' },
      { name: 'Molho de tomate', calories: 70, portion: '60 g' },
      { name: 'Manjericão e azeite', calories: 60, portion: 'a gosto' },
    ],
    tags: ['Rico em carboidrato', 'Refeição indulgente'],
  },
]

/**
 * Simula a análise de uma imagem. Retorna um resultado após um pequeno atraso
 * para imitar a latência de uma chamada real ao modelo.
 */
export function analyzeImageMock(seed?: number): Promise<AnalysisResult> {
  const index =
    typeof seed === 'number'
      ? seed % MOCK_MEALS.length
      : Math.floor(Math.random() * MOCK_MEALS.length)

  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_MEALS[index]), 2200)
  })
}

export function macroCalories(macros: Macros) {
  return {
    protein: macros.protein * 4,
    carbs: macros.carbs * 4,
    fat: macros.fat * 9,
  }
}
