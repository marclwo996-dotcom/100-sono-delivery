'use client'

import { useStore } from '@/lib/store'
import PedidoCard from './PedidoCard'

export default function PainelPedidos() {
  const { pedidos } = useStore()

  const pedidosAtivos = pedidos.filter(p => p.status !== 'entregue')
  const pedidosEntregues = pedidos.filter(p => p.status === 'entregue')

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Pedidos Ativos</h2>
        <p className="text-gray-600">{pedidosAtivos.length} pedidos em andamento</p>
      </div>

      {pedidosAtivos.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-2xl text-gray-400">Nenhum pedido no momento</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pedidosAtivos.map(pedido => (
            <PedidoCard key={pedido.id} pedido={pedido} />
          ))}
        </div>
      )}

      {pedidosEntregues.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-600">
            Pedidos Entregues ({pedidosEntregues.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60">
            {pedidosEntregues.slice(-6).map(pedido => (
              <PedidoCard key={pedido.id} pedido={pedido} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}