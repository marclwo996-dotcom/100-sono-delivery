export interface Produto {
  id: string
  nome: string
  preco: number
  categoria: 'pizzas' | 'lanches' | 'lanches-especiais' | 'porcoes' | 'combos' | 'bebidas' | 'adicionais'
  descricao?: string
  observacoes?: string
  temTamanhos?: boolean
}

export interface TamanhoPizza {
  id: 'P' | 'M' | 'G' | 'F'
  nome: string
  preco: number
}

export type TipoBorda = 'sem' | 'cheddar' | 'catupiry'

export interface ItemCarrinho {
  produto: Produto
  quantidade: number
  observacao?: string
  tamanhoPizza?: 'P' | 'M' | 'G' | 'F'
  saboresSelecionados?: string[]
  tipoBorda?: TipoBorda
  precoFinal?: number
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
