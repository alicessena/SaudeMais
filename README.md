<div align="center">
<img src="https://i.imgur.com/iWivvNA.png" alt="Logo Saúde Mais" width="200" />

 # Saúde Mais - Gestão Farmacêutica Inteligente</h1>
  **Projeto Vencedor, Equipe e Projeto Coday da Residência Tecnológica 2026.1**

  <p>
    <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=0B1220" />
    <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
    <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?style=for-the-badge&logo=javascript&logoColor=0B1220" />
    <img alt="CSS Modules" src="https://img.shields.io/badge/CSS%20Modules-Design%20System-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
    <img alt="React Router" src="https://img.shields.io/badge/React%20Router-7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" />
    <img alt="Recharts" src="https://img.shields.io/badge/Recharts-Dashboard-22A06B?style=for-the-badge" />
    <img alt="localStorage" src="https://img.shields.io/badge/localStorage-Persist%C3%AAncia-334155?style=for-the-badge" />
  </p>
</div>

**Gestão farmacêutica inteligente para controle de estoque, solicitações e movimentações em ambientes de saúde.**

O **Saúde Mais** existe para reduzir perdas, rupturas de estoque, retrabalho operacional e baixa visibilidade sobre medicamentos em instituições de saúde. O projeto ataca uma dor recorrente do mercado: equipes farmacêuticas e administrativas precisam tomar decisões rápidas sobre entrada, saída, reposição e aprovação de medicamentos, mas muitas vezes dependem de planilhas, processos manuais ou sistemas fragmentados.

Este repositório representa um **protótipo funcional de produto SaaS corporativo**, pensado para demonstrações executivas, validação de mercado, eventos de inovação e evolução gradual para uma arquitetura de produção escalável.

## 🎯 O Protótipo (MVP)
[![Teste Agora](https://i.imgur.com/NjMHH9O.png)](https://saude-mais-one.vercel.app/)

O MVP atual é uma aplicação **front-end React** que simula uma plataforma de gestão farmacêutica usando dados locais e persistência em `localStorage`. O objetivo desta fase é validar experiência, fluxos principais, regras operacionais e proposta de valor antes de investir em backend, autenticação real e banco de dados gerenciado.

**Funcionalidades implementadas nesta fase:**

- **Dashboard executivo** com visão consolidada de medicamentos, estoque, solicitações e alertas críticos.
- **Cadastro e manutenção de medicamentos**, incluindo princípio ativo, fabricante e preço unitário.
- **Controle de estoque** com quantidade atual, estoque mínimo e status operacional.
- **Solicitações de entrada e saída**, com fluxo de criação, aprovação e reprovação.
- **Central de aprovações** para tomada de decisão sobre solicitações pendentes.
- **Histórico de entradas** aprovadas no estoque.
- **Histórico de saídas** e consumo de medicamentos.
- **Persistência local** para manter dados entre sessões do navegador.
- **Notificações visuais** para feedback de operações.
- **Interface modular em React**, organizada em páginas, componentes, contexto e serviços.

**Fora do escopo intencional do MVP:**

- Autenticação, autorização e perfis reais de acesso.
- Backend dedicado com API REST/GraphQL.
- Banco de dados relacional ou NoSQL em produção.
- Auditoria imutável de eventos e trilha regulatória completa.
- Integração com sistemas hospitalares, ERPs ou APIs externas.
- Testes automatizados completos de unidade, integração e e2e.
- Observabilidade, telemetria, logs estruturados e monitoramento em produção.
- Deploy cloud com pipeline CI/CD.

Esses pontos são tratados como **próximas fases estratégicas**, não como falhas do protótipo.

## 🏗️ Arquitetura e Desenho Técnico

O protótipo adota uma arquitetura **SPA client-side com React + Vite**, persistindo dados no navegador por meio de `localStorage`. Essa escolha reduz custo inicial, acelera ciclos de descoberta e permite validar rapidamente UX, modelagem de dados e fluxos de negócio sem depender de infraestrutura backend.

A estrutura atual favorece **separação de responsabilidades**:

- `pages/`: telas principais e fluxos de negócio.
- `components/`: componentes reutilizáveis de interface e modais.
- `context/`: estado compartilhado da aplicação.
- `services/`: serviços de persistência local e notificações.
- `data/`: datasets iniciais do protótipo.
- `styles/`: tokens globais e estilos base.

### Fluxo da Informação

```text
1. Usuário interage com a interface React
   └─ Ex: cria medicamento, aprova solicitação ou ajusta estoque.

2. A página aciona uma função do DataContext
   └─ Ex: addMedicamento, updateEstoque, aprovarSolicitacao.

3. O DataContext aplica a regra de negócio em memória
   └─ Atualiza arrays de medicamentos, estoque, entradas, saídas ou solicitações.

4. O localStorageService persiste os dados no navegador
   └─ Os dados permanecem disponíveis após recarregar a aplicação.

5. A interface é re-renderizada automaticamente pelo React
   └─ Dashboard, tabelas, badges e históricos refletem o novo estado.

6. O notificationService exibe feedback ao usuário
   └─ Toasts de sucesso, alerta ou erro informam o resultado da operação.
```

Em uma versão de produção, o passo de persistência local seria substituído por uma camada de API, validação server-side, autenticação e banco de dados transacional.

### Stack Tecnológica

| Tecnologia | Camada | Justificativa do Uso |
|---|---|---|
| React | Frontend | Base declarativa para construção de interfaces ricas, componentizadas e reativas. |
| Vite | Frontend/Build | Ambiente rápido de desenvolvimento, HMR eficiente e build moderno para SPA. |
| React Router DOM | Frontend | Gerenciamento de rotas client-side entre Dashboard, Estoque, Solicitações e demais módulos. |
| CSS Modules | Frontend | Escopo local de estilos, reduzindo colisões e melhorando manutenibilidade visual. |
| Recharts | Frontend | Criação de gráficos executivos para indicadores do dashboard. |
| React Icons | Frontend | Biblioteca de ícones para melhorar affordance visual e leitura rápida da interface. |
| React Toastify | Frontend | Feedback visual consistente para ações do usuário. |
| Context API | Estado | Compartilhamento de dados do MVP sem complexidade prematura de bibliotecas externas. |
| localStorage | Basic/Persistência | Persistência simples e de baixo custo para validação de protótipo sem backend. |
| ESLint | Qualidade | Padronização mínima de qualidade e prevenção de problemas comuns em React. |

## ⚡ Como Executar o Protótipo

### Pré-requisitos

- **Node.js** instalado.
- **npm** instalado.
- Terminal com acesso à pasta do projeto.

### Passo a passo

Clone o repositório e acesse a pasta do projeto:

```bash
git clone https://github.com/alicessena/SaudeMais
cd SaudeMais
```

Instale as dependências:

```bash
npm install
```

Execute o ambiente local:

```bash
npm run dev
```

Acesse a URL exibida pelo Vite no terminal, normalmente:

```text
http://localhost:5173
```

### Variáveis de ambiente

O MVP atual **não exige variáveis de ambiente**, pois utiliza dados locais e `localStorage`.

### Comandos úteis

```bash
# Executar em desenvolvimento
npm run dev

# Gerar build de produção
npm run build

# Executar análise de lint
npm run lint

# Pré-visualizar build local
npm run preview
```

---

**Saúde Mais** é um protótipo orientado a produto: simples o bastante para validar rápido, mas estruturado para evoluir com segurança para uma solução corporativa real.


## Desenvolvido por

| <img width="120" src="https://github.com/alicessena.png"> |
|:----------------------------------------------------------:|
| **Alice Sena** |
| **Desenvolvedora Full Stack** |
| 🔗 [LinkedIn](https://www.linkedin.com/in/alicessenapereira/) • [GitHub](https://github.com/alicessena) |