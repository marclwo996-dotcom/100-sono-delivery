import { Produto } from './types'

export const produtos: Produto[] = [
  // Lanches
  {
    id: 'x-burger',
    nome: 'X-Burger',
    preco: 22.00,
    categoria: 'lanches',
    descricao: 'Pão, hambúrguer, queijo, alface e tomate'
  },
  {
    id: 'x-salada',
    nome: 'X-Salada',
    preco: 24.00,
    categoria: 'lanches',
    descricao: 'Pão, hambúrguer, queijo, alface, tomate e cebola'
  },
  {
    id: 'x-bacon',
    nome: 'X-Bacon',
    preco: 28.00,
    categoria: 'lanches',
    descricao: 'Pão, hambúrguer, queijo, bacon crocante'
  },
  {
    id: 'x-egg',
    nome: 'X-Egg',
    preco: 26.00,
    categoria: 'lanches',
    descricao: 'Pão, hambúrguer, queijo, ovo'
  },
  
  // Bebidas
  {
    id: 'refri-lata',
    nome: 'Refrigerante Lata',
    preco: 6.00,
    categoria: 'bebidas'
  },
  {
    id: 'suco-natural',
    nome: 'Suco Natural',
    preco: 8.00,
    categoria: 'bebidas'
  },
  {
    id: 'agua',
    nome: 'Água Mineral',
    preco: 4.00,
    categoria: 'bebidas'
  },
  
  // Adicionais
  {
    id: 'batata-frita',
    nome: 'Batata Frita',
    preco: 15.00,
    categoria: 'adicionais'
  },
  {
    id: 'queijo-extra',
    nome: 'Queijo Extra',
    preco: 5.00,
    categoria: 'adicionais'
  },
  {
    id: 'bacon-extra',
    nome: 'Bacon Extra',
    preco: 6.00,
    categoria: 'adicionais'
  }
]

export const TAXA_ENTREGA = 5.00