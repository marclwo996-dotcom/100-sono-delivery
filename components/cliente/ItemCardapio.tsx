'use client'

import { useState } from 'react'
import { Plus, Minus, X, ChevronRight, Check } from 'lucide-react'
import { Produto, TipoBorda } from '@/lib/types'
import { useStore } from '@/lib/store'
import { formatarPreco } from '@/lib/utils'
import { TAMANHOS_PIZZA, PRECO_BORDA, produtos } from '@/lib/data'

interface ItemCardapioProps {
  produto: Produto
}

type Etapa = 'inicial' | 'tamanho' | 'sabores' | 'borda'

export default function ItemCardapio({ produto }: ItemCardapioProps) {
  const { carrinho, adicionarAoCarrinho, alterarQuantidade } = useStore()
  const [etapa, setEtapa] = useState<Etapa>('inicial')
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<'P' | 'M' | 'G' | 'F'>('P')
  const [saboresSelecionados, setSaboresSelecionados] = useState<string[]>([])
  const [tipoBorda, setTipoBorda] = useState<TipoBorda>('sem')

  const maxSabores = { 'P': 1, 'M': 2, 'G': 3, 'F': 4 }

  const precoBase = TAMANHOS_PIZZA.find(t => t.id === tamanhoSelecionado)?.preco || 0
  const precoBorda = PRECO_BORDA[tipoBorda]?.[tamanhoSelecionado] || 0
  const precoFinal = precoBase + precoBorda

  const pizzasDisponiveis = produtos.filter(p => p.categoria === 'pizzas')

  function handleSelecionarTamanho(tamanho: 'P' | 'M' | 'G' | 'F') {
    setTamanhoSelecionado(tamanho)
    setSaboresSelecionados([])
    setTipoBorda('sem')
    setEtapa('sabores')
  }

  function handleSelecionarSabor(pizzaId: string) {
    const max = maxSabores[tamanhoSelecionado]
    
    if (saboresSelecionados.includes(pizzaId)) {
      setSaboresSelecionados(prev => prev.filter(id => id !== pizzaId))
    } else if (saboresSelecionados.length < max) {
      setSaboresSelecionados(prev => [...prev, pizzaId])
    }
  }

  function handleFinalizar() {
    if (saboresSelecionados.length === 0) {
      alert('Selecione pelo menos um sabor')
      return
    }

    const nomesSabores = saboresSelecionados.map(id => {
      const pizza = produtos.find(p => p.id === id)
      return pizza?.nome || ''
    }).filter(Boolean)

    const tamanhoNome = TAMANHOS_PIZZA.find(t => t.id === tamanhoSelecionado)?.nome || tamanhoSelecionado
    const bordaNome = tipoBorda === 'sem' ? 'Sem borda' : tipoBorda === 'cheddar' ? 'Borda de Cheddar' : 'Borda de Catupiry'

    let observacao = `Tamanho: ${tamanhoNome}`
    if (nomesSabores.length > 0) {
      observacao += ` • Sabor${nomesSabores.length > 1 ? 'es' : ''}: ${nomesSabores.join(' / ')}`
    }
    observacao += ` • ${bordaNome}`

    adicionarAoCarrinho(
      { ...produto, preco: precoFinal },
      observacao,
      tamanhoSelecionado,
      saboresSelecionados,
      tipoBorda
    )

    // Resetar
    setEtapa('inicial')
    setSaboresSelecionados([])
    setTipoBorda('sem')
  }

  const itemNoCarrinho = carrinho.find(item => {
    if (item.produto.id !== produto.id) return false
    if (item.tamanhoPizza) {
      return item.tamanhoPizza === tamanhoSelecionado &&
             item.tipoBorda === tipoBorda &&
             item.saboresSelecionados?.length === saboresSelecionados.length &&
             item.saboresSelecionados?.every(s => saboresSelecionados.includes(s))
    }
    return true
  })

  // ============================================
  // ETAPA 1: SELEÇÃO DE TAMANHO
  // ============================================
  if (etapa === 'tamanho') {
    return (
      <div className="bg-white rounded-lg shadow-lg p-5 flex flex-col border-2 border-primary">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">{produto.nome}</h3>
          <button onClick={() => setEtapa('inicial')} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Escolha o tamanho da pizza:
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {TAMANHOS_PIZZA.map(tamanho => (
            <button
              key={tamanho.id}
              type="button"
              onClick={() => handleSelecionarTamanho(tamanho.id)}
              className="p-4 rounded-lg border-2 border-gray-300 hover:border-primary hover:bg-orange-50 transition-all text-center"
            >
              <div className="font-bold text-3xl text-primary">{tamanho.id}</div>
              <div className="text-xs text-gray-600 mt-1">{tamanho.nome}</div>
              <div className="text-lg font-bold mt-2">{formatarPreco(tamanho.preco)}</div>
              <div className="text-xs text-gray-500 mt-1">
                Até {maxSabores[tamanho.id]} sabor{maxSabores[tamanho.id] > 1 ? 'es' : ''}
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ============================================
  // ETAPA 2: SELEÇÃO DE SABORES
  // ============================================
  if (etapa === 'sabores') {
    const max = maxSabores[tamanhoSelecionado]
    const restantes = max - saboresSelecionados.length

    return (
      <div className="bg-white rounded-lg shadow-lg flex flex-col border-2 border-primary max-h-[85vh]">
        {/* Header fixo */}
        <div className="sticky top-0 bg-white p-4 border-b z-10">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-lg">Escolha os sabores</h3>
            <button onClick={() => { setEtapa('tamanho'); setSaboresSelecionados([]) }} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="bg-primary text-white px-2 py-1 rounded font-bold">
              {tamanhoSelecionado}
            </span>
            <span className="text-gray-600">
              {saboresSelecionados.length} de {max} sabor{max > 1 ? 'es' : ''} selecionado{saboresSelecionados.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Sabores selecionados */}
          {saboresSelecionados.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {saboresSelecionados.map(id => {
                const pizza = produtos.find(p => p.id === id)
                return (
                  <span key={id} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    {pizza?.nome}
                    <button onClick={() => handleSelecionarSabor(id)} className="hover:text-red-600">
                      <X size={12} />
                    </button>
                  </span>
                )
              })}
            </div>
          )}
        </div>

        {/* Lista de sabores */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
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
                    ? 'border-gray-200 hover:border-primary'
                    : 'border-gray-100 opacity-40 cursor-not-allowed'
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    selecionado ? 'bg-green-500 border-green-500' : 'border-gray-300'
                  }`}>
                    {selecionado && <Check size={12} className="text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">{pizza.nome}</div>
                    <div className="text-xs text-gray-600 line-clamp-2">{pizza.descricao}</div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Footer fixo */}
        <div className="sticky bottom-0 bg-white p-4 border-t">
          <button
            type="button"
            onClick={() => setEtapa('borda')}
            disabled={saboresSelecionados.length === 0}
            className="w-full bg-primary hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Continuar
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    )
  }

  // ============================================
  // ETAPA 3: SELEÇÃO DE BORDA
  // ============================================
  if (etapa === 'borda') {
    const opcoesBorda: { id: TipoBorda; nome: string; emoji: string }[] = [
      { id: 'sem', nome: 'Sem Borda', emoji: '🚫' },
      { id: 'cheddar', nome: 'Borda de Cheddar', emoji: '🧀' },
      { id: 'catupiry', nome: 'Borda de Catupiry', emoji: '🥛' }
    ]

    const nomesSabores = saboresSelecionados.map(id => {
      const pizza = produtos.find(p => p.id === id)
      return pizza?.nome || ''
    }).filter(Boolean)

    return (
      <div className="bg-white rounded-lg shadow-lg p-5 flex flex-col border-2 border-primary">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Escolha a borda</h3>
          <button onClick={() => setEtapa('sabores')} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Resumo da pizza */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4 text-sm">
          <div className="font-semibold mb-1">Sua pizza:</div>
          <div className="text-gray-700">
            <span className="bg-primary text-white px-2 py-0.5 rounded font-bold mr-2">{tamanhoSelecionado}</span>
            {nomesSabores.join(' / ')}
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-3">
          Deseja borda recheada?
        </p>

        <div className="space-y-2 mb-4">
          {opcoesBorda.map(opcao => {
            const precoAdicional = PRECO_BORDA[opcao.id]?.[tamanhoSelecionado] || 0
            const selecionado = tipoBorda === opcao.id

            return (
              <button
                key={opcao.id}
                type="button"
                onClick={() => setTipoBorda(opcao.id)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all flex items-center gap-3 ${
                  selecionado
                    ? 'bg-green-50 border-green-500'
                    : 'border-gray-200 hover:border-primary'
                }`}
              >
                <div className="text-2xl">{opcao.emoji}</div>
                <div className="flex-1">
                  <div className="font-semibold">{opcao.nome}</div>
                  <div className="text-sm text-gray-600">
                    {precoAdicional > 0 ? `+ ${formatarPreco(precoAdicional)}` : 'Grátis'}
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selecionado ? 'bg-green-500 border-green-500' : 'border-gray-300'
                }`}>
                  {selecionado && <Check size={12} className="text-white" />}
                </div>
              </button>
            )
          })}
        </div>

        {/* Total */}
        <div className="bg-gray-100 rounded-lg p-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total:</span>
            <span className="text-2xl font-bold text-primary">{formatarPreco(precoFinal)}</span>
          </div>
        </div>

        {/* Botões */}
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
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 rounded-lg transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    )
  }

  // ============================================
  // TELA INICIAL (Card do produto)
  // ============================================
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
            Tamanhos P, M, G e F • Até 4 sabores
          </p>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={() => setEtapa('tamanho')}
          className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Personalizar Pizza
        </button>
      </div>
    </div>
  )
}
