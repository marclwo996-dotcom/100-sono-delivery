'use client'

import { Plus, Minus, Sandwich, Package, Pizza } from 'lucide-react'
import { Produto } from '@/lib/types'
import { useStore } from '@/lib/store'
import { formatarPreco } from '@/lib/utils'

interface ItemCardapioProps {
  produto: Produto
  onMontarPizza?: (produtoId: string) => void
}

export default function ItemCardapio({ produto, onMontarPizza }: ItemCardapioProps) {
  const { carrinho, adicionarAoCarrinho, alterarQuantidade } = useStore()

  const itemNoCarrinho = carrinho.find(item => item.produto.id === produto.id)
  const isPizza = produto.categoria === 'pizzas'
  const Icone = isPizza ? Pizza : produto.categoria === 'porcoes' || produto.categoria === 'combos' ? Package : Sandwich

  return (
    <div className="flex min-h-[210px] flex-col rounded-md border border-black/10 bg-white p-4 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-xl sm:min-h-[230px]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#ffc72c] text-[#29251f] sm:h-14 sm:w-14">
          <Icone size={isPizza ? 25 : 28} />
        </div>
        <p className="rounded-full bg-red-50 px-3 py-1 text-xs font-black uppercase text-[#d71920]">
          {isPizza ? 'Sabor' : 'Pronto rápido'}
        </p>
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-black leading-tight sm:text-xl">{produto.nome}</h3>
        {produto.descricao && (
          <p className="mt-2 line-clamp-3 text-sm font-medium leading-relaxed text-[#6b6257]">{produto.descricao}</p>
        )}
        <p className="mt-4 text-xl font-black text-[#d71920] sm:text-2xl">
          {isPizza ? `A partir de ${formatarPreco(produto.preco)}` : formatarPreco(produto.preco)}
        </p>
      </div>

      <div className="mt-4">
        {isPizza && onMontarPizza ? (
          <button
            onClick={() => onMontarPizza(produto.id)}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-[#d71920] py-3 font-black text-white transition-colors hover:bg-[#b9141a]"
          >
            <Pizza size={20} />
            Montar com este sabor
          </button>
        ) : itemNoCarrinho ? (
          <div className="flex items-center justify-between rounded-md bg-[#fff3bf] p-2">
            <button
              onClick={() => alterarQuantidade(produto.id, itemNoCarrinho.quantidade - 1)}
              className="rounded-full bg-[#d71920] p-2 text-white transition-colors hover:bg-[#b9141a]"
              aria-label={`Remover ${produto.nome}`}
            >
              <Minus size={18} />
            </button>
            <span className="px-3 text-lg font-black">{itemNoCarrinho.quantidade}</span>
            <button
              onClick={() => adicionarAoCarrinho(produto)}
              className="rounded-full bg-[#198754] p-2 text-white transition-colors hover:bg-[#146c43]"
              aria-label={`Adicionar mais ${produto.nome}`}
            >
              <Plus size={18} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => adicionarAoCarrinho(produto)}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-[#d71920] py-3 font-black text-white transition-colors hover:bg-[#b9141a]"
          >
            <Plus size={20} />
            Adicionar
          </button>
        )}
      </div>
    </div>
  )
}
