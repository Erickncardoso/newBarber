# Sistema de Gerenciamento Fullstack

Um sistema web completo de gerenciamento com autenticação de usuários, desenvolvido com tecnologias modernas para oferecer uma experiência robusta e escalável.

## 🚀 Tecnologias

### Frontend
- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript 5** - Superset tipado do JavaScript
- **Vite 6** - Build tool e dev server
- **TailwindCSS 3** - Framework CSS utilitário
- **React Router Dom 7** - Roteamento para React
- **Zustand 5** - Gerenciamento de estado
- **Lucide React** - Ícones

### Backend
- **Node.js 18+** - Runtime JavaScript
- **Express 4** - Framework web
- **TypeScript 5** - Tipagem estática
- **Prisma 5** - ORM para banco de dados
- **Zod 3** - Validação de schemas

### Banco de Dados e Autenticação
- **Supabase** - Backend as a Service
- **PostgreSQL** - Banco de dados relacional
- **Supabase Auth** - Sistema de autenticação

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no [Supabase](https://supabase.com)
- npm ou pnpm

## ⚙️ Configuração

### 1. Configurar Supabase

1. Crie um novo projeto no [Supabase](https://supabase.com)
2. Vá para **Settings > API** e copie:
   - Project URL
   - anon/public key
   - service_role key (mantenha seguro!)
3. Vá para **Settings > Database** e copie a Connection String

### 2. Configurar Variáveis de Ambiente

1. Copie o arquivo de exemplo:
```bash
cp .env.example .env.local
```

2. Edite `.env.local` com suas credenciais do Supabase:
```env
# Database
DATABASE_URL="postgresql://postgres:[SUA-SENHA]@db.[SEU-PROJECT-REF].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[SUA-SENHA]@db.[SEU-PROJECT-REF].supabase.co:5432/postgres"

# Supabase
VITE_SUPABASE_URL="https://[SEU-PROJECT-REF].supabase.co"
VITE_SUPABASE_ANON_KEY="[SUA-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[SUA-SERVICE-ROLE-KEY]"

# JWT
JWT_SECRET="sua-chave-jwt-super-secreta"

# Server
PORT=3001
NODE_ENV=development
```

### 3. Instalar Dependências

```bash
npm install
```

### 4. Configurar Banco de Dados

```bash
# Gerar cliente Prisma
npm run db:generate

# Sincronizar schema com o banco
npm run db:push

# Popular com dados iniciais (opcional)
npm run db:seed
```

## 🚀 Executando o Projeto

### Desenvolvimento

```bash
# Executar frontend e backend simultaneamente
npm run dev

# Ou executar separadamente:
npm run client:dev  # Frontend (porta 5173)
npm run server:dev  # Backend (porta 3001)
```

### Produção

```bash
# Build do projeto
npm run build

# Preview da build
npm run preview
```

## 📚 Scripts Disponíveis

### Desenvolvimento
- `npm run dev` - Executa frontend e backend
- `npm run client:dev` - Executa apenas o frontend
- `npm run server:dev` - Executa apenas o backend

### Build e Deploy
- `npm run build` - Build de produção
- `npm run preview` - Preview da build
- `npm run lint` - Verificar código com ESLint
- `npm run check` - Verificar tipos TypeScript

### Banco de Dados
- `npm run db:generate` - Gerar cliente Prisma
- `npm run db:push` - Sincronizar schema
- `npm run db:migrate` - Executar migrações
- `npm run db:studio` - Abrir Prisma Studio
- `npm run db:seed` - Popular banco com dados

## 🏗️ Estrutura do Projeto

```
├── api/                    # Backend (Node.js + Express)
│   ├── lib/               # Configurações (Prisma, Supabase)
│   ├── middleware/        # Middlewares (autenticação)
│   ├── routes/           # Rotas da API
│   └── server.ts         # Servidor principal
├── src/                   # Frontend (React)
│   ├── components/       # Componentes React
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilitários e configurações
│   ├── pages/           # Páginas da aplicação
│   └── main.tsx         # Entrada do React
├── prisma/               # Configuração do banco
│   ├── schema.prisma    # Schema do banco
│   └── seed.ts          # Dados iniciais
├── public/              # Arquivos estáticos
└── .env.local          # Variáveis de ambiente
```

## 🔗 Endpoints da API

### Autenticação
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Registro de usuário
- `POST /api/auth/logout` - Logout

### Usuário
- `GET /api/user/profile` - Obter perfil
- `PUT /api/user/profile` - Atualizar perfil
- `GET /api/user/stats` - Estatísticas do usuário

### Registros
- `GET /api/records` - Listar registros
- `POST /api/records` - Criar registro
- `GET /api/records/:id` - Obter registro
- `PUT /api/records/:id` - Atualizar registro
- `DELETE /api/records/:id` - Deletar registro

### Utilitários
- `GET /api/health` - Status do servidor

## 🔐 Autenticação

O sistema usa Supabase Auth para autenticação:

1. **Frontend**: Usa `@supabase/supabase-js` para login/registro
2. **Backend**: Valida tokens JWT do Supabase
3. **Banco**: Sincroniza usuários entre Supabase Auth e Prisma

## 🎨 Interface

O design segue as especificações:
- **Cores**: Azul (#3B82F6) como primária
- **Fonte**: Inter ou system fonts
- **Estilo**: Cards com bordas arredondadas
- **Responsivo**: Mobile-first design

## 📱 Páginas

- `/` - Página inicial
- `/login` - Login
- `/register` - Registro
- `/dashboard` - Dashboard principal
- `/profile` - Perfil do usuário
- `/management` - Gerenciamento de dados

## 🛠️ Desenvolvimento

### Adicionando Novas Funcionalidades

1. **Backend**: Adicione rotas em `api/routes/`
2. **Frontend**: Crie componentes em `src/components/`
3. **Banco**: Modifique `prisma/schema.prisma`

### Debugging

- **Backend**: Logs no console do servidor
- **Frontend**: DevTools do navegador
- **Banco**: Use `npm run db:studio`

## 📄 Licença

Este projeto está sob a licença MIT.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request
