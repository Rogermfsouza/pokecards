# Exemplo de Parâmetros vs Variáveis

## ❌ ERRADO - Parâmetro dentro das chaves
```typescript
function saveProducts() {
    products: Product[]  // ❌ Isso não funciona!
    // Como você vai passar produtos para a função?
}

// Como você chamaria isso?
saveProducts(???); // ← Onde você passa o valor?
```

## ✅ CORRETO - Parâmetro nos parênteses
```typescript
function saveProducts(products: Product[]) {
    // Agora 'products' recebe o valor que você passa
    localStorage.setItem('products', JSON.stringify(products));
}

// Você chama assim:
saveProducts([produto1, produto2]);
//            ↑ Este valor vai para o parâmetro
```

## Comparação lado a lado:

```typescript
// ===== PARÂMETRO (dentro dos parênteses) =====
function somar(a, b) {  // ← 'a' e 'b' são PARÂMETROS
    return a + b;       // ← Você usa eles aqui dentro
}

somar(5, 3);  // ← Você PASSA os valores aqui
//     ↑  ↑
//     |  |
//     a  b  ← Os valores vão para os parâmetros


// ===== VARIÁVEL (dentro das chaves) =====
function exemplo() {
    const x = 10;  // ← 'x' é uma VARIÁVEL criada dentro
    return x;      // ← Você usa ela aqui
}

exemplo();  // ← Não precisa passar nada
```

