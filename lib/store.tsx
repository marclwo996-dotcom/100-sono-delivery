'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { ItemCarrinho, Pedido, Produto, StatusPedido } from './types'
import { gerarId } from './utils'
import { supabase, supabaseConfigurado } from './supabase'

interface StoreContextType {
  carrinho: ItemCarrinho[]
  pedidos: Pedido[]
  adicionarAoCarrinho: (produto: Produto) => void
  removerDoCarrinho: (produtoId: string) => void
  alterarQuantidade: (produtoId: string, quantidade: number) => void
  limparCarrinho: () => void
  criarPedido: (dados: Omit<Pedido, 'id' | 'numero' | 'status' | 'criadoEm'>) => Promise<Pedido>
  avancarStatus: (pedidoId: string) => Promise<void>
  totalCarrinho: number
  online: boolean
}

type PedidoRow = {
  id: string
  numero: number
  cliente: Pedido['cliente']
  itens: Pedido['itens']
  subtotal: number
  taxa_entrega: number
  total: number
  pagamento: Pedido['pagamento']
  troco: number | null
  status: StatusPedido
  criado_em: string
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)
const CANAL_PEDIDOS = 'canal-pedidos-100-sono'

function rowParaPedido(row: PedidoRow): Pedido {
  return {
    id: row.id,
    numero: row.numero,
    cliente: row.cliente,
    itens: row.itens,
    subtotal: Number(row.subtotal),
    taxaEntrega: Number(row.taxa_entrega),
    total: Number(row.total),
    pagamento: row.pagamento,
    troco: row.troco ? Number(row.troco) : undefined,
    status: row.status,
    criadoEm: row.criado_em
  }
}

function pedidoParaRow(pedido: Pedido) {
  return {
    id: pedido.id,
    numero: pedido.numero,
    cliente: pedido.cliente,
    itens: pedido.itens,
    subtotal: pedido.subtotal,
    taxa_entrega: pedido.taxaEntrega,
    total: pedido.total,
    pagamento: pedido.pagamento,
    troco: pedido.troco ?? null,
    status: pedido.status,
    criado_em: pedido.criadoEm
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([])
  const [pedidos, setPedidos] = useState<Pedido[]>([])

  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem('carrinho')
    if (carrinhoSalvo) setCarrinho(JSON.parse(carrinhoSalvo))
  }, [])

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho))
  }, [carrinho])

  useEffect(() => {
    if (!supabase) {
      const pedidosSalvos = localStorage.getItem('pedidos')
      if (pedidosSalvos) setPedidos(JSON.parse(pedidosSalvos))
      return
    }
    const client = supabase

    client
      .from('pedidos')
      .select('*')
      .order('criado_em', { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.error(error)
          return
        }
        setPedidos((data ?? []).map(row => rowParaPedido(row as PedidoRow)))
      })

    const canal = client
      .channel('pedidos-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'pedidos' },
        payload => {
          if (payload.eventType === 'INSERT') {
            const pedido = rowParaPedido(payload.new as PedidoRow)
            setPedidos(prev => {
              if (prev.some(item => item.id === pedido.id)) return prev
              tocarAlerta()
              return [...prev, pedido]
            })
          }

          if (payload.eventType === 'UPDATE') {
            const pedido = rowParaPedido(payload.new as PedidoRow)
            setPedidos(prev => prev.map(item => item.id === pedido.id ? pedido : item))
          }

          if (payload.eventType === 'DELETE') {
            setPedidos(prev => prev.filter(item => item.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      client.removeChannel(canal)
    }
  }, [])

  useEffect(() => {
    if (supabaseConfigurado) return
    localStorage.setItem('pedidos', JSON.stringify(pedidos))
  }, [pedidos])

  useEffect(() => {
    if (supabaseConfigurado || typeof window === 'undefined') return

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
  }, [])

  function tocarAlerta() {
    const audio = new Audio('/alerta.mp3')
    audio.play().catch(() => {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      const contexto = new AudioContextClass()
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

  function adicionarAoCarrinho(produto: Produto) {
    setCarrinho(prev => {
      const existe = prev.find(item => item.produto.id === produto.id)
      if (existe) {
        return prev.map(item =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      }
      return [...prev, { produto, quantidade: 1 }]
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

  async function criarPedido(dados: Omit<Pedido, 'id' | 'numero' | 'status' | 'criadoEm'>) {
    const novoPedido: Pedido = {
      ...dados,
      id: gerarId(),
      numero: pedidos.length + 1,
      status: 'pendente',
      criadoEm: new Date().toISOString()
    }

    setPedidos(prev => [...prev, novoPedido])
    limparCarrinho()

    if (supabase) {
      const { error } = await supabase.from('pedidos').insert(pedidoParaRow(novoPedido))
      if (error) {
        console.error(error)
        alert('Nao foi possivel enviar o pedido. Confira a conexao com o banco.')
      }
      return novoPedido
    }

    const canal = new BroadcastChannel(CANAL_PEDIDOS)
    canal.postMessage({ type: 'NOVO_PEDIDO', pedido: novoPedido })
    canal.close()
    return novoPedido
  }

  async function avancarStatus(pedidoId: string) {
    const pedido = pedidos.find(p => p.id === pedidoId)
    if (!pedido) return

    const proximoStatus: Record<StatusPedido, StatusPedido | null> = {
      pendente: 'em_preparo',
      em_preparo: 'saiu_entrega',
      saiu_entrega: 'entregue',
      entregue: null
    }

    const novoStatus = proximoStatus[pedido.status]
    if (!novoStatus) return

    setPedidos(prev =>
      prev.map(p => p.id === pedidoId ? { ...p, status: novoStatus } : p)
    )

    if (supabase) {
      const { error } = await supabase
        .from('pedidos')
        .update({ status: novoStatus })
        .eq('id', pedidoId)

      if (error) {
        console.error(error)
        alert('Nao foi possivel atualizar o status.')
      }
      return
    }

    const canal = new BroadcastChannel(CANAL_PEDIDOS)
    canal.postMessage({ type: 'ATUALIZAR_STATUS', pedidoId, status: novoStatus })
    canal.close()
  }

  const totalCarrinho = carrinho.reduce(
    (acc, item) => acc + item.produto.preco * item.quantidade,
    0
  )

  return (
    <StoreContext.Provider
      value={{
        carrinho,
        pedidos,
        adicionarAoCarrinho,
        removerDoCarrinho,
        alterarQuantidade,
        limparCarrinho,
        criarPedido,
        avancarStatus,
        totalCarrinho,
        online: supabaseConfigurado
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
