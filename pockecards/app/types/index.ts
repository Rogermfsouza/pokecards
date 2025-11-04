export type ProductCategory = 'single' | 'booster' | 'bundle';

export type RarityLevel = 'rare' | 'ultra-rare' | 'secret';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category: ProductCategory;
  rarity?: RarityLevel;
  cardsCount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
