'use client'

import { useState } from 'react'
import { ShoppingCart, X, Plus, Minus } from 'lucide-react'
import { useStore } from '@/lib/store'
import { formatarPreco } from '@/lib/utils'
import { TAXA_ENTREGA } from '@/lib/data'
import Checkout from './Checkout'

export default function Carrinho() {
  const { carrinho, alterarQuantidade, removerDoCarrinho, totalCarrinho } = useStore()
  const [aberto, setAberto] = useState(false)
  const [checkoutAberto, setCheckoutAberto] = useState(false)

  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0)
  const totalFinal = totalCarrinho + (carrinho.length > 0 ? TAXA_ENTREGA : 0)

  if (checkoutAberto) {
    return (
      <Checkout
        onVoltar={() => setCheckoutAberto(false)}
        onSucesso={() => {
          setCheckoutAberto(false)
          setAberto(false)
        }}
      />
    )
  }

  return (
    <>
      {totalItens > 0 && (
        <button
          onClick={() => setAberto(true)}
          className="fixed bottom-4 left-4 right-4 bg-primary hover:bg-orange-600 text-white font-bold py-4 rounded-lg shadow-lg z-20 flex items-center justify-between px-6 transition-colors"
        >
          <div className="flex items-center gap-3">
            <ShoppingCart size={24} />
            <span>{totalItens} {totalItens === 1 ? 'item' : 'itens'}</span>
          </div>
          <span className="text-lg">{formatarPreco(totalFinal)}</span>
        </button>
      )}

      {aberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-end md:items-center justify-center">
          <div className="bg-white w-full md:max-w-2xl md:rounded-lg rounded-t-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Seu Carrinho</h2>
              <button
                onClick={() => setAberto(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
n                <X size={24} />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {carrinho.map(item => (
                <div key={item.produto.id} className="flex items-center gap-4 border-b pb-4">
                  <div className="flex-1">
                    <h3 className="font-bold">{item.produto.nome}</h3>
                    <p className="text-gray-600">{formatarPreco(item.produto.preco)}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alterarQuantidade(item.produto.id, item.quantidade - 1)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-bold w-8 text-center">{item.quantidade}</span>
                    <button
                      onClick={() => alterarQuantidade(item.produto.id, item.quantidade + 1)}
                      className="bg-green-500 hover:bg-green-600 text-white rounded-full p-1.5"
                    >
n                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => removerDoCarrinho(item.produto.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatarPreco(totalCarrinho)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Taxa de entrega</span>
                  <span>{formatarPreco(TAXA_ENTREGA)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary">{formatarPreco(totalFinal)}</span>
                </div>
              </div>

              <button
                onClick={() => setCheckoutAberto(true)}
                className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition-colors"
              >
                Finalizar Pedido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}