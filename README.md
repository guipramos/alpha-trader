# 📈 NexisAnalytics - Plataforma de Analytics de Cripto em Tempo Real

[![React](https://shields.io)](https://react.dev)
[![TypeScript](https://shields.io)](https://typescriptlang.org)
[![Zustand](https://shields.io)](https://pmnd.rs)
[![Vite](https://shields.io)](https://vite.dev)

Uma plataforma financeira de alta densidade de dados voltada para o monitoramento e análise de criptoativos em tempo real. O foco principal deste projeto é demonstrar a resolução de problemas complexos de frontend, como **gerenciamento de estado sob alta frequência de dados**, **otimização de renderização (60 FPS)** e **arquitetura de software escalável**.

O projeto consome a **API pública de WebSockets da Binance**, processando centenas de atualizações por segundo sem degradar a experiência do usuário.

---

## 🚀 Funcionalidades Principais

- **Dashboard Principal**: Gráfico de Candlesticks de alta performance integrado com indicadores técnicos (EMA, MACD).
- **Order Book em Tempo Real**: Painel dividido entre ordens de compra (Bids) e venda (Asks) com barras visuais de profundidade de mercado.
- **Histórico de Negociações (Recent Trades)**: Feed contínuo e ultrarrápido das últimas transações executadas no mercado global.
- **Painel de Automação**: Monitoramento de robôs de trading ativos com paginação, ordenação e filtros avançados.
- **Sistema de Alertas**: Criação de gatilhos customizados para cruzamento de preços e picos de volatilidade com notificações em tempo real.

---

## 🏗️ Arquitetura e Decisões Técnicas

Para mitigar o gargalo de processamento comum em aplicações que lidam com streams de WebSockets de alta frequência, foram adotadas as seguintes estratégias arquiteturais:

### 1. Desacoplamento da Thread Principal (Web Workers)

A conexão com o WebSocket da Binance e as operações matemáticas pesadas (como o cálculo de médias móveis) rodam em uma thread separada via **Web Workers**. Isso impede que o fluxo massivo de dados trave a UI.

### 2. Throttling & Batching de Estado

Em vez de disparar re-renderizações no React a cada milissegundo, os dados que chegam do WebSocket são acumulados em um _buffer_. O Web Worker envia lotes de dados compilados para o estado global (**Zustand**) em intervalos controlados (ex: a cada 150ms).

### 3. Virtualização de DOM (Renderização Eficiente)

Os componentes de _Order Book_ e _Recent Trades_ utilizam **virtualização de listas** (`@tanstack/react-virtual`). Apenas as linhas visíveis na tela são renderizadas no DOM, reduzindo drasticamente o consumo de memória e CPU.

### 4. Renderização via Canvas

Os gráficos utilizam a engine baseada em **Canvas HTML5** através do Apache ECharts/TradingView Lightweight Charts, evitando a sobrecarga de nós que ocorreria caso utilizássemos SVG para milhares de pontos de dados.

---

## 📦 Stack Tecnológica

- **Frontend**: React (Hooks, Context, Web Workers)
- **Linguagem**: TypeScript (Strict Mode)
- **Gerenciamento de Estado**: Zustand (轻量, performático e fora do ciclo padrão do React)
- **Bundler & Build**: Vite
- **Estilização**: Tailwind CSS (Abordagem baseada em utilitários com suporte nativo a Dark Mode)
- **Gráficos**: Apache ECharts / TradingView Lightweight Charts
- **Testes**: Vitest (Testes unitários) e Playwright (Testes de ponta a ponta e fluxos críticos)

---

## 🛠️ Organização do Projeto

O projeto segue o padrão **Feature-Driven Development (FDD)**, isolando regras de negócio e componentes por contexto para facilitar a manutenibilidade e escalabilidade do código:

```text
src/
├── app/          # Configurações globais, provedores e rotas
├── assets/       # Arquivos estáticos (imagens, fontes)
├── components/   # Componentes globais compartilhados (Botões, Inputs, Modais)
├── features/     # Módulos isolados por funcionalidade do negócio
│   ├── dashboard/   # Gráficos, Order Book e lógicas de mercado
│   ├── alerts/      # Sistema de criação e exibição de gatilhos
│   └── bots/        # Tabela e gerenciamento de robôs automatizados
├── hooks/        # Hooks customizados utilitários globais
└── workers/      # Scripts dos Web Workers para processamento em background
```

---

## 🏁 Como Rodar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/guipramos/alpha-trader
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Para rodar a suite de testes:
   ```bash
   npm run test
   ```

---

## ✉️ Contato

Desenvolvido por **[Guilherme Ramos]**

- LinkedIn: [https://www.linkedin.com/in/guihpramos]
