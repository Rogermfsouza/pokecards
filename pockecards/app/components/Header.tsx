'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useEffect, useState } from 'react';

export default function Header() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const [prevCount, setPrevCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      setPrevCount(cartCount);
      setIsInitialized(true);
      return;
    }

    if (cartCount > prevCount) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
    setPrevCount(cartCount);
  }, [cartCount, prevCount, isInitialized]);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-semibold text-gray-900 tracking-tight group-hover:text-purple-600 transition-colors">
              PokéCards
            </span>
          </Link>

          <nav className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative group"
            >
              Loja
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <Link
              href="/admin"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative group"
            >
              Admin
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <Link
              href="/cart"
              className="group relative"
            >
              <div className={`flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 hover:shadow-lg ${
                isAnimating ? 'animate-bounce-small' : ''
              }`}>
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="hidden sm:inline">Carrinho</span>
                {cartCount > 0 && (
                  <span className={`bg-white text-purple-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold ${
                    isAnimating ? 'animate-pop' : ''
                  }`}>
                    {cartCount}
                  </span>
                )}
              </div>
              
              {isAnimating && (
                <span className="absolute -top-1 -right-1 w-full h-full border-2 border-purple-400 rounded-full animate-ping-once"></span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
