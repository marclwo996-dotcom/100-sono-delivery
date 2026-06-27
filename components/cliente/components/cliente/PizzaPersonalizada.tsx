'use client'

import { useState } from 'react'
import { X, ChevronRight, Plus, Check, ArrowLeft } from 'lucide-react'
import { useStore } from '@/lib/store'
import { formatarPreco } from '@/lib/utils'
import { TAMANHOS_PIZZA, PRECO_BORDA, produtos } from '@/lib/data'
import { TipoBorda } from '@/lib/types'

interface PizzaPersonalizadaProps {
  onFechar: () => void
}

type Etapa = 'tamanho' | 'sabores' | 'borda'

export default function PizzaPersonalizada({ onFechar }: PizzaPersonalizadaProps) {
  const { adicionarAoCarrinho } = useStore()
  const [etapa, setEtapa] = useState<Etapa>('tamanho')
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<'P' | 'M' | 'G' | 'F' | null>(null)
  const [saboresSelecionados, setSaboresSelecionados] = useState<string[]>([])
  const [tipoBorda, setTipoBorda] = useState<TipoBorda>('sem')

  const maxSabores = { 'P': 1, 'M': 2, 'G': 3, 'F': 4 }
  const pizzasDisponiveis = produtos.filter(p => p.categoria === 'pizzas')

  function handleSelecionarTamanho(tamanho: 'P' | 'M' | 'G' | 'F') {
    setTamanhoSelecionado(tamanho)
    setSaboresSelecionados([])
    setEtapa('sabores')
  }

  function handleSelecionarSabor(pizzaId: string) {
    if (!tamanhoSelecionado) return
    const max = maxSabores[tamanhoSelecionado]
    
    if (saboresSelecionados.includes(pizzaId)) {
      setSaboresSelecionados(prev => prev.filter(id => id !== pizzaId))
    } else if (saboresSelecionados.length < max) {
      setSaboresSelecionados(prev => [...prev, pizzaId])
    }
  }

  function handleFinalizar() {
    if (!tamanhoSelecionado) return

    const nomesSabores = saboresSelecionados.map(id => {
      const pizza = produtos.find(p => p.id === id)
      return pizza?.nome || ''
    }).filter(Boolean)

    const tamanhoNome = TAMANHOS_PIZZA.find(t => t.id === tamanhoSelecionado)?.nome || tamanhoSelecionado
    const bordaNome = tipoBorda === 'sem' ? 'Sem borda' : tipoBorda === 'cheddar' ? 'Borda de Cheddar' : 'Borda de Catupiry'

    let observacao = `Tamanho: ${tamanhoNome} • Sabor${nomesSabores.length > 1 ? 'es' : ''}: ${nomesSabores.join(' / ')} • ${bordaNome}`

    const precoBase = TAMANHOS_PIZZA.find(t => t.id === tamanhoSelecionado)?.preco || 0
    const precoBorda = PRECO_BORDA[tipoBorda]?.[tamanhoSelecionado] || 0
    const precoFinal = precoBase + precoBorda

    // Criar um "produto" virtual para a pizza personalizada
    const produtoPizza = {
      id: `pizza-personalizada-${tamanhoSelecionado}-${Date.now()}`,
      nome: `Pizza ${tamanhoNome}`,
      preco: precoFinal,
      categoria: 'pizzas' as const,
      temTamanhos: true
    }

    adicionarAoCarrinho(
      produtoPizza,
      observacao,
      tamanhoSelecionado,
      saboresSelecionados,
      tipoBorda
    )

    onFechar()
    alert('Pizza adicionada ao carrinho!')
  }

  const precoBase = tamanhoSelecionado ? TAMANHOS_PIZZA.find(t => t.id === tamanhoSelecionado)?.preco || 0 : 0
  const precoBorda = tamanhoSelecionado ? PRECO_BORDA[tipoBorda]?.[tamanhoSelecionado] || 0 : 0
  const precoFinal = precoBase + precoBorda

  // ============================================
  // ETAPA 1: SELEÇÃO DE TAMANHO
  // ============================================
  if (etapa === 'tamanho') {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-end md:items-center justify-center p-4">
        <div className="bg-white w-full md:max-w-2xl rounded-t-2xl md:rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">🍕 Monte sua Pizza</h2>
              <p className="text-gray-600 text-sm">Passo 1 de 3</p>
            </div>
            <button onClick={onFechar} className="text-gray-400 hover:text-gray-600">
              <X size={28} />
            </button>
          </div>

          <h3 className="font-bold text-lg mb-4">Escolha o tamanho:</h3>

          <div className="grid grid-cols-2 gap-3">
            {TAMANHOS_PIZZA.map(tamanho => {
              const max = maxSabores[tamanho.id]
              return (
                <button
                  key={tamanho.id}
                  type="button"
                  onClick={() => handleSelecionarTamanho(tamanho.id)}
                  className="p-5 rounded-xl border-2 border-gray-200 hover:border-primary hover:bg-orange-50 transition-all text-center"
                >
                  <div className="font-bold text-3xl text-primary">{tamanho.id}</div>
                  <div className="text-sm text-gray-600 mt-1">{tamanho.nome}</div>
                  <div className="text-xl font-bold mt-3">{formatarPreco(tamanho.preco)}</div>
                  <div className="text-xs text-gray-500 mt-2">
                    Até {max} sabor{max > 1 ? 'es' : ''}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // ============================================
  // ETAPA 2: SELEÇÃO DE SABORES
  // ============================================
  if (etapa === 'sabores') {
    if (!tamanhoSelecionado) return null
    const max = maxSabores[tamanhoSelecionado]
    const restantes = max - saboresSelecionados.length

    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-end md:items-center justify-center p-4">
        <div className="bg-white w-full md:max-w-2xl rounded-t-2xl md:rounded-2xl max-h-[90vh] flex flex-col">
          {/* Header fixo */}
          <div className="sticky top-0 bg-white p-4 border-b z-10">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-2xl font-bold">🍕 Monte sua Pizza</h2>
                <p className="text-gray-600 text-sm">Passo 2 de 3</p>
              </div>
              <button onClick={onFechar} className="text-gray-400 hover:text-gray-600">
                <X size={28} />
              </button>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="bg-primary text-white px-3 py-1 rounded font-bold">
                {tamanhoSelecionado} - {TAMANHOS_PIZZA.find(t => t.id === tamanhoSelecionado)?.nome}
              </span>
              <span className="text-gray-600">
                {saboresSelecionados.length}/{max} sabores
              </span>
            </div>

            {saboresSelecionados.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
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
            <h3 className="font-bold text-lg mb-3">Escolha os sabores:</h3>
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
          <div className="sticky bottom-0 bg-white p-4 border-t space-y-2">
            <button
              type="button"
              onClick={() => setEtapa('borda')}
              disabled={saboresSelecionados.length === 0}
              className="w-full bg-primary hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Continuar ({saboresSelecionados.length}/{max})
              <ChevronRight size={20} />
            </button>
            <button
              type="button"
              onClick={() => setEtapa('tamanho')}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              Voltar
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ============================================
  // ETAPA 3: SELEÇÃO DE BORDA
  // ============================================
  if (etapa === 'borda') {
    if (!tamanhoSelecionado) return null

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
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-end md:items-center justify-center p-4">
        <div className="bg-white w-full md:max-w-2xl rounded-t-2xl md:rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">🍕 Monte sua Pizza</h2>
              <p className="text-gray-600 text-sm">Passo 3 de 3</p>
            </div>
            <button onClick={onFechar} className="text-gray-400 hover:text-gray-600">
              <X size={28} />
            </button>
          </div>

          {/* Resumo da pizza */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-primary text-white px-3 py-1 rounded font-bold">
                {tamanhoSelecionado}
              </span>
              <span className="text-gray-600 text-sm">
                {TAMANHOS_PIZZA.find(t => t.id === tamanhoSelecionado)?.nome}
              </span>
            </div>
            <div className="text-sm font-semibold text-gray-800">
              Sabores: {nomesSabores.join(' / ')}
            </div>
          </div>

          <h3 className="font-bold text-lg mb-3">Deseja borda recheada?</h3>

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
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total:</span>
              <span className="text-3xl font-bold text-primary">{formatarPreco(precoFinal)}</span>
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
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              Voltar
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
