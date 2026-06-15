'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { Produto } from '@/lib/types'
import { useStore } from '@/lib/store'
import { formatarPreco } from '@/lib/utils'
import { TAMANHOS_PIZZA, PRECO_BORDA } from '@/lib/data'

interface ItemCardapioProps {
  produto: Produto
}

export default function ItemCardapio({ produto }: ItemCardapioProps) {
  const { carrinho, adicionarAoCarrinho, alterarQuantidade } = useStore()
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<'P' | 'M' | 'G' | 'F'>('P')
  const [temBorda, setTemBorda] = useState(false)
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false)

  const precoBase = produto.temTamanhos 
    ? TAMANHOS_PIZZA.find(t => t.id === tamanhoSelecionado)?.preco || produto.preco
    : produto.preco

  const precoBorda = temBorda ? PRECO_BORDA[tamanhoSelecionado] : 0
  const precoFinal = precoBase + precoBorda

  function handleAdicionar() {
    if (produto.temTamanhos && !mostrarOpcoes) {
      setMostrarOpcoes(true)
      return
    }

    let observacao = ''
    if (produto.temTamanhos) {
      const tamanho = TAMANHOS_PIZZA.find(t => t.id === tamanhoSelecionado)
      observacao = `Tamanho: ${tamanho?.nome}`
      if (temBorda) {
        observacao += ' + Borda Recheada (Catupiry/Cheddar)'
      }
    }

    adicionarAoCarrinho(
      { ...produto, preco: precoFinal },
      observacao || undefined,
      produto.temTamanhos ? tamanhoSelecionado : undefined,
      temBorda
    )
    
    if (produto.temTamanhos) {
      setMostrarOpcoes(false)
    }
  }

  // Verificar se já existe no carrinho (considerando tamanho e borda)
  const itemNoCarrinho = carrinho.find(item => {
    if (item.produto.id !== produto.id) return false
    if (produto.temTamanhos) {
      return item.tamanhoPizza === tamanhoSelecionado && item.temBorda === temBorda
    }
    return true
  })

  // Se estiver mostrando opções de tamanho/borda
  if (produto.temTamanhos && mostrarOpcoes) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col border-2 border-primary">
        <h3 className="font-bold text-lg mb-2">{produto.nome}</h3>
        {produto.descricao && (
          <p className="text-sm text-gray-600 mb-4">{produto.descricao}</p>
        )}

        {/* Seleção de Tamanho */}
        <div className="mb-4">
          <p className="font-semibold mb-2 text-sm">Selecione o tamanho:</p>
          <div className="grid grid-cols-2 gap-2">
            {TAMANHOS_PIZZA.map(tamanho => (
              <button
                key={tamanho.id}
                type="button"
                onClick={() => setTamanhoSelecionado(tamanho.id)}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                  tamanhoSelecionado === tamanho.id
                    ? 'bg-primary text-white border-primary'
                    : 'border-gray-300 hover:border-primary hover:bg-orange-50'
                }`}
              >
                <div className="font-bold text-lg">{tamanho.id}</div>
                <div className="text-xs opacity-90">{tamanho.nome}</div>
                <div className="text-sm font-bold">{formatarPreco(tamanho.preco)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Opção de Borda Recheada */}
        <div className="mb-4">
          <label className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-orange-50 transition-colors">
            <input
              type="checkbox"
              checked={temBorda}
              onChange={(e) => setTemBorda(e.target.checked)}
              className="w-5 h-5 accent-primary"
            />
            <div className="flex-1">
              <div className="font-semibold text-sm">Borda Recheada</div>
              <div className="text-xs text-gray-600">Catupiry ou Cheddar</div>
              <div className="text-sm text-primary font-bold">
                + {formatarPreco(PRECO_BORDA[tamanhoSelecionado])}
              </div>
            </div>
          </label>
        </div>

        {/* Preço Final */}
        <div className="bg-gray-100 rounded-lg p-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total:</span>
            <span className="text-2xl font-bold text-primary">{formatarPreco(precoFinal)}</span>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMostrarOpcoes(false)}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleAdicionar}
            className="flex-1 bg-primary hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Adicionar
          </button>
        </div>
      </div>
    )
  }

  // Card normal (sem mostrar opções)
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col hover:shadow-lg transition-shadow">
      <div className="flex-1">
        <h3 className="font-bold text-lg mb-1">{produto.nome}</h3>
        {produto.descricao && (
          <p className="text-sm text-gray-600 mb-2">{produto.descricao}</p>
        )}
        
        <div className="mb-2">
          <p className="text-primary font-bold text-2xl">
            {formatarPreco(precoBase)}
          </p>
          {produto.temTamanhos && (
            <p className="text-xs text-gray-500 mt-1">
              Tamanhos: P/M/G/F • Borda: +R$6-8
            </p>
          )}
        </div>
      </div>

      {!produto.temTamanhos && (
        <div className="mt-4">
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
              onClick={handleAdicionar}
              className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Adicionar
            </button>
          )}
        </div>
      )}

      {produto.temTamanhos && (
        <div className="mt-4">
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
                onClick={handleAdicionar}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full p-1.5 transition-colors"
                aria-label="Adicionar mais"
              >
                <Plus size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdicionar}
              className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Selecionar Tamanho
            </button>
          )}
        </div>
      )}
    </div>
  )
}
