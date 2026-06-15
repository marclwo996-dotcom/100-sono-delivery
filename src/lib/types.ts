export interface Produto {
  id: string
  nome: string
  preco: number
  categoria: 'lanches' | 'bebidas' | 'adicionais'
  descricao?: string
}

export interface ItemCarrinho {
  produto: Produto
  quantidade: number
  observacao?: string
}

export interface Pedido {
  id: string
  numero: number
  cliente: {
    nome: string
    rua: string
    numero: string
    bairro: string
    referencia?: string
  }
  itens: ItemCarrinho[]
  subtotal: number
  taxaEntrega: number
  total: number
  pagamento: 'pix' | 'cartao' | 'dinheiro'
  troco?: number
  status: 'pendente' | 'em_preparo' | 'saiu_entrega' | 'entregue'
  criadoEm: string
}

export type StatusPedido = Pedido['status']