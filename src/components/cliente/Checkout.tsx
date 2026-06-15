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
      .map(item => `• ${item.quantidade}x ${item.produto.nome} - ${formatarPreco(item.produto.preco * item.quantidade)}`)
      .join('\n')

    const mensagem = `*Novo Pedido - 100 Sono Delivery*\n\n` +
      `*Cliente:* ${nome}\n` +
      `*Endereço:* ${rua}, ${numero} - ${bairro}\n` +
      (referencia ? `*Referência:* ${referencia}\n` : '') +
      `\n*Itens:*\n${itensTexto}\n\n` +
      `*Subtotal:* ${formatarPreco(totalCarrinho)}\n` +
      `*Taxa de entrega:* ${formatarPreco(taxaEntrega)}\n` +
      `*Total:* ${formatarPreco(total)}\n\n` +
      `*Pagamento:* ${pagamento.toUpperCase()}` +
      (pagamento === 'dinheiro' && troco ? `\nTroco para: ${formatarPreco(parseFloat(troco))}` : '')

    const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`
    window.open(url, '_blank')
  }

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

        ... (file continues)