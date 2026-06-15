'use client'

import { useState } from 'react'
import { ArrowLeft, MessageCircle, Copy, CheckCircle, DollarSign } from 'lucide-react'
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
  const [pixCopiado, setPixCopiado] = useState(false)

  const taxaEntrega = TAXA_ENTREGA
  const total = totalCarrinho + taxaEntrega

  // Chave PIX da loja (configure aqui)
  const CHAVE_PIX = 'marclwo996@gmail.com' // Substitua pela chave PIX real da loja

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

    if (pagamento === 'pix') {
      alert('Por favor, realize o pagamento via PIX e aguarde a confirmação do atendente.')
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

  function copiarChavePix() {
    navigator.clipboard.writeText(CHAVE_PIX)
    setPixCopiado(true)
    setTimeout(() => setPixCopiado(false), 3000)
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

  // Sugestões de troco
  const sugestoesTroco = [50, 100, 200].filter(valor => valor > total)

  return (
    <div className="fixed inset-0 bg-white z-40 overflow-y-auto">
      <div className="sticky top-0 bg-white border-b p-4 flex items-center gap-4">
        <button onClick={onVoltar} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold">Finalizar Pedido</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6 max-w-2xl mx-auto">
        <div>
          <h3 className="font-bold text-lg mb-3">Seus Dados</h3>
          <input
            type="text"
            placeholder="Nome completo *"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Endereço de Entrega</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Rua *"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Número *"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <input
                type="text"
                placeholder="Bairro *"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <input
              type="text"
              placeholder="Referência (opcional)"
              value={referencia}
              onChange={(e) => setReferencia(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Forma de Pagamento</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                value="pix"
                checked={pagamento === 'pix'}
                onChange={(e) => setPagamento(e.target.value as any)}
                className="w-5 h-5"
              />
              <span className="font-medium">PIX</span>
            </label>
            <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                value="cartao"
                checked={pagamento === 'cartao'}
                onChange={(e) => setPagamento(e.target.value as any)}
                className="w-5 h-5"
              />
              <span className="font-medium">Cartão na entrega</span>
            </label>
            <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
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

          {/* PIX - Mostrar chave após seleção */}
          {pagamento === 'pix' && (
            <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="text-blue-600" size={20} />
                <h4 className="font-bold text-blue-900">Dados para Pagamento PIX</h4>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Chave PIX (Email):</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-white px-3 py-2 rounded border font-mono text-sm">
                      {CHAVE_PIX}
                    </code>
                    <button
                      type="button"
                      onClick={copiarChavePix}
                      className={`px-4 py-2 rounded font-medium transition-colors ${
                        pixCopiado 
                          ? 'bg-green-500 text-white' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {pixCopiado ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle size={16} />
                          Copiado!
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Copy size={16} />
                          Copiar
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-600 mb-1">Valor a pagar:</p>
                  <p className="text-2xl font-bold text-blue-600">{formatarPreco(total)}</p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                  <p className="text-sm text-yellow-800">
                    <strong>Importante:</strong> Após realizar o pagamento, aguarde a confirmação do atendente via WhatsApp. 
                    Seu pedido será preparado assim que o pagamento for confirmado.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Dinheiro - Campo de troco melhorado */}
          {pagamento === 'dinheiro' && (
            <div className="mt-4 space-y-3">
              <input
                type="number"
                step="0.01"
                placeholder="Precisa de troco para quanto? *"
                value={troco}
                onChange={(e) => setTroco(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              
              {sugestoesTroco.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Sugestões:</p>
                  <div className="flex gap-2">
                    {sugestoesTroco.map(valor => (
                      <button
                        key={valor}
                        type="button"
                        onClick={() => setTroco(valor.toString())}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                      >
                        {formatarPreco(valor)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {troco && parseFloat(troco) >= total && (
                <div className="bg-green-50 border border-green-200 rounded p-3">
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

        <div className="space-y-3">
          <button
            type="submit"
            className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition-colors"
          >
            Confirmar Pedido
          </button>
          
          <button
            type="button"
            onClick={finalizarWhatsApp}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle size={20} />
            Finalizar via WhatsApp
          </button>
        </div>
      </form>
    </div>
  )
}
