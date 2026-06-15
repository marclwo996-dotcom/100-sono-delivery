import PainelPedidos from '@/components/cozinha/PainelPedidos'

export default function CozinhaPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Painel da Cozinha</h1>
          <p className="text-sm opacity-90 mt-1">Gerenciamento de pedidos em tempo real</p>
        </div>
      </header>
      
      <PainelPedidos />
    </main>
  )
}