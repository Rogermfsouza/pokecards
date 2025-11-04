'use client';

import { useState, useEffect } from 'react';
import { Product } from './types';
import { initializeProducts, getProducts } from './lib/localStorage';
import ProductCard from './components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeProducts();
    const loadedProducts = getProducts();
    setProducts(loadedProducts);
    setIsLoading(false);
  }, []);

  const singles = products.filter(p => p.category === 'single');
  const boosters = products.filter(p => p.category === 'booster');
  const bundles = products.filter(p => p.category === 'bundle');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-purple-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-purple-50/30 to-white py-24 md:py-20">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(147, 51, 234, 0.05) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block mb-8">
            <div className="bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full border border-purple-200 shadow-lg">
              <span className="text-sm font-semibold text-purple-600">✨ Coleção Oficial 2024</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6 tracking-tight leading-none">
            Coleção Premium<br/>
            <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
              Pokémon TCG
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Cartas raras, boosters e bundles exclusivos para colecionadores
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a
              href="#produtos"
              className="group relative inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white px-10 py-5 rounded-full text-lg font-semibold transition-all shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Explorar Coleção
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            
            <a
              href="#bundles"
              className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-900 px-10 py-5 rounded-full text-lg font-semibold transition-all border-2 border-gray-200 hover:border-purple-300 shadow-lg hover:shadow-xl"
            >
              Ver Bundles
            </a>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all">
              <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-sm font-semibold text-gray-900 mb-1">Autênticas</div>
              <div className="text-xs text-gray-600">Garantia oficial</div>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all">
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-sm font-semibold text-gray-900 mb-1">Cartas</div>
              <div className="text-xs text-gray-600">Em estoque</div>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all">
              <div className="text-4xl font-bold text-purple-600 mb-2">24h</div>
              <div className="text-sm font-semibold text-gray-900 mb-1">Entrega</div>
              <div className="text-xs text-gray-600">Frete expresso</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
      </section>

      <section id="produtos" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Cartas Raras</h2>
            <p className="text-lg text-gray-600">Cartas individuais ultra raras para sua coleção</p>
          </div>

          {singles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20">
              {singles.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mb-20">Nenhuma carta disponível no momento.</p>
          )}

          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Booster Packs</h2>
            <p className="text-lg text-gray-600">Pacotes com 10 cartas aleatórias</p>
          </div>

          {boosters.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20">
              {boosters.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mb-20">Nenhum booster disponível no momento.</p>
          )}

          <div className="mb-16" id="bundles">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Bundles</h2>
            <p className="text-lg text-gray-600">Kits completos com 10 a 20 cartas selecionadas</p>
          </div>

          {bundles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bundles.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Nenhum bundle disponível no momento.</p>
          )}
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Autênticas</div>
              <p className="text-gray-600">Todas as cartas são originais e verificadas</p>
            </div>
            
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">Entrega</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Rápida e Segura</div>
              <p className="text-gray-600">Envio protegido para todo o Brasil</p>
            </div>
            
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">Suporte</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Especializado</div>
              <p className="text-gray-600">Atendimento para colecionadores</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
