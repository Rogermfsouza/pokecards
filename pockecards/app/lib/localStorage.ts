import { Product, CartItem } from '../types';

export const saveProducts = (products: Product[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('products', JSON.stringify(products));
  }
};

export const deleteProduct = (productId: string): void => {
  const products = getProducts();
  const updatedProducts = products.filter(p => p.id !== productId);
  saveProducts(updatedProducts);
};

export const getProducts = (): Product[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('products');
    return data ? JSON.parse(data) : [];
  }
  return [];
};

export const saveCart = (cart: CartItem[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

export const getCart = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  }
  return [];
};

export const initializeProducts = (): void => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('products');
    if (data) {
      try {
        const existing = JSON.parse(data) as Array<Record<string, unknown>>;
        const hasOldStructure = existing.some(p => 'cardsInPack' in p || p.category === 'pack');
        
        if (hasOldStructure) {
          localStorage.removeItem('products');
        }
      } catch (error) {
        localStorage.removeItem('products');
      }
    }
  }
  
  const products = getProducts();
  if (products.length === 0) {
    const initialProducts: Product[] = [
      {
        id: '1',
        name: 'Charizard VMAX',
        price: 450.00,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
        description: 'Carta ultra rara com acabamento holográfico premium',
        category: 'single',
        rarity: 'ultra-rare'
      },
      {
        id: '2',
        name: 'Mewtwo Secret',
        price: 380.00,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
        description: 'Edição secreta com numeração especial',
        category: 'single',
        rarity: 'secret'
      },
      {
        id: '3',
        name: 'Rayquaza GX',
        price: 320.00,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/384.png',
        description: 'Carta rara com arte alternativa exclusiva',
        category: 'single',
        rarity: 'rare'
      },
      {
        id: '4',
        name: 'Lugia Rainbow',
        price: 290.00,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/249.png',
        description: 'Rainbow rare com brilho holográfico',
        category: 'single',
        rarity: 'ultra-rare'
      },
      {
        id: '5',
        name: 'Booster Elétrico',
        price: 45.00,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        description: 'Pacote com 10 cartas aleatórias de Pokémon elétricos',
        category: 'booster',
        cardsCount: 10
      },
      {
        id: '6',
        name: 'Booster Fogo',
        price: 45.00,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
        description: 'Pacote com 10 cartas de Pokémon de fogo',
        category: 'booster',
        cardsCount: 10
      },
      {
        id: '7',
        name: 'Booster Água',
        price: 45.00,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png',
        description: 'Pacote com 10 cartas de Pokémon aquáticos',
        category: 'booster',
        cardsCount: 10
      },
      {
        id: '8',
        name: 'Bundle Starter',
        price: 120.00,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        description: 'Kit inicial com 10 cartas selecionadas para começar sua coleção',
        category: 'bundle',
        cardsCount: 10
      },
      {
        id: '9',
        name: 'Bundle Premium',
        price: 250.00,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
        description: 'Coleção premium com 15 cartas incluindo raras garantidas',
        category: 'bundle',
        cardsCount: 15
      },
      {
        id: '10',
        name: 'Bundle Elite',
        price: 480.00,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
        description: 'Bundle exclusivo com 20 cartas incluindo ultra raras',
        category: 'bundle',
        cardsCount: 20
      }
    ];
    saveProducts(initialProducts);
  }
};
