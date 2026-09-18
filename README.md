# 🥗 Calculadora Nutricional & Analisador de Alimentos

Aplicação web moderna desenvolvida com Next.js e inteligência artificial para análise nutricional instantânea de pratos e alimentos a partir de fotos e descrições.

## ✨ Funcionalidades

- 📸 **Análise por Imagem**: Envie uma foto do seu prato para identificar os alimentos e calcular os valores nutricionais.
- 💬 **Análise Textual**: Descreva sua refeição em texto para estimativa calórica e macronutrientes.
- 📊 **Detalhamento de Macronutrientes**: Calorias totais, proteínas, carboidratos, gorduras e fibras.
- ⚡ **Interface Rápida & Responsiva**: Desenvolvida com Next.js App Router, Tailwind CSS e componentes acessíveis.

## 🚀 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI API](https://openai.com/)
- [Lucide Icons](https://lucide.dev/)

## 🛠️ Como Executar Localmente

### Pré-requisitos
- Node.js (versão 18 ou superior)
- `npm` ou `pnpm`

### 1. Clonar o repositório
```bash
git clone https://github.com/JoaoPauloSCosta/calculadoranutri.git
cd calculadoranutri
```

### 2. Instalar as dependências
```bash
npm install
# ou
pnpm install
```

### 3. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com sua chave da OpenAI (veja o modelo em `.env.example`):
```env
OPENAI_API_KEY=sua_chave_openai_aqui
```

### 4. Executar em modo de desenvolvimento
```bash
npm run dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.
