import Link from 'next/link';

export default function ThankYouPage() {
  const orderNumber = Math.floor(Math.random() * 1000000);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="inline-block bg-green-100 rounded-full p-6 mb-6">
            <svg
              className="w-16 h-16 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pedido Confirmado
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Obrigado pela sua compra!
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 mb-8 border border-gray-200">
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Número do Pedido</p>
              <p className="text-2xl font-bold text-gray-900">
                #{orderNumber.toString().padStart(6, '0')}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-lg font-semibold text-gray-900">Confirmado</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Você receberá um email de confirmação com todos os detalhes do seu pedido.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="block bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-medium transition-all"
          >
            Voltar para a Loja
          </Link>

          <Link
            href="/add-product"
            className="block bg-gray-200 hover:bg-gray-300 text-gray-900 px-8 py-4 rounded-full font-medium transition-all"
          >
            Adicionar Novos Produtos
          </Link>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-purple-600 font-bold text-2xl mb-1">24h</div>
            <p className="text-gray-600 text-sm">Entrega Rápida</p>
          </div>
          <div className="text-center">
            <div className="text-purple-600 font-bold text-2xl mb-1">100%</div>
            <p className="text-gray-600 text-sm">Seguro</p>
          </div>
          <div className="text-center">
            <div className="text-purple-600 font-bold text-2xl mb-1">★★★★★</div>
            <p className="text-gray-600 text-sm">Autênticas</p>
          </div>
        </div>
      </div>
    </div>
  );
}
