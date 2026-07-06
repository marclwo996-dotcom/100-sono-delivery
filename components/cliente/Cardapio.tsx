'use client'

import { useState } from 'react'
import { produtos } from '@/lib/data'
import ItemCardapio from './ItemCardapio'
import PizzaPersonalizada from './components/cliente/PizzaPersonalizada'
import { Flame, Pizza, Search, X } from 'lucide-react'

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
  const [saborInicialPizza, setSaborInicialPizza] = useState<string | null>(null)
  const [busca, setBusca] = useState('')

  const termoBusca = busca.trim().toLowerCase()
  const produtosFiltrados = produtos.filter(p => {
    if (p.categoria !== categoriaAtiva) return false
    if (!termoBusca) return true
    return `${p.nome} ${p.descricao ?? ''}`.toLowerCase().includes(termoBusca)
  })

  function abrirPizzaPersonalizada(saborId?: string) {
    setSaborInicialPizza(saborId ?? null)
    setMostrarPizzaPersonalizada(true)
  }

  // Se está montando pizza personalizada, mostrar modal
  if (mostrarPizzaPersonalizada) {
    return (
      <PizzaPersonalizada 
        onFechar={() => setMostrarPizzaPersonalizada(false)}
        saborInicialId={saborInicialPizza}
      />
    )
  }

  return (
    <div className="pb-28">
      <div className="sticky top-[57px] z-20 border-b border-black/10 bg-[#fff8e7]/95 shadow-sm backdrop-blur md:top-[65px]">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 md:px-6">
          {categorias.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setCategoriaAtiva(cat.id)
                setBusca('')
              }}
              className={`min-w-max rounded-full px-4 py-3 text-sm font-black transition-colors sm:px-5 ${
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
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="flex items-center gap-2 text-sm font-black uppercase text-[#d71920]">
              <Flame size={17} />
              Cardápio
            </p>
            <h2 className="text-2xl font-black sm:text-3xl">Escolha seu pedido</h2>
          </div>
          <p className="text-sm font-semibold text-[#6b6257]">
            {categoriaAtiva === 'pizzas'
              ? `${produtosFiltrados.length} sabores. Monte até 4 em uma pizza.`
              : `${produtosFiltrados.length} opções disponíveis.`}
          </p>
        </div>

        <div className="relative mb-4">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6b6257]" size={20} />
          <input
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            placeholder="Buscar por nome ou ingrediente"
            className="h-12 w-full rounded-md border border-black/10 bg-white pl-10 pr-11 text-base font-semibold outline-none ring-[#ffc72c] transition focus:ring-2"
          />
          {busca && (
            <button
              type="button"
              onClick={() => setBusca('')}
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[#6b6257] hover:bg-black/5"
              aria-label="Limpar busca"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categoriaAtiva === 'pizzas' && (
          <div className="flex min-h-[300px] flex-col overflow-hidden rounded-md border-2 border-[#ffc72c] bg-white shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-xl sm:min-h-[330px]">
            <div className="bg-[#ffc72c] p-4 text-[#29251f] sm:p-5">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#d71920] text-white sm:h-14 sm:w-14">
                <Pizza size={30} />
              </div>
              <h3 className="text-2xl font-black sm:text-3xl">Pizza do seu jeito</h3>
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
              onClick={() => abrirPizzaPersonalizada()}
              className="mt-5 w-full rounded-md bg-[#d71920] py-3 font-black text-white transition-colors hover:bg-[#b9141a]"
            >
              Montar Pizza
            </button>
            </div>
          </div>
        )}

        {produtosFiltrados.map(produto => (
          <ItemCardapio
            key={produto.id}
            produto={produto}
            onMontarPizza={produto.categoria === 'pizzas' ? abrirPizzaPersonalizada : undefined}
          />
        ))}
        </div>
      </section>
      </div>
  )
}
