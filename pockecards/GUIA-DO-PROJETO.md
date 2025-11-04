# 🎯 Guia do Projeto - Loja de Cartinhas Pokémon

## 📋 Visão Geral
Este é um guia passo a passo para criar sua loja de cartinhas Pokémon usando Next.js, TypeScript e localStorage.

---

## ETAPA 1: Criar os Tipos TypeScript 📝

**Objetivo:** Definir as interfaces que representam os dados do projeto.

### O que fazer:
1. Criar uma pasta `types` dentro de `app/`
2. Criar o arquivo `app/types/index.ts`
3. Definir as seguintes interfaces:

### Subetapas:

#### 1.1 - Interface Product
```typescript
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}
```
**Explicação:** Representa um produto (cartinha Pokémon). O `id` identifica cada produto, `name` é o nome, `price` o preço, `image` a URL da imagem.

#### 1.2 - Interface CartItem
```typescript
export interface CartItem {
  product: Product;
  quantity: number;
}
```
**Explicação:** Representa um item no carrinho. Contém o produto e a quantidade que o usuário quer comprar.

---

## ETAPA 2: Criar Utilitários para localStorage 💾

**Objetivo:** Criar funções para salvar e carregar dados do localStorage.

### O que fazer:
1. Criar uma pasta `lib` ou `utils` dentro de `app/`
2. Criar o arquivo `app/lib/localStorage.ts`

### Subetapas:

#### 2.1 - Função para salvar produtos
```typescript
export const saveProducts = (products: Product[]) => {
  localStorage.setItem('products', JSON.stringify(products));
};
```
**Explicação:** Salva a lista de produtos no localStorage.

#### 2.2 - Função para carregar produtos
```typescript
export const getProducts = (): Product[] => {
  const data = localStorage.getItem('products');
  return data ? JSON.parse(data) : [];
};
```
**Explicação:** Carrega a lista de produtos do localStorage. Se não existir, retorna array vazio.

#### 2.3 - Função para salvar carrinho
```typescript
export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};
```

#### 2.4 - Função para carregar carrinho
```typescript
export const getCart = (): CartItem[] => {
  const data = localStorage.getItem('cart');
  return data ? JSON.parse(data) : [];
};
```

#### 2.5 - Função para inicializar produtos de exemplo
```typescript
export const initializeProducts = () => {
  const existing = getProducts();
  if (existing.length === 0) {
    const initialProducts: Product[] = [
      {
        id: '1',
        name: 'Pikachu',
        price: 25.00,
        image: '/pikachu.png',
        description: 'Cartinha rara do Pikachu'
      },
      // Adicione mais produtos aqui
    ];
    saveProducts(initialProducts);
  }
};
```
**Explicação:** Na primeira vez que o usuário acessa, cria produtos de exemplo.

---

## ETAPA 3: Criar Context para o Carrinho 🛒

**Objetivo:** Criar um Context do React para gerenciar o estado do carrinho globalmente.

### O que fazer:
1. Criar uma pasta `context` dentro de `app/`
2. Criar o arquivo `app/context/CartContext.tsx`

### Subetapas:

#### 3.1 - Criar o Context
```typescript
'use client';
import { createContext, useContext, useState, useEffect } from 'react';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
```
**Explicação:** Define o tipo do contexto e cria o contexto.

#### 3.2 - Criar o Provider
```typescript
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Carregar carrinho do localStorage quando componente montar
  useEffect(() => {
    const savedCart = getCart();
    setCart(savedCart);
  }, []);

  // Salvar carrinho no localStorage quando mudar
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  // Implementar as funções addToCart, removeFromCart, etc.
  
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
}
```
**Explicação:** O Provider envolve a aplicação e fornece o estado do carrinho para todos os componentes.

#### 3.3 - Criar hook personalizado
```typescript
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart deve ser usado dentro de CartProvider');
  return context;
};
```
**Explicação:** Hook para facilitar o uso do contexto nos componentes.

#### 3.4 - Adicionar o Provider no layout
No arquivo `app/layout.tsx`, envolver o `{children}` com o `<CartProvider>`.

---

## ETAPA 4: Criar a Página Principal (Lista de Produtos) 🏠

**Objetivo:** Exibir todos os produtos disponíveis para compra.

### O que fazer:
1. Editar o arquivo `app/page.tsx`
2. Criar componentes auxiliares (opcional)

### Subetapas:

#### 4.1 - Carregar produtos do localStorage
```typescript
'use client';
import { useEffect, useState } from 'react';

const [products, setProducts] = useState<Product[]>([]);

useEffect(() => {
  initializeProducts(); // Criar produtos de exemplo se não existir
  const loadedProducts = getProducts();
  setProducts(loadedProducts);
}, []);
```
**Explicação:** Usa `useEffect` para carregar produtos quando a página carrega.

#### 4.2 - Exibir os produtos em um grid
```typescript
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {products.map(product => (
    <div key={product.id} className="border p-4 rounded">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>R$ {product.price.toFixed(2)}</p>
      <button onClick={() => addToCart(product)}>
        Adicionar ao Carrinho
      </button>
    </div>
  ))}
</div>
```
**Explicação:** Mapeia os produtos e exibe cada um em um card. O botão adiciona ao carrinho.

#### 4.3 - Adicionar navegação
Criar links para o carrinho e página de adicionar produtos.

---

## ETAPA 5: Criar a Página do Carrinho 🛒

**Objetivo:** Mostrar os itens adicionados ao carrinho e permitir finalizar a compra.

### O que fazer:
1. Criar o arquivo `app/cart/page.tsx`

### Subetapas:

#### 5.1 - Buscar itens do carrinho
```typescript
'use client';
const { cart, removeFromCart, getTotalPrice, clearCart } = useCart();
```
**Explicação:** Usa o hook `useCart` para acessar os itens do carrinho.

#### 5.2 - Exibir os itens
```typescript
{cart.map(item => (
  <div key={item.product.id}>
    <p>{item.product.name}</p>
    <p>Quantidade: {item.quantity}</p>
    <p>R$ {item.product.price * item.quantity}</p>
    <button onClick={() => removeFromCart(item.product.id)}>
      Remover
    </button>
  </div>
))}
```

#### 5.3 - Mostrar total
```typescript
<p>Total: R$ {getTotalPrice().toFixed(2)}</p>
```

#### 5.4 - Botão de finalizar compra
```typescript
<button onClick={handleCheckout}>
  Finalizar Compra
</button>
```
**Explicação:** Ao clicar, redireciona para a página de "obrigado" e limpa o carrinho.

---

## ETAPA 6: Criar a Página de Agradecimento ✅

**Objetivo:** Mostrar uma mensagem após finalizar a compra.

### O que fazer:
1. Criar o arquivo `app/thank-you/page.tsx`

### Subetapas:

#### 6.1 - Criar página simples
```typescript
export default function ThankYouPage() {
  return (
    <div className="text-center p-8">
      <h1 className="text-4xl font-bold">Obrigado pela sua compra!</h1>
      <p>Seu pedido foi realizado com sucesso.</p>
      <a href="/">Voltar para a loja</a>
    </div>
  );
}
```
**Explicação:** Página simples com mensagem de agradecimento.

---

## ETAPA 7: Criar Formulário para Adicionar Produtos ➕

**Objetivo:** Permitir cadastrar novos produtos que aparecerão na loja.

### O que fazer:
1. Criar o arquivo `app/add-product/page.tsx`

### Subetapas:

#### 7.1 - Criar estado do formulário
```typescript
'use client';
const [formData, setFormData] = useState({
  name: '',
  price: 0,
  image: '',
  description: ''
});
```

#### 7.2 - Criar inputs do formulário
```typescript
<input 
  type="text" 
  placeholder="Nome do Pokémon"
  value={formData.name}
  onChange={(e) => setFormData({...formData, name: e.target.value})}
/>
```
**Explicação:** Cria inputs para cada campo do produto.

#### 7.3 - Criar função de submit
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  const newProduct: Product = {
    id: Date.now().toString(), // ID simples baseado em timestamp
    ...formData
  };
  
  const currentProducts = getProducts();
  saveProducts([...currentProducts, newProduct]);
  
  // Limpar formulário ou redirecionar
};
```
**Explicação:** Ao enviar, cria um novo produto e salva no localStorage.

---

## ETAPA 8: Melhorar a Interface 🎨

**Objetivo:** Deixar a loja bonita e responsiva.

### Subetapas:

#### 8.1 - Adicionar um Header/Navbar
Criar um componente `app/components/Header.tsx` com links de navegação.

#### 8.2 - Estilizar com Tailwind CSS
Usar classes do Tailwind para deixar bonito:
- Cards com sombra
- Botões coloridos
- Grid responsivo
- Espaçamentos adequados

#### 8.3 - Adicionar ícones/imagens
Usar imagens de Pokémon (pode usar URLs da internet ou criar placeholders).

---

## ETAPA 9: Testes e Ajustes 🧪

**Objetivo:** Testar todas as funcionalidades.

### Checklist:

- [ ] Produtos aparecem na página inicial
- [ ] Adicionar produto ao carrinho funciona
- [ ] Carrinho mostra os produtos corretos
- [ ] Remover do carrinho funciona
- [ ] Finalizar compra redireciona e limpa carrinho
- [ ] Formulário adiciona novos produtos
- [ ] Novos produtos aparecem na loja
- [ ] Dados persistem ao recarregar a página (localStorage)

---

## 📁 Estrutura de Pastas Final

```
app/
├── types/
│   └── index.ts
├── lib/
│   └── localStorage.ts
├── context/
│   └── CartContext.tsx
├── components/
│   ├── Header.tsx
│   └── ProductCard.tsx (opcional)
├── cart/
│   └── page.tsx
├── thank-you/
│   └── page.tsx
├── add-product/
│   └── page.tsx
├── layout.tsx
├── page.tsx
└── globals.css
```

---

## 🚀 Comandos Úteis

```bash
# Rodar o projeto
npm run dev

# Abrir no navegador
http://localhost:3000

# Build para produção
npm run build
```

---

## 💡 Dicas Extras

1. **Validação:** Adicione validações no formulário (campos obrigatórios, preço > 0)
2. **Feedback visual:** Mostre mensagens quando adicionar ao carrinho
3. **Loading states:** Mostre loading ao carregar dados
4. **Responsive:** Teste em diferentes tamanhos de tela
5. **Imagens:** Use URLs públicas de Pokémon ou placeholders

---

## ✅ Ordem Recomendada de Execução

1. ETAPA 1 - Tipos
2. ETAPA 2 - localStorage
3. ETAPA 3 - Context
4. ETAPA 4 - Página Principal
5. ETAPA 5 - Carrinho
6. ETAPA 7 - Formulário
7. ETAPA 6 - Página de Agradecimento
8. ETAPA 8 - Melhorar UI
9. ETAPA 9 - Testes

---

Boa sorte! 🎉

