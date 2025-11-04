'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '../types';
import { getProducts, deleteProduct, saveProducts } from '../lib/localStorage';
import { isAuthenticated, logout } from '../lib/auth';

export default function AdminPanel() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    loadProducts();
  }, [router]);

  const loadProducts = () => {
    const loadedProducts = getProducts();
    setProducts(loadedProducts);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleDelete = (productId: string) => {
    deleteProduct(productId);
    loadProducts();
    setDeleteConfirm(null);
  };

  const productToDelete = deleteConfirm ? products.find(p => p.id === deleteConfirm) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
          <div className="flex items-center space-x-4">
            <a
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Ver Loja
            </a>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-all"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Produtos</h2>
            <p className="text-gray-600">{products.length} produtos cadastrados</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {showAddForm ? 'Cancelar' : 'Novo Produto'}
          </button>
        </div>

        {showAddForm && (
          <AddProductForm 
            onSuccess={() => {
              loadProducts();
              setShowAddForm(false);
            }}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Produto</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Categoria</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Preço</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-contain bg-gray-50 rounded-lg"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-600">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      {product.category === 'single' ? 'Carta Rara' : 
                       product.category === 'booster' ? 'Booster' : 'Bundle'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    R$ {product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setDeleteConfirm(product.id)}
                      className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Nenhum produto cadastrado
            </div>
          )}
        </div>
      </div>

      {deleteConfirm && productToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="inline-block bg-red-100 rounded-full p-4 mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Excluir Produto?
              </h3>
              <p className="text-gray-600">
                Tem certeza que deseja excluir <strong>{productToDelete.name}</strong>?
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 py-3 rounded-xl font-medium transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-medium transition-all"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AddProductForm({ onSuccess, onCancel }: { onSuccess: () => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: 'single' as 'single' | 'booster' | 'bundle',
    rarity: 'rare' as 'rare' | 'ultra-rare' | 'secret',
    cardsCount: '10'
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Preço inválido';
    if (!formData.image.trim()) newErrors.image = 'URL da imagem é obrigatória';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      price: parseFloat(formData.price),
      image: formData.image,
      description: formData.description || undefined,
      category: formData.category,
      rarity: formData.category === 'single' ? formData.rarity : undefined,
      cardsCount: (formData.category === 'booster' || formData.category === 'bundle') ? 
                   parseInt(formData.cardsCount) : undefined
    };

    const currentProducts = getProducts();
    saveProducts([...currentProducts, newProduct]);
    onSuccess();
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 shadow-lg">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-1">Novo Produto</h3>
        <p className="text-sm text-gray-600">Preencha os dados para adicionar ao catálogo</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Tipo de Produto *
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, category: 'single' })}
              className={`p-3 rounded-xl border-2 transition-all ${
                formData.category === 'single' 
                  ? 'border-purple-600 bg-purple-50' 
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="font-semibold text-gray-900 text-sm">Carta Rara</div>
              <div className="text-xs text-gray-600">Individual</div>
            </button>
            
            <button
              type="button"
              onClick={() => setFormData({ ...formData, category: 'booster' })}
              className={`p-3 rounded-xl border-2 transition-all ${
                formData.category === 'booster' 
                  ? 'border-purple-600 bg-purple-50' 
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="font-semibold text-gray-900 text-sm">Booster</div>
              <div className="text-xs text-gray-600">10 cartas</div>
            </button>
            
            <button
              type="button"
              onClick={() => setFormData({ ...formData, category: 'bundle' })}
              className={`p-3 rounded-xl border-2 transition-all ${
                formData.category === 'bundle' 
                  ? 'border-purple-600 bg-purple-50' 
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="font-semibold text-gray-900 text-sm">Bundle</div>
              <div className="text-xs text-gray-600">10-20 cartas</div>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Nome do Produto *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder={formData.category === 'single' ? 'Ex: Charizard VMAX' : formData.category === 'booster' ? 'Ex: Booster Trovão' : 'Ex: Bundle Premium'}
              className="w-full px-4 py-2.5 border-2 border-gray-200 focus:border-purple-600 rounded-xl focus:outline-none transition-colors text-sm"
            />
            {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Preço (R$) *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
              placeholder="0.00"
              className="w-full px-4 py-2.5 border-2 border-gray-200 focus:border-purple-600 rounded-xl focus:outline-none transition-colors text-sm"
            />
            {errors.price && <p className="text-red-600 text-xs mt-1">{errors.price}</p>}
          </div>
        </div>

        {(formData.category === 'booster' || formData.category === 'bundle') && (
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Quantidade de Cartas
            </label>
            <input
              type="number"
              value={formData.cardsCount}
              onChange={e => setFormData({ ...formData, cardsCount: e.target.value })}
              placeholder={formData.category === 'booster' ? '10' : '15'}
              className="w-full px-4 py-2.5 border-2 border-gray-200 focus:border-purple-600 rounded-xl focus:outline-none transition-colors text-sm"
            />
          </div>
        )}

        {formData.category === 'single' && (
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Raridade
            </label>
            <select
              value={formData.rarity}
              onChange={e => setFormData({ ...formData, rarity: e.target.value as 'rare' | 'ultra-rare' | 'secret' })}
              className="w-full px-4 py-2.5 border-2 border-gray-200 focus:border-purple-600 rounded-xl focus:outline-none transition-colors bg-white text-sm"
            >
              <option value="rare">Rare</option>
              <option value="ultra-rare">Ultra Rare</option>
              <option value="secret">Secret</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            URL da Imagem *
          </label>
          <input
            type="text"
            value={formData.image}
            onChange={e => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://..."
            className="w-full px-4 py-2.5 border-2 border-gray-200 focus:border-purple-600 rounded-xl focus:outline-none transition-colors text-sm"
          />
          {errors.image && <p className="text-red-600 text-xs mt-1">{errors.image}</p>}
          
          {formData.image && (
            <div className="mt-3 bg-gray-50 rounded-xl p-3">
              <p className="text-xs font-semibold text-gray-700 mb-2">Prévia:</p>
              <div className="flex justify-center">
                <img
                  src={formData.image}
                  alt="Prévia"
                  className="max-h-32 object-contain rounded-lg"
                  onError={e => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Descrição (opcional)
          </label>
          <textarea
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            placeholder="Descrição do produto..."
            className="w-full px-4 py-2.5 border-2 border-gray-200 focus:border-purple-600 rounded-xl focus:outline-none resize-none transition-colors text-sm"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition-all"
          >
            Adicionar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 py-3 rounded-xl font-semibold transition-all"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

