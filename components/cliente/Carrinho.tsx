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
          className="fixed bottom-4 left-4 right-4 z-20 flex items-center justify-between rounded-md bg-[#d71920] px-5 py-4 font-black text-white shadow-2xl transition-colors hover:bg-[#b9141a] md:left-1/2 md:max-w-2xl md:-translate-x-1/2"
        >
          <div className="flex items-center gap-3">
            <ShoppingCart size={24} />
            <span>{totalItens} {totalItens === 1 ? 'item' : 'itens'}</span>
          </div>
          <span className="text-lg">{formatarPreco(totalFinal)}</span>
        </button>
      )}

      {aberto && (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/55 md:items-center">
          <div className="max-h-[90vh] w-full overflow-y-auto rounded-t-md bg-white md:max-w-2xl md:rounded-md">
            <div className="sticky top-0 flex items-center justify-between border-b bg-white p-4">
              <h2 className="text-2xl font-black">Seu Carrinho</h2>
              <button
                onClick={() => setAberto(false)}
                className="rounded-full p-2 hover:bg-gray-100"
                aria-label="Fechar carrinho"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {carrinho.map(item => (
                <div key={item.produto.id} className="flex items-center gap-4 border-b pb-4">
                  <div className="flex-1">
                    <h3 className="font-black">{item.produto.nome}</h3>
                    {item.observacao && <p className="mt-1 text-xs font-medium text-[#6b6257]">{item.observacao}</p>}
                    <p className="mt-1 text-[#6b6257]">{formatarPreco(item.produto.preco)}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alterarQuantidade(item.produto.id, item.quantidade - 1)}
                      className="rounded-full bg-[#d71920] p-1.5 text-white hover:bg-[#b9141a]"
                      aria-label={`Remover ${item.produto.nome}`}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-bold w-8 text-center">{item.quantidade}</span>
                    <button
                      onClick={() => alterarQuantidade(item.produto.id, item.quantidade + 1)}
                      className="rounded-full bg-[#198754] p-1.5 text-white hover:bg-[#146c43]"
                      aria-label={`Adicionar ${item.produto.nome}`}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => removerDoCarrinho(item.produto.id)}
                    className="text-[#d71920] hover:text-[#b9141a]"
                    aria-label={`Excluir ${item.produto.nome}`}
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
                  <span className="text-[#d71920]">{formatarPreco(totalFinal)}</span>
                </div>
              </div>

              <button
                onClick={() => setCheckoutAberto(true)}
                className="w-full rounded-md bg-[#d71920] py-4 font-black text-white transition-colors hover:bg-[#b9141a]"
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
