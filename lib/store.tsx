'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { ItemCarrinho, Pedido, Produto, StatusPedido } from './types'
import { gerarId } from './utils'

interface StoreContextType {
  carrinho: ItemCarrinho[]
  pedidos: Pedido[]
  online: boolean
  adicionarAoCarrinho: (
    produto: Produto, 
    observacao?: string, 
    tamanhoPizza?: 'P' | 'M' | 'G' | 'F', 
    temBorda?: boolean,
    saboresSelecionados?: string[]
  ) => void
  removerDoCarrinho: (produtoId: string) => void
  alterarQuantidade: (produtoId: string, quantidade: number) => void
  limparCarrinho: () => void
  criarPedido: (dados: Omit<Pedido, 'id' | 'numero' | 'status' | 'criadoEm'>) => void
  avancarStatus: (pedidoId: string) => void
  totalCarrinho: number
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

const CANAL_PEDIDOS = 'canal-pedidos-100-sono'

export function StoreProvider({ children }: { children: ReactNode }) {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([])
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [online] = useState(true)

  // Carregar dados do localStorage ao iniciar
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem('carrinho')
    const pedidosSalvos = localStorage.getItem('pedidos')
    
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo))
    }
    
    if (pedidosSalvos) {
      setPedidos(JSON.parse(pedidosSalvos))
    }
  }, [])

  // Salvar carrinho no localStorage
  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho))
  }, [carrinho])

  // Salvar pedidos no localStorage
  useEffect(() => {
    localStorage.setItem('pedidos', JSON.stringify(pedidos))
  }, [pedidos])

  // Configurar BroadcastChannel para comunicação em tempo real
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const canal = new BroadcastChannel(CANAL_PEDIDOS)
      
      canal.onmessage = (event) => {
        if (event.data.type === 'NOVO_PEDIDO') {
          setPedidos(prev => {
            const existe = prev.find(p => p.id === event.data.pedido.id)
            if (existe) return prev
            tocarAlerta()
            return [...prev, event.data.pedido]
          })
        } else if (event.data.type === 'ATUALIZAR_STATUS') {
          setPedidos(prev => 
            prev.map(p => 
              p.id === event.data.pedidoId 
                ? { ...p, status: event.data.status }
                : p
            )
          )
        }
      }

      return () => canal.close()
    }
  }, [])

  function tocarAlerta() {
    const audio = new Audio('/alerta.mp3')
    audio.play().catch(() => {
      // Fallback: beep simples
      const contexto = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscilador = contexto.createOscillator()
      const ganho = contexto.createGain()
      oscilador.connect(ganho)
      ganho.connect(contexto.destination)
      oscilador.frequency.value = 800
      ganho.gain.setValueAtTime(0.3, contexto.currentTime)
      oscilador.start()
      oscilador.stop(contexto.currentTime + 0.5)
    })
  }

  function adicionarAoCarrinho(
    produto: Produto, 
    observacao?: string, 
    tamanhoPizza?: 'P' | 'M' | 'G' | 'F',
    temBorda?: boolean,
    saboresSelecionados?: string[]
  ) {
    setCarrinho(prev => {
      const existe = prev.find(item => {
        if (item.produto.id !== produto.id) return false
        if (tamanhoPizza) {
          // Comparar sabores (ordem não importa)
          const saboresIguais = 
            item.tamanhoPizza === tamanhoPizza &&
            item.temBorda === temBorda &&
            JSON.stringify(item.saboresSelecionados?.sort()) === 
            JSON.stringify(saboresSelecionados?.sort())
          return saboresIguais
        }
        return true
      })
      
      if (existe) {
        return prev.map(item => {
          if (tamanhoPizza) {
            const saboresIguais = 
              item.tamanhoPizza === tamanhoPizza &&
              item.temBorda === temBorda &&
              JSON.stringify(item.saboresSelecionados?.sort()) === 
              JSON.stringify(saboresSelecionados?.sort())
            
            if (saboresIguais) {
              return { ...item, quantidade: item.quantidade + 1 }
            }
          } else if (item.produto.id === produto.id) {
            return { ...item, quantidade: item.quantidade + 1 }
          }
          return item
        })
      }
      
      return [...prev, { 
        produto, 
        quantidade: 1,
        observacao,
        tamanhoPizza,
        temBorda,
        saboresSelecionados,
        precoFinal: produto.preco
      }]
    })
  }

  function removerDoCarrinho(produtoId: string) {
    setCarrinho(prev => prev.filter(item => item.produto.id !== produtoId))
  }

  function alterarQuantidade(produtoId: string, quantidade: number) {
    if (quantidade <= 0) {
      removerDoCarrinho(produtoId)
      return
    }
    setCarrinho(prev =>
      prev.map(item =>
        item.produto.id === produtoId ? { ...item, quantidade } : item
      )
    )
  }

  function limparCarrinho() {
    setCarrinho([])
  }

  function criarPedido(dados: Omit<Pedido, 'id' | 'numero' | 'status' | 'criadoEm'>) {
    const novoPedido: Pedido = {
      ...dados,
      id: gerarId(),
      numero: pedidos.length + 1,
      status: 'pendente',
      criadoEm: new Date().toISOString()
    }

    setPedidos(prev => [...prev, novoPedido])
    limparCarrinho()

    // Notificar outros contextos (cozinha)
    if (typeof window !== 'undefined') {
      const canal = new BroadcastChannel(CANAL_PEDIDOS)
      canal.postMessage({ type: 'NOVO_PEDIDO', pedido: novoPedido })
      canal.close()
    }
  }

  function avancarStatus(pedidoId: string) {
    setPedidos(prev => {
      const pedido = prev.find(p => p.id === pedidoId)
      if (!pedido) return prev

      const proximoStatus: Record<StatusPedido, StatusPedido | null> = {
        pendente: 'em_preparo',
        em_preparo: 'saiu_entrega',
        saiu_entrega: 'entregue',
        entregue: null
      }

      const novoStatus = proximoStatus[pedido.status]
      if (!novoStatus) return prev

      const atualizados = prev.map(p =>
        p.id === pedidoId ? { ...p, status: novoStatus } : p
      )

      // Notificar outros contextos
      if (typeof window !== 'undefined') {
        const canal = new BroadcastChannel(CANAL_PEDIDOS)
        canal.postMessage({ type: 'ATUALIZAR_STATUS', pedidoId, status: novoStatus })
        canal.close()
      }

      return atualizados
    })
  }

  const totalCarrinho = carrinho.reduce(
    (acc, item) => acc + (item.produto.preco * item.quantidade),
    0
  )

  return (
    <StoreContext.Provider
      value={{
        carrinho,
        pedidos,
        online,
        adicionarAoCarrinho,
        removerDoCarrinho,
        alterarQuantidade,
        limparCarrinho,
        criarPedido,
        avancarStatus,
        totalCarrinho
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore deve ser usado dentro de StoreProvider')
  }
  return context
}
