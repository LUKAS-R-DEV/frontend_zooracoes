# 🚀 Guia de Deploy do Frontend no Vercel

Este guia explica como fazer o deploy do frontend ZoorAções no Vercel e conectá-lo ao backend no Render.

## 📋 Pré-requisitos

1. Conta no [Vercel](https://vercel.com)
2. Repositório GitHub com o código do frontend
3. Backend rodando no Render (ex: `https://zooracoes-api.onrender.com`)

## 🔧 Configuração no Vercel

### 1. Conectar Repositório

1. Acesse o [Dashboard do Vercel](https://vercel.com/dashboard)
2. Clique em **"Add New..."** → **"Project"**
3. Conecte seu repositório GitHub
4. Selecione o repositório `frontend_zooracoes`

### 2. Configurações do Build

- **Framework Preset**: `Vite`
- **Root Directory**: `./` (raiz do projeto)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. Variáveis de Ambiente

Adicione a seguinte variável de ambiente no Vercel:

```env
VITE_API_BASE_URL=https://backend-zooracoes.onrender.com
```

**Como adicionar:**
1. No projeto do Vercel, vá em **Settings** → **Environment Variables**
2. Adicione:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://backend-zooracoes.onrender.com`
   - **Environments**: Production, Preview, Development

### 4. Deploy

1. Clique em **"Deploy"**
2. Aguarde o build completar
3. O Vercel fornecerá uma URL (ex: `https://frontend-zooracoes.vercel.app`)

## 🔗 Configuração do Backend (CORS)

O backend já está configurado para aceitar requisições do frontend no Vercel:

- ✅ `https://frontend-zooracoes.vercel.app` está permitido no CORS
- ✅ Métodos HTTP permitidos: GET, POST, PUT, DELETE, PATCH, OPTIONS
- ✅ Credenciais habilitadas
- ✅ Backend disponível em: `https://backend-zooracoes.onrender.com`

## ✅ Verificação

Após o deploy, teste:

1. Acesse `https://frontend-zooracoes.vercel.app`
2. Tente fazer login
3. Verifique se as requisições estão funcionando

## 🔄 Atualizações

O Vercel faz deploy automático quando você faz push para a branch `main`.

Para deploy manual:
1. Vá para o projeto no Vercel
2. Clique em **"Deployments"** → **"Redeploy"**

## 🐛 Troubleshooting

### Erro de CORS
- Verifique se a URL do frontend está no CORS do backend
- Confirme que o backend está rodando e acessível

### Erro 404 nas requisições
- Verifique se `VITE_API_BASE_URL` está configurada corretamente
- Confirme que a URL do backend está acessível

### Build falha
- Verifique os logs de build no Vercel
- Confirme que todas as dependências estão no `package.json`

## 📚 Recursos

- [Documentação Vercel](https://vercel.com/docs)
- [Vite no Vercel](https://vercel.com/docs/frameworks/vite)

