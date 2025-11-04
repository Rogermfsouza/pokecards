'use client';

import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    
    setTimeout(() => {
      setIsAdding(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    }, 600);
  };

  const getCategoryLabel = () => {
    if (product.category === 'bundle') return `${product.cardsCount} cartas`;
    if (product.category === 'booster') return `${product.cardsCount} cartas`;
    return product.rarity === 'secret' ? 'Secret Rare' : 
           product.rarity === 'ultra-rare' ? 'Ultra Rare' : 'Rare';
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-xl">
      <div className="relative bg-gray-50 aspect-square flex items-center justify-center p-8 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
          {product.category !== 'single' && (
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-xs font-medium text-gray-700">
                {getCategoryLabel()}
              </span>
            </div>
          )}
        </div>

      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>

        {product.category === 'single' && product.rarity && (
          <div className="mb-3">
            <span className="inline-block text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">
              {getCategoryLabel()}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <div className="text-2xl font-semibold text-gray-900">
            R$ {product.price.toFixed(2)}
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={isAdding || showSuccess}
            className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all overflow-hidden ${
              showSuccess
                ? 'bg-green-600 text-white scale-105'
                : isAdding
                ? 'bg-purple-700 text-white scale-95'
                : 'bg-purple-600 hover:bg-purple-700 text-white hover:scale-105 hover:shadow-lg active:scale-95'
            }`}
          >
            {isAdding && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="animate-spin-slow">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </span>
              </span>
            )}
            
            {showSuccess && (
              <span className="absolute inset-0 flex items-center justify-center animate-scale-in">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
            )}
            
            <span className={`${(isAdding || showSuccess) ? 'opacity-0' : 'opacity-100'} transition-opacity flex items-center gap-1`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Adicionar
            </span>
            
            {isAdding && (
              <span className="absolute inset-0 bg-white/20 animate-ripple rounded-full"></span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
