create table if not exists public.pedidos (
  id text primary key,
  numero integer not null,
  cliente jsonb not null,
  itens jsonb not null,
  subtotal numeric not null,
  taxa_entrega numeric not null,
  total numeric not null,
  pagamento text not null check (pagamento in ('pix', 'cartao', 'dinheiro')),
  troco numeric,
  status text not null check (status in ('pendente', 'em_preparo', 'saiu_entrega', 'entregue')),
  criado_em timestamptz not null default now()
);

alter table public.pedidos enable row level security;

drop policy if exists "Pedidos publicos para MVP" on public.pedidos;

create policy "Pedidos publicos para MVP"
on public.pedidos
for all
using (true)
with check (true);

alter publication supabase_realtime add table public.pedidos;
