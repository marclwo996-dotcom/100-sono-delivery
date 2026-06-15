'use client'

import { useState } from 'react'
import { produtos } from '@/lib/data'
import ItemCardapio from './ItemCardapio'

const categorias = [
  { id: 'lanches', nome: 'Lanches' },
  { id: 'bebidas', nome: 'Bebidas' },
  { id: 'adicionais', nome: 'Adicionais' }
]

export default function Cardapio() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('lanches')

n  const produtosFiltrados = produtos.filter(p => p.categoria === categoriaAtiva)

n  return (
    <div className="pb-24">
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="flex overflow-x-auto">
          {categorias.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoriaAtiva(cat.id)}
              className={`flex-1 min-w-max px-6 py-4 font-bold transition-colors ${
                categoriaAtiva === cat.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {cat.nome}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {produtosFiltrados.map(produto => (
          <ItemCardapio key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  )
}