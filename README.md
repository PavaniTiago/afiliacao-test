# Sistema de Afiliação

Sistema completo de gerenciamento de afiliação desenvolvido com Next.js, oferecendo funcionalidades para gerenciar planos, membros e afiliados com sistema de ranking e indicações.

## 📋 Índice

- [Características](#-características)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Funcionalidades](#-funcionalidades)
- [Autenticação](#-autenticação)
- [Testes](#-testes)
- [Documentação](#-documentação)
- [Desenvolvimento](#-desenvolvimento)
- [Build e Deploy](#-build-e-deploy)

## ✨ Características

- 🔐 **Autenticação completa** com Better Auth
- 📊 **Dashboard interativo** para gerenciamento
- 👥 **Gestão de Afiliados** com código único
- 👤 **Gestão de Membros** com associação a planos e afiliados
- 💳 **Gestão de Planos** com preços e benefícios
- 🏆 **Sistema de Ranking** de afiliados por indicações
- 📱 **Interface moderna** com Tailwind CSS e Radix UI
- ✅ **Validação robusta** com Zod
- 🧪 **Testes unitários** com Jest
- 🔄 **Paginação eficiente** com cursor-based pagination

## 🛠 Tecnologias

### Core
- **Next.js 16** - Framework React com App Router
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática

### Autenticação
- **Better Auth** - Sistema de autenticação completo

### UI/UX
- **Tailwind CSS 4** - Framework CSS utility-first
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones modernos
- **Sonner** - Notificações toast

### Formulários e Validação
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **@hookform/resolvers** - Integração Zod + RHF

### Estado e Dados
- **SWR** - Data fetching e cache
- **Server Actions** - Ações do servidor Next.js

### Testes
- **Jest** - Framework de testes
- **React Testing Library** - Testes de componentes
- **ts-jest** - Suporte TypeScript para Jest

## 📦 Pré-requisitos

- **Node.js** >= 18.x
- **pnpm** >= 8.x (ou npm/yarn)
- **Backend API** rodando (porta 3333 por padrão)

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd desafio-afiliacao
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente (veja [Configuração](#-configuração))

4. Execute o servidor de desenvolvimento:
```bash
pnpm dev
```

5. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuração

Crie um arquivo `.env.local` na raiz do projeto:

```env
# URL do backend API
BACKEND_URL=http://localhost:3333

# URL pública (opcional, padrão: http://localhost:3000)
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `BACKEND_URL` | URL do backend API | `http://localhost:3333` |
| `NEXT_PUBLIC_API_URL` | URL pública da API | `http://localhost:3000` |

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev              # Inicia servidor de desenvolvimento

# Build
pnpm build            # Cria build de produção
pnpm start            # Inicia servidor de produção

# Testes
pnpm test             # Executa todos os testes
pnpm test:watch       # Executa testes em modo watch
pnpm test:coverage    # Executa testes com cobertura
```

## 📁 Estrutura do Projeto

```
desafio-afiliacao/
├── src/
│   ├── __tests__/          # Testes unitários
│   │   ├── api/
│   │   ├── schemas/
│   │   └── utils/
│   ├── app/                 # App Router do Next.js
│   │   ├── (auth)/         # Rotas de autenticação
│   │   ├── actions/        # Server Actions
│   │   ├── api/            # API Routes (proxy)
│   │   └── dashboard/      # Dashboard protegido
│   ├── components/         # Componentes React
│   │   ├── affiliates/    # Componentes de afiliados
│   │   ├── auth/          # Componentes de autenticação
│   │   ├── dashboard/     # Componentes do dashboard
│   │   ├── members/       # Componentes de membros
│   │   ├── plans/         # Componentes de planos
│   │   └── ui/            # Componentes UI reutilizáveis
│   ├── lib/               # Bibliotecas e utilitários
│   │   ├── api/           # Cliente API e serviços
│   │   ├── auth/          # Configuração de autenticação
│   │   ├── hooks/         # Custom hooks
│   │   └── utils/          # Funções utilitárias
│   ├── schemas/           # Schemas de validação Zod
│   └── types/             # Tipos TypeScript
├── public/                # Arquivos estáticos
├── jest.config.js         # Configuração Jest
├── jest.setup.js          # Setup Jest
├── next.config.ts         # Configuração Next.js
├── tsconfig.json          # Configuração TypeScript
└── package.json           # Dependências e scripts
```

## 🎯 Funcionalidades

### Autenticação
- ✅ Registro de usuários
- ✅ Login com email e senha
- ✅ Gerenciamento de sessão
- ✅ Proteção de rotas
- ✅ Logout

### Gestão de Planos
- ✅ Criar, editar e deletar planos
- ✅ Definir preço mensal e benefícios
- ✅ Visualizar membros associados a cada plano

### Gestão de Membros
- ✅ Criar, editar e deletar membros
- ✅ Associar membros a planos
- ✅ Associar membros a afiliados (opcional)
- ✅ Listagem paginada
- ✅ Filtro por afiliado

### Gestão de Afiliados
- ✅ Criar, editar e deletar afiliados
- ✅ Código único alfanumérico
- ✅ Visualizar membros indicados
- ✅ Sistema de ranking por indicações

### Dashboard
- ✅ Interface unificada com abas
- ✅ Visualização de todas as entidades
- ✅ Ações rápidas (criar, editar, deletar)
- ✅ Detalhes em modais

## 🔐 Autenticação

O sistema utiliza **Better Auth** para autenticação completa. A autenticação é gerenciada através de cookies HTTP-only, garantindo segurança.

### Fluxo de Autenticação

1. **Registro**: Usuário cria conta com nome, email e senha
2. **Login**: Usuário faz login com credenciais
3. **Sessão**: Better Auth gerencia sessão automaticamente via cookies
4. **Proteção**: Middleware protege rotas do dashboard

### Rotas Protegidas

- `/dashboard` - Requer autenticação
- Todas as rotas de API (exceto `/api/auth/*`)

### Rotas Públicas

- `/login` - Página de login
- `/register` - Página de registro
- `/` - Página inicial

Para mais detalhes sobre autenticação, consulte [AUTENTICACAO.md](./AUTENTICACAO.md).

## 🧪 Testes

O projeto inclui testes unitários abrangentes:

### Executar Testes

```bash
# Todos os testes
pnpm test

# Modo watch
pnpm test:watch

# Com cobertura
pnpm test:coverage
```

### Cobertura de Testes

- ✅ **Schemas de Validação** - Validação Zod completa
- ✅ **Utilitários** - Funções helper (cn, etc.)
- ✅ **API Client** - Tratamento de erros

### Estrutura de Testes

```
src/__tests__/
├── api/
│   └── fetch.test.ts          # Testes do cliente API
├── schemas/
│   └── validation.test.ts     # Testes de validação
└── utils/
    └── cn.test.ts             # Testes de utilitários
```

## 📚 Documentação

Documentação adicional disponível:

- **[AUTENTICACAO.md](./AUTENTICACAO.md)** - Guia completo de autenticação
- **[INTEGRACAO_FRONTEND.md](./INTEGRACAO_FRONTEND.md)** - Documentação de integração com backend

## 💻 Desenvolvimento

### Padrões de Código

- **TypeScript** estrito com validação de tipos
- **ESLint** para qualidade de código
- **Componentes funcionais** com hooks
- **Server Actions** para operações do servidor
- **Custom Hooks** para lógica reutilizável

### Convenções

- Componentes em PascalCase
- Hooks com prefixo `use`
- Arquivos de serviço com sufixo `.service.ts`
- Schemas de validação centralizados

### Adicionando Novos Recursos

1. Criar schema de validação em `src/schemas/validation.ts`
2. Adicionar tipos em `src/types/api.ts`
3. Criar serviço em `src/lib/api/services/`
4. Criar Server Action em `src/app/actions/`
5. Criar componentes em `src/components/`
6. Adicionar testes em `src/__tests__/`

## 🏗 Build e Deploy

### Build de Produção

```bash
pnpm build
```

### Executar Build

```bash
pnpm start
```

### Deploy

O projeto está pronto para deploy em plataformas como:

- **Vercel** (recomendado para Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker** (com configuração adicional)

### Variáveis de Ambiente em Produção

Certifique-se de configurar as variáveis de ambiente na plataforma de deploy:

- `BACKEND_URL` - URL do backend em produção
- `NEXT_PUBLIC_API_URL` - URL pública da API

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é privado e de uso interno.

## 📞 Suporte

Para dúvidas ou problemas:

1. Consulte a documentação em `AUTENTICACAO.md` e `INTEGRACAO_FRONTEND.md`
2. Verifique os testes para exemplos de uso
3. Entre em contato com a equipe de desenvolvimento

---

Desenvolvido com ❤️ usando Next.js e TypeScript
