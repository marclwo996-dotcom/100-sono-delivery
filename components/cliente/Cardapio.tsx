'use client'

import { useState } from 'react'
import { produtos } from '@/lib/data'
import ItemCardapio from './ItemCardapio'
import PizzaPersonalizada from './PizzaPersonalizada'

const categorias = [
  { id: 'pizzas', nome: 'Pizzas' },
  { id: 'lanches', nome: 'Lanches' },
  { id: 'lanches-especiais', nome: 'Lanches Especiais' },
  { id: 'porcoes', nome: 'Porções' },
  { id: 'combos', nome: 'Combos' }
]

export default function Cardapio() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('pizzas')
  const [mostrarPizzaPersonalizada, setMostrarPizzaPersonalizada] = useState(false)

  const produtosFiltrados = produtos.filter(p => p.categoria === categoriaAtiva)

  // Se está montando pizza personalizada, mostrar modal
  if (mostrarPizzaPersonalizada) {
    return (
      <PizzaPersonalizada 
        onFechar={() => setMostrarPizzaPersonalizada(false)} 
      />
    )
  }

  return (
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
        {/* Card especial de Pizza - aparece apenas na categoria Pizzas */}
        {categoriaAtiva === 'pizzas' && (
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col hover:shadow-lg transition-shadow border-2 border-primary">
            <div className="flex-1">
              <h3 className="font-bold text-2xl mb-2">🍕 Pizza</h3>
              <p className="text-sm text-gray-600 mb-3">
                Monte a sua pizza com até 4 sabores!
              </p>
              
              <div className="space-y-1 text-sm text-gray-700 mb-3">
                <div className="flex justify-between">
                  <span>Pequena (1 sabor):</span>
                  <span className="font-bold">R$ 34,00</span>
                </div>
                <div className="flex justify-between">
                  <span>Média (2 sabores):</span>
                  <span className="font-bold">R$ 44,00</span>
                </div>
                <div className="flex justify-between">
                  <span>Grande (3 sabores):</span>
                  <span className="font-bold">R$ 52,00</span>
                </div>
                <div className="flex justify-between">
                  <span>Família (4 sabores):</span>
                  <span className="font-bold">R$ 62,00</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setMostrarPizzaPersonalizada(true)}
              className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Montar Pizza
            </button>
          </div>
        )}

        {/* Outros produtos (lanches, porções, combos) */}
        {categoriaAtiva !== 'pizzas' && produtosFiltrados.map(produto => (
          <ItemCardapio key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  )
}
