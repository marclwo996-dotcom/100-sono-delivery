import Cardapio from '@/components/cliente/Cardapio'
import Carrinho from '@/components/cliente/Carrinho'
import { Clock, MapPin, ShoppingBag } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fff8e7] text-[#29251f]">
      <header className="sticky top-0 z-30 border-b border-black/10 bg-[#d71920] text-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 md:px-6 md:py-3">
          <div>
            <h1 className="text-xl font-black tracking-normal md:text-3xl">100 Sono Delivery</h1>
            <p className="text-[11px] font-semibold text-yellow-100 md:text-sm">Lanches, pizzas e combos no capricho</p>
          </div>
          <div className="hidden items-center gap-2 rounded-full bg-[#ffc72c] px-4 py-2 text-sm font-black text-[#29251f] sm:flex">
            <ShoppingBag size={18} />
            Peça agora
          </div>
        </div>
      </header>

      <section className="bg-[#d71920]">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-4 md:grid-cols-[1fr_0.95fr] md:items-center md:px-6 md:py-10">
          <div className="max-w-2xl text-white">
            <p className="mb-2 inline-flex rounded-full bg-[#ffc72c] px-3 py-1.5 text-xs font-black text-[#29251f] md:mb-3 md:px-4 md:py-2 md:text-sm">
              Delivery aberto hoje
            </p>
            <h2 className="text-3xl font-black leading-tight md:text-6xl">
              Seu combo chega quente e sem enrolação.
            </h2>
            <p className="mt-3 max-w-xl text-sm font-medium text-red-50 md:mt-4 md:text-lg">
              Escolha no cardápio, monte sua pizza e finalize o pedido direto pelo WhatsApp.
            </p>
            <div className="mt-4 grid gap-2 text-sm font-bold sm:grid-cols-2 md:mt-6 md:gap-3">
              <div className="flex items-center gap-2 rounded-md bg-white/12 px-4 py-3">
                <Clock size={18} />
                Entrega rápida
              </div>
              <div className="flex items-center gap-2 rounded-md bg-white/12 px-4 py-3">
                <MapPin size={18} />
                Taxa fixa R$ 3,00
              </div>
            </div>
          </div>

          <div className="relative min-h-[150px] overflow-hidden rounded-md bg-[#ffc72c] shadow-2xl sm:min-h-[230px] md:min-h-[360px]">
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1100&q=85"
              alt="Hambúrguer artesanal com batatas fritas"
              className="h-full min-h-[150px] w-full object-cover sm:min-h-[230px] md:min-h-[360px]"
            />
            <div className="absolute bottom-3 left-3 rounded-md bg-white px-3 py-2 shadow-lg md:bottom-4 md:left-4 md:px-4 md:py-3">
              <p className="text-xs font-black uppercase text-[#d71920]">Mais pedido</p>
              <p className="text-base font-black md:text-lg">Combo Turbo</p>
            </div>
          </div>
        </div>
      </section>
      
      <Cardapio />
      <Carrinho />
    </main>
  )
}
