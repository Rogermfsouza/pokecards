# 🎴 Projeto PokéCards - E-commerce de Cartinhas Pokémon

## ✅ Projeto Concluído

Este é um e-commerce completo de cartinhas Pokémon desenvolvido com Next.js, TypeScript, Tailwind CSS e localStorage.

---

## 📁 Estrutura do Projeto

```
pockecards/
├── app/
│   ├── types/
│   │   └── index.ts              # Interfaces TypeScript (Product, CartItem)
│   ├── lib/
│   │   └── localStorage.ts       # Funções para gerenciar localStorage
│   ├── context/
│   │   └── CartContext.tsx       # Context API para gerenciar carrinho
│   ├── components/
│   │   ├── Header.tsx            # Barra de navegação
│   │   └── ProductCard.tsx       # Card de produto
│   ├── cart/
│   │   └── page.tsx              # Página do carrinho
│   ├── thank-you/
│   │   └── page.tsx              # Página de agradecimento
│   ├── add-product/
│   │   └── page.tsx              # Formulário de adicionar produto
│   ├── layout.tsx                # Layout principal com CartProvider
│   ├── page.tsx                  # Página inicial (lista de produtos)
│   └── globals.css
```

---

## 🚀 Funcionalidades Implementadas

### ✅ 1. Visualizar Produtos
- Página inicial mostra todos os produtos disponíveis
- Cards de produtos com imagem, nome, descrição e preço
- Design responsivo com grid adaptativo
- Produtos iniciais pré-carregados automaticamente

### ✅ 2. Adicionar ao Carrinho
- Botão "Adicionar ao Carrinho" em cada produto
- Feedback visual quando item é adicionado
- Contador de itens no carrinho no header
- Incremento automático de quantidade para itens duplicados

### ✅ 3. Gerenciar Carrinho
- Visualizar todos os itens no carrinho
- Ver quantidade e subtotal de cada item
- Remover itens individualmente
- Calcular total automaticamente
- Persistência com localStorage

### ✅ 4. Finalizar Compra
- Botão de finalizar compra
- Validação de carrinho vazio
- Redirecionamento para página de agradecimento
- Limpeza automática do carrinho após compra

### ✅ 5. Cadastrar Novos Produtos
- Formulário completo de cadastro
- Validação de campos obrigatórios
- Prévia da imagem em tempo real
- Feedback de sucesso/erro
- Produtos cadastrados aparecem imediatamente na loja

### ✅ 6. Persistência de Dados
- localStorage para produtos
- localStorage para carrinho
- Dados mantidos ao recarregar página
- Sincronização automática

---

## 🎨 Design e UI/UX

### Características:
- **Design Moderno:** Gradientes, sombras e animações suaves
- **Responsivo:** Funciona em desktop, tablet e mobile
- **Feedback Visual:** Botões com estados hover/active
- **Cores Temáticas:** Vermelho (tema Pokémon), verde (sucesso), amarelo (destaque)
- **Ícones:** Emojis para interface amigável
- **Acessibilidade:** Labels adequados, contraste de cores

---

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **React Context API** - Gerenciamento de estado
- **localStorage** - Persistência de dados
- **React Hooks** - useState, useEffect, useContext

---

## 📦 Produtos Iniciais

O sistema vem com 6 produtos pré-cadastrados:
1. Pikachu - R$ 25,00
2. Charizard - R$ 150,00
3. Blastoise - R$ 120,00
4. Venusaur - R$ 110,00
5. Mewtwo - R$ 200,00
6. Dragonite - R$ 95,00

Todas as imagens são carregadas da API oficial do Pokémon.

---

## 🎯 Como Usar

### Iniciar o Projeto:
```bash
npm run dev
```

### Acessar no Navegador:
```
http://localhost:3000
```

### Fluxo de Uso:
1. **Ver produtos** na página inicial
2. **Adicionar produtos** ao carrinho
3. **Clicar no carrinho** para revisar itens
4. **Finalizar compra** para concluir
5. **Ver confirmação** na página de agradecimento
6. **Adicionar novos produtos** pelo formulário

---

## 🏗️ Arquitetura e Padrões

### Clean Code Aplicado:
- ✅ Funções pequenas e focadas
- ✅ Nomes descritivos de variáveis e funções
- ✅ Separação de responsabilidades
- ✅ Componentes reutilizáveis
- ✅ Código sem comentários (auto-explicativo)

### Padrões de Projeto:
- **Context API Pattern** - Estado global do carrinho
- **Custom Hooks** - useCart para acessar contexto
- **Composition Pattern** - Componentes compostos
- **Container/Presentational** - Separação de lógica e UI

### Boas Práticas:
- TypeScript para type safety
- Validação de formulários
- Tratamento de erros
- Loading states
- Estados de feedback
- Verificação de typeof window (SSR safety)

---

## 🔄 Fluxo de Dados

```
localStorage
    ↓
localStorage.ts (funções utilitárias)
    ↓
CartContext (gerenciamento de estado)
    ↓
useCart() hook
    ↓
Componentes (UI)
```

---

## 📱 Páginas

### 1. Home (/)
- Lista todos os produtos
- Grid responsivo
- Cards interativos

### 2. Carrinho (/cart)
- Itens do carrinho
- Resumo do pedido
- Botão de finalizar compra

### 3. Adicionar Produto (/add-product)
- Formulário de cadastro
- Validação de campos
- Prévia de imagem

### 4. Agradecimento (/thank-you)
- Confirmação de compra
- Número do pedido
- Links de navegação

---

## 🎓 Projeto de Faculdade

Este projeto foi desenvolvido como trabalho acadêmico e atende todos os requisitos:
- ✅ E-commerce funcional
- ✅ CRUD de produtos
- ✅ Carrinho de compras
- ✅ Finalização de compra
- ✅ Persistência de dados
- ✅ Interface profissional
- ✅ Código limpo e organizado

---

## 💡 Possíveis Melhorias Futuras

1. Autenticação de usuários
2. Histórico de pedidos
3. Busca e filtros de produtos
4. Categorias de produtos
5. Sistema de avaliações
6. Integração com gateway de pagamento
7. Backend real (API)
8. Banco de dados
9. Upload de imagens
10. Painel administrativo

---

## 📝 Notas Importantes

- **localStorage** tem limite de ~5-10MB
- Dados são mantidos apenas no navegador do usuário
- Para produção, recomenda-se usar banco de dados real
- Imagens são carregadas de URLs externas

---

## ✨ Destaques do Código

### TypeScript
Interfaces bem definidas garantem type safety em todo o projeto.

### Context API
Gerenciamento de estado global eficiente sem bibliotecas externas.

### Clean Code
Código organizado, legível e manutenível seguindo melhores práticas.

### UI/UX
Interface moderna e intuitiva com excelente experiência do usuário.

---

**Desenvolvido com ❤️ para o trabalho de faculdade**

---

Bons estudos! 🎓✨

