'use client'

import { useState } from 'react'
import { produtos } from '@/lib/data'
import ItemCardapio from './ItemCardapio'
import PizzaPersonalizada from './components/cliente/PizzaPersonalizada'
import { Flame, Pizza } from 'lucide-react'

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
    <div className="pb-28">
      <div className="sticky top-[65px] z-20 border-b border-black/10 bg-[#fff8e7]/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 md:px-6">
          {categorias.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoriaAtiva(cat.id)}
              className={`min-w-max rounded-full px-5 py-3 text-sm font-black transition-colors ${
                categoriaAtiva === cat.id
                  ? 'bg-[#ffc72c] text-[#29251f] shadow-sm'
                  : 'bg-white text-[#5b5348] hover:bg-red-50 hover:text-[#d71920]'
              }`}
            >
              {cat.nome}
            </button>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="flex items-center gap-2 text-sm font-black uppercase text-[#d71920]">
              <Flame size={17} />
              Cardápio
            </p>
            <h2 className="text-3xl font-black">Escolha seu pedido</h2>
          </div>
          <p className="text-sm font-semibold text-[#6b6257]">
            {categoriaAtiva === 'pizzas' ? 'Monte até 4 sabores em uma pizza.' : `${produtosFiltrados.length} opções disponíveis.`}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categoriaAtiva === 'pizzas' && (
          <div className="flex min-h-[330px] flex-col overflow-hidden rounded-md border-2 border-[#ffc72c] bg-white shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-xl">
            <div className="bg-[#ffc72c] p-5 text-[#29251f]">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#d71920] text-white">
                <Pizza size={30} />
              </div>
              <h3 className="text-3xl font-black">Pizza do seu jeito</h3>
              <p className="mt-1 text-sm font-bold">
                Escolha tamanho, sabores e borda recheada.
              </p>
            </div>
            <div className="flex flex-1 flex-col p-5">
            <div className="flex-1">
              <div className="space-y-2 text-sm text-[#4d463f]">
                <div className="flex justify-between">
                  <span>Pequena (1 sabor):</span>
                  <span className="font-black">R$ 34,00</span>
                </div>
                <div className="flex justify-between">
                  <span>Média (2 sabores):</span>
                  <span className="font-black">R$ 44,00</span>
                </div>
                <div className="flex justify-between">
                  <span>Grande (3 sabores):</span>
                  <span className="font-black">R$ 52,00</span>
                </div>
                <div className="flex justify-between">
                  <span>Família (4 sabores):</span>
                  <span className="font-black">R$ 62,00</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setMostrarPizzaPersonalizada(true)}
              className="mt-5 w-full rounded-md bg-[#d71920] py-3 font-black text-white transition-colors hover:bg-[#b9141a]"
            >
              Montar Pizza
            </button>
            </div>
          </div>
        )}

        {categoriaAtiva !== 'pizzas' && produtosFiltrados.map(produto => (
          <ItemCardapio key={produto.id} produto={produto} />
        ))}
        </div>
      </section>
      </div>
  )
}
