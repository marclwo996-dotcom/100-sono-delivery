import AcompanharPedido from '@/components/cliente/AcompanharPedido'

interface PedidoPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function PedidoPage({ params }: PedidoPageProps) {
  const { id } = await params
  return <AcompanharPedido pedidoId={id} />
}
