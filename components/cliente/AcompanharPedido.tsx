'use client'

import { useEffect, useMemo, useRef } from 'react'
import { CheckCircle, ChefHat, Clock, Truck } from 'lucide-react'
import { useStore } from '@/lib/store'
import { StatusPedido } from '@/lib/types'

interface AcompanharPedidoProps {
  pedidoId: string
}

const etapas: Array<{ status: StatusPedido; label: string; Icone: any }> = [
  { status: 'pendente', label: 'Recebido', Icone: Clock },
  { status: 'em_preparo', label: 'Preparando', Icone: ChefHat },
  { status: 'saiu_entrega', label: 'Saiu para entrega', Icone: Truck },
  { status: 'entregue', label: 'Entregue', Icone: CheckCircle }
]

const ordemStatus: Record<StatusPedido, number> = {
  pendente: 0,
  em_preparo: 1,
  saiu_entrega: 2,
  entregue: 3
}

export default function AcompanharPedido({ pedidoId }: AcompanharPedidoProps) {
  const { pedidos, online } = useStore()
  const ultimoStatus = useRef<StatusPedido | null>(null)
  const pedido = useMemo(() => pedidos.find(item => item.id === pedidoId), [pedidos, pedidoId])

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  useEffect(() => {
    if (!pedido) return
    if (ultimoStatus.current && ultimoStatus.current !== pedido.status && 'Notification' in window && Notification.permission === 'granted') {
      new Notification('Seu pedido foi atualizado', {
        body: `Novo status: ${etapas[ordemStatus[pedido.status]].label}`
      })
    }
    ultimoStatus.current = pedido.status
  }, [pedido])

  if (!pedido) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white border rounded-lg p-6 text-center shadow">
          <h1 className="text-2xl font-bold mb-2">Pedido nao encontrado</h1>
          <p className="text-gray-600">
            {online
              ? 'Confira se o link esta correto ou aguarde alguns segundos.'
              : 'Sem Supabase configurado, o acompanhamento so funciona no mesmo navegador que criou o pedido.'}
          </p>
        </div>
      </main>
    )
  }

  const indiceAtual = ordemStatus[pedido.status]

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-primary text-white p-6 shadow-lg">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm opacity-90">100 Sono Delivery</p>
          <h1 className="text-3xl font-bold">Pedido #{pedido.numero}</h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto p-4 space-y-6">
        <section className="bg-white border rounded-lg p-5 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Acompanhe seu pedido</h2>
          <div className="space-y-4">
            {etapas.map(({ status, label, Icone }, index) => {
              const ativo = index <= indiceAtual
              const atual = index === indiceAtual

              return (
                <div key={status} className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center ${ativo ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                    <Icone size={22} />
                  </div>
                  <div>
                    <p className={`font-bold ${ativo ? 'text-gray-900' : 'text-gray-400'}`}>{label}</p>
                    {atual && <p className="text-sm text-primary">Status atual</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="bg-white border rounded-lg p-5 shadow-sm">
          <h2 className="text-xl font-bold mb-3">Resumo</h2>
          <div className="space-y-2">
            {pedido.itens.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{item.quantidade}x {item.produto.nome}</span>
                <span>R$ {(item.produto.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-lg font-bold border-t mt-4 pt-4">
            <span>Total</span>
            <span>R$ {pedido.total.toFixed(2).replace('.', ',')}</span>
          </div>
        </section>
      </div>
    </main>
  )
}
