'use client';

import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, getTotalPrice, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    clearCart();
    router.push('/thank-you');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Seu carrinho está vazio
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Adicione produtos para começar suas compras
          </p>
          <Link
            href="/"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-medium transition-all"
          >
            Ver Produtos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Carrinho</h1>
        <p className="text-lg text-gray-600 mb-12">
          {cart.length} {cart.length === 1 ? 'item' : 'itens'}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div
                key={item.product.id}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-purple-300 transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0 w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-contain"
                    />
                  </div>

                  <div className="flex-grow min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.product.name}
                    </h3>
                    {item.product.description && (
                      <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                        {item.product.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">Quantidade: {item.quantity}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-900 font-medium">
                        R$ {item.product.price.toFixed(2)} cada
                      </span>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-xl font-semibold text-gray-900 mb-3">
                      R$ {(item.product.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Resumo
              </h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">
                    R$ {getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Frete</span>
                  <span className="font-medium text-green-600">Grátis</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-semibold text-gray-900 mb-6">
                <span>Total</span>
                <span>R$ {getTotalPrice().toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-full font-medium transition-all mb-4"
              >
                Finalizar Compra
              </button>

              <Link
                href="/"
                className="block text-center text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                Continuar comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
