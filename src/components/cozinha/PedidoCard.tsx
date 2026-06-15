'use client'

import { CheckCircle, Clock, ChefHat, Truck } from 'lucide-react'
import { Pedido, StatusPedido } from '@/lib/types'
import { useStore } from '@/lib/store'
import { formatarPreco, formatarData } from '@/lib/utils'

interface PedidoCardProps {
  pedido: Pedido
}

const statusConfig: Record<StatusPedido, { label: string; cor: string; icone: any }> = {
  pendente: { label: 'Pendente', cor: 'bg-yellow-500', icone: Clock },
  em_preparo: { label: 'Em Preparo', cor: 'bg-blue-500', icone: ChefHat },
  saiu_entrega: { label: 'Saiu para Entrega', cor: 'bg-purple-500', icone: Truck },
  entregue: { label: 'Entregue', cor: 'bg-green-500', icone: CheckCircle }
}

export default function PedidoCard({ pedido }: PedidoCardProps) {
  const { avancarStatus } = useStore()
  const config = statusConfig[pedido.status]
  const Icone = config.icone

  const podeAvancar = pedido.status !== 'entregue'

  return (
    <div className="bg-white rounded-lg shadow-lg border-2 border-gray-200 overflow-hidden">
      <div className={`${config.cor} text-white p-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <Icone size={24} />
          <div>
            <h3 className="font-bold text-lg">Pedido #{pedido.numero}</h3>
            <p className="text-sm opacity-90">{config.label}</p>
          </div>
        </div>
        <div className="text-right text-sm">
          <p>{formatarData(pedido.criadoEm)}</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="border-b pb-3">
          <h4 className="font-bold text-gray-700 mb-2">Cliente</h4>
          <p className="text-lg font-semibold">{pedido.cliente.nome}</p>
          <p className="text-gray-600">
            {pedido.cliente.rua}, {pedido.cliente.numero}
          </p>
          <p className="text-gray-600">{pedido.cliente.bairro}</p>
          {pedido.cliente.referencia && (
            <p className="text-sm text-gray-500 mt-1">
              Ref: {pedido.cliente.referencia}
            </p>
          )}
        </div>

        <div className="border-b pb-3">
          <h4 className="font-bold text-gray-700 mb-2">Itens</h4>
          <div className="space-y-2">
            {pedido.itens.map((item, idx) => (
              <div key={idx} className="flex justify-between">
                <span className="font-medium">
                  {item.quantidade}x {item.produto.nome}
                </span>
                <span className="text-gray-600">
                  {formatarPreco(item.produto.preco * item.quantidade)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-b pb-3">
          <h4 className="font-bold text-gray-700 mb-2">Pagamento</h4>
          <p className="text-lg font-semibold uppercase">
            {pedido.pagamento === 'pix' ? 'PIX' : pedido.pagamento === 'cartao' ? 'Cartão' : 'Dinheiro'}
          </p>
          {pedido.pagamento === 'dinheiro' && pedido.troco && (
            <p className="text-sm text-gray-600">
              Troco para: {formatarPreco(pedido.troco)}
            </p>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Subtotal</span>
            <span>{formatarPreco(pedido.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Taxa de entrega</span>
            <span>{formatarPreco(pedido.taxaEntrega)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold border-t pt-2">
            <span>Total</span>
            <span className="text-primary">{formatarPreco(pedido.total)}</span>
          </div>
        </div>

        {podeAvancar && (
          <button
            onClick={() => avancarStatus(pedido.id)}
            className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Avançar Status
          </button>
        )}
      </div>
    </div>
  )
}