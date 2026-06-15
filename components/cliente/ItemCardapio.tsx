'use client'

import { useState } from 'react'
import { Plus, Minus, X } from 'lucide-react'
import { Produto } from '@/lib/types'
import { useStore } from '@/lib/store'
import { formatarPreco } from '@/lib/utils'
import { TAMANHOS_PIZZA, PRECO_BORDA, produtos } from '@/lib/data'

interface ItemCardapioProps {
  produto: Produto
}

export default function ItemCardapio({ produto }: ItemCardapioProps) {
  const { carrinho, adicionarAoCarrinho, alterarQuantidade } = useStore()
  const [etapa, setEtapa] = useState<'inicial' | 'tamanho' | 'sabores' | 'borda'>('inicial')
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<'P' | 'M' | 'G' | 'F'>('P')
  const [saboresSelecionados, setSaboresSelecionados] = useState<string[]>([])
  const [temBorda, setTemBorda] = useState(false)

  const maxSabores = {
    'P': 1,
    'M': 2,
    'G': 3,
    'F': 4
  }

  const precoBase = TAMANHOS_PIZZA.find(t => t.id === tamanhoSelecionado)?.preco || 0
  const precoBorda = temBorda ? PRECO_BORDA[tamanhoSelecionado] : 0
  const precoFinal = precoBase + precoBorda

  // Filtrar apenas pizzas para seleção de sabores
  const pizzasDisponiveis = produtos.filter(p => p.categoria === 'pizzas')

  function handleSelecionarTamanho(tamanho: 'P' | 'M' | 'G' | 'F') {
    setTamanhoSelecionado(tamanho)
    setSaboresSelecionados([]) // Resetar sabores ao mudar tamanho
    setEtapa('sabores')
  }

  function handleSelecionarSabor(pizzaId: string) {
    const max = maxSabores[tamanhoSelecionado]
    
    if (saboresSelecionados.includes(pizzaId)) {
      // Remover sabor
      setSaboresSelecionados(prev => prev.filter(id => id !== pizzaId))
    } else if (saboresSelecionados.length < max) {
      // Adicionar sabor
      setSaboresSelecionados(prev => [...prev, pizzaId])
    }
  }

  function handleFinalizar() {
    if (saboresSelecionados.length === 0) {
      alert('Selecione pelo menos um sabor')
      return
    }

    // Criar descrição dos sabores
    const nomesSabores = saboresSelecionados.map(id => {
      const pizza = produtos.find(p => p.id === id)
      return pizza?.nome || ''
    }).filter(Boolean)

    let observacao = `Tamanho: ${tamanhoSelecionado}`
    if (nomesSabores.length > 0) {
      observacao += ` • Sabores: ${nomesSabores.join(' / ')}`
    }
    if (temBorda) {
      observacao += ' • Borda Recheada (Catupiry/Cheddar)'
    }

    // Adicionar ao carrinho
    adicionarAoCarrinho(
      { ...produto, preco: precoFinal },
      observacao,
      tamanhoSelecionado,
      temBorda,
      saboresSelecionados
    )

    // Resetar
    setEtapa('inicial')
    setSaboresSelecionados([])
    setTemBorda(false)
  }

  // Verificar se já existe no carrinho
  const itemNoCarrinho = carrinho.find(item => {
    if (item.produto.id !== produto.id) return false
    if (item.tamanhoPizza) {
      // Comparar sabores (ordem não importa)
      const saboresIguais = 
        item.tamanhoPizza === tamanhoSelecionado &&
        item.temBorda === temBorda &&
        item.saboresSelecionados?.length === saboresSelecionados.length &&
        item.saboresSelecionados?.every(s => saboresSelecionados.includes(s))
      return saboresIguais
    }
    return true
  })

  // ETAPA 1: Seleção de Tamanho
  if (etapa === 'tamanho') {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col border-2 border-primary">
        <h3 className="font-bold text-lg mb-2">{produto.nome}</h3>
        <p className="text-sm text-gray-600 mb-4">Selecione o tamanho:</p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {TAMANHOS_PIZZA.map(tamanho => (
            <button
              key={tamanho.id}
              type="button"
              onClick={() => handleSelecionarTamanho(tamanho.id)}
              className={`p-4 rounded-lg border-2 text-sm font-medium transition-all ${
                tamanhoSelecionado === tamanho.id
                  ? 'bg-primary text-white border-primary'
                  : 'border-gray-300 hover:border-primary hover:bg-orange-50'
              }`}
            >
              <div className="font-bold text-2xl">{tamanho.id}</div>
              <div className="text-xs opacity-90">{tamanho.nome}</div>
              <div className="text-lg font-bold">{formatarPreco(tamanho.preco)}</div>
              <div className="text-xs mt-1">
                {maxSabores[tamanho.id]} sabor{maxSabores[tamanho.id] > 1 ? 'es' : ''}
              </div>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setEtapa('inicial')}
          className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg transition-colors"
        >
          Cancelar
        </button>
      </div>
    )
  }

  // ETAPA 2: Seleção de Sabores
  if (etapa === 'sabores') {
    const max = maxSabores[tamanhoSelecionado]
    const restantes = max - saboresSelecionados.length

    return (
      <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col border-2 border-primary max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white pb-3 border-b mb-3">
          <h3 className="font-bold text-lg mb-1">{produto.nome}</h3>
          <p className="text-sm text-gray-600">
            Tamanho {tamanhoSelecionado} - Selecione {max} sabor{max > 1 ? 'es' : ''}
          </p>
          <p className="text-sm text-primary font-bold mt-1">
            {restantes} restante{restantes > 1 ? 's' : ''}
          </p>
        </div>

        <div className="space-y-2 mb-4">
          {pizzasDisponiveis.map(pizza => {
            const selecionado = saboresSelecionados.includes(pizza.id)
            const podeSelecionar = restantes > 0 || selecionado

            return (
              <button
                key={pizza.id}
                type="button"
                onClick={() => podeSelecionar && handleSelecionarSabor(pizza.id)}
                disabled={!podeSelecionar}
                className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                  selecionado
                    ? 'bg-green-50 border-green-500'
                    : podeSelecionar
                    ? 'border-gray-300 hover:border-primary'
                    : 'border-gray-200 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{pizza.nome}</div>
                    <div className="text-xs text-gray-600 line-clamp-2">{pizza.descricao}</div>
                  </div>
                  {selecionado && (
                    <div className="ml-2 bg-green-500 text-white rounded-full p-1">
                      <X size={14} />
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        <div className="sticky bottom-0 bg-white pt-3 border-t space-y-2">
          <button
            type="button"
            onClick={() => setEtapa('borda')}
            disabled={saboresSelecionados.length === 0}
            className="w-full bg-primary hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors"
          >
            Continuar ({saboresSelecionados.length}/{max})
          </button>
          <button
            type="button"
            onClick={() => {
              setEtapa('tamanho')
              setSaboresSelecionados([])
            }}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-lg transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    )
  }

  // ETAPA 3: Borda Recheada
  if (etapa === 'borda') {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col border-2 border-primary">
        <h3 className="font-bold text-lg mb-2">{produto.nome}</h3>
        <p className="text-sm text-gray-600 mb-4">
          Tamanho {tamanhoSelecionado} - {saboresSelecionados.length} sabor
          {saboresSelecionados.length > 1 ? 'es' : ''}
        </p>

        <div className="mb-4">
          <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-orange-50 transition-colors">
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

        <div className="bg-gray-100 rounded-lg p-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total:</span>
            <span className="text-2xl font-bold text-primary">{formatarPreco(precoFinal)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <button
            type="button"
            onClick={handleFinalizar}
            className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Adicionar ao Carrinho
          </button>
          <button
            type="button"
            onClick={() => setEtapa('sabores')}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-lg transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    )
  }

  // TELA INICIAL
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col hover:shadow-lg transition-shadow">
      <div className="flex-1">
        <h3 className="font-bold text-lg mb-1">{produto.nome}</h3>
        {produto.descricao && (
          <p className="text-sm text-gray-600 mb-2">{produto.descricao}</p>
        )}
        
        <div className="mb-2">
          <p className="text-primary font-bold text-2xl">
            {formatarPreco(TAMANHOS_PIZZA[0].preco)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Tamanhos: P/M/G/F • Até 4 sabores
          </p>
        </div>
      </div>

      <div className="mt-4">
        {itemNoCarrinho ? (
          <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
            <button
              onClick={() => alterarQuantidade(produto.id, itemNoCarrinho.quantidade - 1)}
              className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors"
            >
              <Minus size={18} />
            </button>
            <span className="font-bold text-lg px-3">{itemNoCarrinho.quantidade}</span>
            <button
              onClick={() => setEtapa('tamanho')}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full p-1.5 transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEtapa('tamanho')}
            className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-2 rounded-lg transition-colors"
          >
            Selecionar Tamanho e Sabores
          </button>
        )}
      </div>
    </div>
  )
}
