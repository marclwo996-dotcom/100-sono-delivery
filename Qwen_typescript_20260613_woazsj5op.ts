'use client'

import { Plus, Minus } from 'lucide-react'
import { Produto } from '@/lib/types'
import { useStore } from '@/lib/store'
import { formatarPreco } from '@/lib/utils'

interface ItemCardapioProps {
  produto: Produto
}

export default function ItemCardapio({ produto }: ItemCardapioProps) {
  const { carrinho, adicionarAoCarrinho, alterarQuantidade } = useStore()
  
  const itemNoCarrinho = carrinho.find(item => item.produto.id === produto.id)

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <div className="flex-1">
        <h3 className="font-bold text-lg mb-1">{produto.nome}</h3>
        {produto.descricao && (
          <p className="text-sm text-gray-600 mb-2">{produto.descricao}</p>
        )}
        <p className="text-primary font-bold text-xl">
          {formatarPreco(produto.preco)}
        </p>
      </div>

n      <div className="mt-4">
        {itemNoCarrinho ? (
          <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
            <button
              onClick={() => alterarQuantidade(produto.id, itemNoCarrinho.quantidade - 1)}
              className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors"
              aria-label="Diminuir quantidade"
            >
              <Minus size={18} />
            </button>
            <span className="font-bold text-lg px-3">{itemNoCarrinho.quantidade}</span>
            <button
              onClick={() => adicionarAoCarrinho(produto)}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full p-1.5 transition-colors"
              aria-label="Aumentar quantidade"
            >
              <Plus size={18} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => adicionarAoCarrinho(produto)}
            className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Adicionar
          </button>
        )}
      </div>
    </div>
  )
}