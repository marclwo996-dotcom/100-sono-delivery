'use client'

import { useState } from 'react'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { useStore } from '@/lib/store'
import { TAXA_ENTREGA } from '@/lib/data'
import { formatarPreco } from '@/lib/utils'

interface CheckoutProps {
  onVoltar: () => void
  onSucesso: () => void
}

export default function Checkout({ onVoltar, onSucesso }: CheckoutProps) {
  const { carrinho, totalCarrinho, criarPedido } = useStore()
  const [nome, setNome] = useState('')
  const [rua, setRua] = useState('')
  const [numero, setNumero] = useState('')
  const [bairro, setBairro] = useState('')
  const [referencia, setReferencia] = useState('')
  const [pagamento, setPagamento] = useState<'pix' | 'cartao' | 'dinheiro'>('pix')
  const [troco, setTroco] = useState('')

  const taxaEntrega = TAXA_ENTREGA
  const total = totalCarrinho + taxaEntrega

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!nome || !rua || !numero || !bairro) {
      alert('Por favor, preencha todos os campos obrigatórios')
      return
    }

    if (pagamento === 'dinheiro' && !troco) {
      alert('Informe para quanto precisa de troco')
      return
    }

    criarPedido({
      cliente: {
        nome,
        rua,
        numero,
        bairro,
        referencia: referencia || undefined
      },
      itens: carrinho,
      subtotal: totalCarrinho,
      taxaEntrega,
      total,
      pagamento,
      troco: pagamento === 'dinheiro' ? parseFloat(troco) : undefined
    })

    onSucesso()
    alert('Pedido realizado com sucesso!')
  }

  function finalizarWhatsApp() {
    const itensTexto = carrinho
      .map(item => `• ${item.quantidade}x ${item.produto.nome}${item.observacao ? ` (${item.observacao})` : ''} - ${formatarPreco(item.produto.preco * item.quantidade)}`)
      .join('\n')

    const mensagem = `*Novo Pedido - 100 Sono Delivery*\n\n` +
      `*Cliente:* ${nome}\n` +
      `*Endereço:* ${rua}, ${numero} - ${bairro}\n` +
      (referencia ? `*Referência:* ${referencia}\n` : '') +
      `\n*Itens:*\n${itensTexto}\n\n` +
      `*Subtotal:* ${formatarPreco(totalCarrinho)}\n` +
      `*Taxa de entrega:* ${formatarPreco(taxaEntrega)}\n` +
      `*Total:* ${formatarPreco(total)}\n\n` +
      `*Pagamento:* ${pagamento === 'pix' ? 'PIX' : pagamento === 'cartao' ? 'Cartão na entrega' : 'Dinheiro'}` +
      (pagamento === 'dinheiro' && troco ? `\n*Precisa de troco para:* ${formatarPreco(parseFloat(troco))}` : '')

    const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`
    window.open(url, '_blank')
  }

  const sugestoesTroco = [50, 100, 200].filter(valor => valor > total)

  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-white">
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b bg-white p-3 shadow-sm sm:gap-4 sm:p-4">
        <button onClick={onVoltar} className="rounded-full p-2 hover:bg-gray-100" aria-label="Voltar para o carrinho">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-black sm:text-2xl">Finalizar Pedido</h2>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6 p-4 pb-36">
        <div>
          <h3 className="mb-3 text-lg font-black">Seus Dados</h3>
          <input
            type="text"
            autoComplete="name"
            placeholder="Nome completo *"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="h-12 w-full rounded-md border border-gray-300 p-3 text-base focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <h3 className="mb-3 text-lg font-black">Endereço de Entrega</h3>
          <div className="space-y-3">
            <input
              type="text"
              autoComplete="street-address"
              placeholder="Rua *"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
              className="h-12 w-full rounded-md border border-gray-300 p-3 text-base focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                type="text"
                inputMode="numeric"
                placeholder="Número *"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                className="h-12 rounded-md border border-gray-300 p-3 text-base focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <input
                type="text"
                placeholder="Bairro *"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                className="h-12 rounded-md border border-gray-300 p-3 text-base focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <input
              type="text"
              placeholder="Referência (opcional)"
              value={referencia}
              onChange={(e) => setReferencia(e.target.value)}
              className="h-12 w-full rounded-md border border-gray-300 p-3 text-base focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-black">Forma de Pagamento</h3>
          <div className="space-y-2">
            <label className="flex cursor-pointer items-center gap-3 rounded-md border p-3 hover:bg-gray-50">
              <input
                type="radio"
                value="pix"
                checked={pagamento === 'pix'}
                onChange={(e) => setPagamento(e.target.value as any)}
                className="w-5 h-5"
              />
              <span className="font-medium">PIX</span>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-md border p-3 hover:bg-gray-50">
              <input
                type="radio"
                value="cartao"
                checked={pagamento === 'cartao'}
                onChange={(e) => setPagamento(e.target.value as any)}
                className="w-5 h-5"
              />
              <span className="font-medium">Cartão na entrega</span>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-md border p-3 hover:bg-gray-50">
              <input
                type="radio"
                value="dinheiro"
                checked={pagamento === 'dinheiro'}
                onChange={(e) => setPagamento(e.target.value as any)}
                className="w-5 h-5"
              />
              <span className="font-medium">Dinheiro</span>
            </label>
          </div>

          {pagamento === 'dinheiro' && (
            <div className="mt-4 space-y-3">
              <input
                type="number"
                inputMode="decimal"
                step="0.01"
                placeholder="Precisa de troco para quanto? *"
                value={troco}
                onChange={(e) => setTroco(e.target.value)}
                className="h-12 w-full rounded-md border border-gray-300 p-3 text-base focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              
              {sugestoesTroco.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Sugestões:</p>
                  <div className="flex flex-wrap gap-2">
                    {sugestoesTroco.map(valor => (
                      <button
                        key={valor}
                        type="button"
                        onClick={() => setTroco(valor.toString())}
                        className="rounded-md bg-gray-100 px-4 py-2 font-medium transition-colors hover:bg-gray-200"
                      >
                        {formatarPreco(valor)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {troco && parseFloat(troco) >= total && (
                <div className="rounded-md border border-green-200 bg-green-50 p-3">
                  <p className="text-sm text-green-800">
                    <strong>Troco:</strong> {formatarPreco(parseFloat(troco) - total)}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>{formatarPreco(totalCarrinho)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Taxa de entrega</span>
            <span>{formatarPreco(taxaEntrega)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold pt-2 border-t">
            <span>Total</span>
            <span className="text-primary">{formatarPreco(total)}</span>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-20 space-y-2 border-t bg-white p-4 shadow-[0_-10px_25px_rgba(0,0,0,0.08)] sm:static sm:border-0 sm:p-0 sm:shadow-none">
          <div className="flex justify-between text-lg font-black sm:hidden">
            <span>Total</span>
            <span className="text-primary">{formatarPreco(total)}</span>
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-primary py-3.5 font-black text-white transition-colors hover:bg-[#b9141a]"
          >
            Confirmar Pedido
          </button>
          
          <button
            type="button"
            onClick={finalizarWhatsApp}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-green-600 py-3.5 font-black text-white transition-colors hover:bg-green-700"
          >
            <MessageCircle size={20} />
            Finalizar via WhatsApp
          </button>
        </div>
      </form>
    </div>
  )
}
