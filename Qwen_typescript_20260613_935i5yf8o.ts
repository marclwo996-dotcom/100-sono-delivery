import Cardapio from '@/components/cliente/Cardapio'
import Carrinho from '@/components/cliente/Carrinho'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-primary text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">100 Sono Delivery</h1>
          <p className="text-sm opacity-90 mt-1">Peça agora e receba em casa</p>
        </div>
      </header>
      
      <Cardapio />
      <Carrinho />
    </main>
  )
}