import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import type { AnalysisResult } from '@/lib/mock-analysis'

export const maxDuration = 60 // Configuração para permitir até 60 segundos de processamento

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY || process.env.API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Chave de API da OpenAI não configurada no servidor (.env).' },
        { status: 500 }
      )
    }

    const body = await req.json().catch(() => null)
    if (!body || !body.image) {
      return NextResponse.json(
        { error: 'Nenhuma imagem foi fornecida para análise.' },
        { status: 400 }
      )
    }

    const { image } = body

    if (typeof image !== 'string' || (!image.startsWith('data:image/') && !image.startsWith('http'))) {
      return NextResponse.json(
        { error: 'Formato de imagem inválido. Forneça uma imagem em Base64 ou URL.' },
        { status: 400 }
      )
    }

    const openai = new OpenAI({ apiKey })
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'

    const systemPrompt = `Você é um nutricionista clínico especialista em estimativa visual de refeições, contagem de calorias e distribuição de macronutrientes.
Sua tarefa é analisar a imagem de comida fornecida e retornar um objeto JSON estritamente no seguinte formato:

{
  "dishName": "Nome descritivo e apetitoso do prato ou refeição em português",
  "confidence": 0.95, // número entre 0.1 e 1.0 indicando o nível de certeza na identificação
  "totalCalories": 650, // número inteiro de calorias totais estimadas (kcal)
  "servingSize": "1 prato médio (~400g)", // descrição da porção total estimada
  "healthScore": 80, // pontuação de saudabilidade de 0 a 100 baseada no equilíbrio nutricional
  "macros": {
    "protein": 45, // gramas inteiras de proteína
    "carbs": 60, // gramas inteiras de carboidratos
    "fat": 20 // gramas inteiras de gorduras totais
  },
  "items": [
    {
      "name": "Nome do alimento (ex: Peito de frango grelhado)",
      "calories": 250,
      "portion": "150g"
    }
  ],
  "tags": ["Rico em proteína", "Equilibrado", "Fonte de fibras"] // 2 a 4 tags em português descrevendo a refeição
}

Regras fundamentais:
1. Todos os textos devem ser em português do Brasil.
2. Certifique-se de que a soma aproximada das calorias dos itens seja coerente com o totalCalories (lembre que 1g proteína = 4 kcal, 1g carboidrato = 4 kcal, 1g gordura = 9 kcal).
3. Se a imagem NÃO for de comida ou bebida, retorne o dishName como "Não identificado como alimento", healthScore 0, totalCalories 0, macros zerados, items vazio e a tag "Imagem não reconhecida".
4. Retorne APENAS o JSON puro válido, sem marcação markdown e sem texto adicional fora do JSON.`

    const completion = await openai.chat.completions.create({
      model,
      response_format: { type: 'json_object' },
      temperature: 0.2,
      max_tokens: 1200,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analise esta refeição em detalhes nutricionais e retorne o JSON com o cálculo das calorias, macronutrientes e alimentos identificados.',
            },
            {
              type: 'image_url',
              image_url: {
                url: image,
                detail: 'auto',
              },
            },
          ],
        },
      ],
    })

    const rawContent = completion.choices[0]?.message?.content
    if (!rawContent) {
      throw new Error('A OpenAI não retornou resposta para a imagem fornecida.')
    }

    const parsed = JSON.parse(rawContent) as Partial<AnalysisResult>

    // Validação e normalização para garantir consistência com a UI
    const result: AnalysisResult = {
      dishName: parsed.dishName || 'Prato identificado',
      confidence: typeof parsed.confidence === 'number' ? Math.min(Math.max(parsed.confidence, 0.1), 1) : 0.9,
      totalCalories: Math.round(parsed.totalCalories || 0),
      servingSize: parsed.servingSize || '1 porção',
      healthScore: typeof parsed.healthScore === 'number' ? Math.min(Math.max(Math.round(parsed.healthScore), 0), 100) : 70,
      macros: {
        protein: Math.max(0, Math.round(parsed.macros?.protein || 0)),
        carbs: Math.max(0, Math.round(parsed.macros?.carbs || 0)),
        fat: Math.max(0, Math.round(parsed.macros?.fat || 0)),
      },
      items: Array.isArray(parsed.items)
        ? parsed.items.map((item) => ({
            name: String(item.name || 'Alimento'),
            calories: Math.max(0, Math.round(item.calories || 0)),
            portion: String(item.portion || 'Porção padrão'),
          }))
        : [],
      tags: Array.isArray(parsed.tags) && parsed.tags.length > 0 ? parsed.tags.map(String) : ['Análise por IA'],
    }

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Erro na análise da imagem com OpenAI:', error)

    const errorMessage =
      error?.error?.message ||
      error?.message ||
      'Ocorreu um erro ao processar a imagem com a OpenAI.'

    return NextResponse.json(
      { error: errorMessage },
      { status: error?.status || 500 }
    )
  }
}
