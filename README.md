# 100 Sono Delivery

Sistema de delivery para cardapio, carrinho, cozinha e acompanhamento de pedido.

## Rodar local

```bash
npm install
npm run dev
```

Rotas:

- `/` cardapio do cliente
- `/cozinha` painel da cozinha
- `/pedido/[id]` acompanhamento em tempo real

## Colocar online

1. Crie um projeto no Supabase.
2. Abra o SQL Editor do Supabase.
3. Rode o conteudo do arquivo `supabase.sql`.
4. Copie `.env.example` para `.env.local`.
5. Preencha:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
6. Rode `npm run build`.
7. Na Vercel, cadastre as mesmas variaveis de ambiente.
8. Publique com `npx vercel deploy --prod` ou conecte o projeto ao GitHub.

O numero do WhatsApp deve estar no formato DDI + DDD + numero, exemplo:

```text
5511999999999
```
