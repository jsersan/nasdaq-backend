# Guía de Contribución

¡Gracias por tu interés en contribuir a Burtsa! 🎉

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo puedo contribuir?](#cómo-puedo-contribuir)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Guía de Estilo](#guía-de-estilo)
- [Estructura del Proyecto](#estructura-del-proyecto)

## 📜 Código de Conducta

Este proyecto se adhiere a un código de conducta. Al participar, se espera que mantengas este código.

- Sé respetuoso y considerado
- Acepta las críticas constructivas
- Enfócate en lo que es mejor para la comunidad
- Muestra empatía hacia otros miembros

## 🤝 ¿Cómo puedo contribuir?

### Reportar Bugs

Si encuentras un bug, por favor:

1. Verifica que no haya sido reportado previamente en [Issues](https://github.com/TU-USUARIO/burtsa/issues)
2. Abre un nuevo issue con la etiqueta `bug`
3. Incluye:
   - Descripción clara del problema
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Screenshots si aplica
   - Versión del navegador/Node.js

**Ejemplo de reporte:**

```markdown
## Bug: El gráfico no se actualiza al cambiar de acción

**Descripción**: Al seleccionar una acción diferente desde el portfolio, 
el gráfico no se actualiza con los nuevos datos.

**Pasos para reproducir**:
1. Ir a Portfolio
2. Seleccionar "AAPL"
3. Seleccionar "MSFT"
4. El gráfico sigue mostrando datos de AAPL

**Esperado**: El gráfico debería mostrar datos de MSFT

**Actual**: El gráfico muestra datos de AAPL

**Navegador**: Chrome 120.0
**SO**: macOS Sonoma
```

### Sugerir Mejoras

1. Abre un issue con la etiqueta `enhancement`
2. Describe la mejora que propones
3. Explica por qué sería útil
4. Si es posible, sugiere cómo implementarla

### Contribuir Código

1. Busca issues con las etiquetas `good first issue` o `help wanted`
2. Comenta en el issue que quieres trabajar en él
3. Espera confirmación antes de empezar
4. Sigue el proceso de Pull Request

## 🔄 Proceso de Pull Request

### 1. Fork y Clone

```bash
# Fork el repositorio en GitHub
git clone https://github.com/TU-USUARIO/burtsa.git
cd burtsa
```

### 2. Crear una Rama

```bash
# Desde main/master
git checkout -b feature/nombre-descriptivo
# o
git checkout -b fix/descripcion-del-bug
```

**Convención de nombres:**
- `feature/` - Para nuevas funcionalidades
- `fix/` - Para corrección de bugs
- `docs/` - Para documentación
- `refactor/` - Para refactorización de código
- `test/` - Para tests

### 3. Hacer Cambios

```bash
# Trabaja en tu código
# Haz commits atómicos con mensajes descriptivos

git add .
git commit -m "feat: agregar gráfico de velas japonesas"
```

**Convención de commits:**
- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bug
- `docs:` - Cambios en documentación
- `style:` - Cambios de formato (sin afectar código)
- `refactor:` - Refactorización de código
- `test:` - Agregar o modificar tests
- `chore:` - Tareas de mantenimiento

### 4. Push y Pull Request

```bash
git push origin feature/nombre-descriptivo
```

Luego en GitHub:

1. Abre un Pull Request
2. Describe tus cambios claramente
3. Referencia issues relacionados (`Fixes #123`)
4. Espera revisión

**Checklist del PR:**

- [ ] El código sigue la guía de estilo del proyecto
- [ ] He realizado una auto-revisión de mi código
- [ ] He comentado el código en áreas complejas
- [ ] He actualizado la documentación si es necesario
- [ ] Mis cambios no generan nuevos warnings
- [ ] He probado que los cambios funcionan correctamente

## 🎨 Guía de Estilo

### TypeScript / Angular

```typescript
// ✅ BIEN
export class StockService {
  private apiUrl = environment.alphaVantage.backendUrl;
  
  getQuote(symbol: string): Observable<Quote> {
    return this.http.get<Quote>(`${this.apiUrl}/quote/${symbol}`);
  }
}

// ❌ MAL
export class StockService {
  private APIURL = environment.alphaVantage.backendUrl;
  
  GetQuote(sym: string): Observable<Quote> {
    return this.http.get<Quote>(this.APIURL + "/quote/" + sym);
  }
}
```

**Convenciones:**
- Variables y funciones: `camelCase`
- Clases: `PascalCase`
- Constantes: `UPPER_SNAKE_CASE`
- Archivos: `kebab-case.component.ts`
- Interfaces: `PascalCase` (sin prefijo I)
- Indentación: 2 espacios
- Comillas: Simples `'` preferentemente
- Punto y coma: Siempre

### JavaScript / Node.js

```javascript
// ✅ BIEN
const alphaVantageService = {
  async getQuote(symbol) {
    try {
      const response = await axios.get(/* ... */);
      return response.data;
    } catch (error) {
      console.error(`Error getting quote for ${symbol}:`, error);
      throw error;
    }
  }
};

// ❌ MAL
const alphaVantageService = {
  getQuote: function(symbol) {
    axios.get(/* ... */).then(function(response) {
      return response.data
    }).catch(function(error) {
      console.log(error)
    })
  }
}
```

### CSS / SCSS

```scss
// ✅ BIEN
.stock-card {
  padding: 1rem;
  border-radius: 0.5rem;
  
  &__title {
    font-size: 1.2rem;
    font-weight: 600;
  }
  
  &--highlighted {
    background-color: var(--color-primary);
  }
}

// ❌ MAL
.StockCard {
  padding: 16px;
  border-radius: 8px;
}

.StockCard .title {
  font-size: 1.2rem;
  font-weight: 600;
}
```

**Convenciones:**
- BEM para clases CSS
- Variables CSS para colores y tamaños
- Mobile-first approach
- Unidades rem/em preferentemente

## 📁 Estructura del Proyecto

### Frontend

```
src/app/
├── components/         # Componentes UI
│   ├── dashboard/
│   ├── stock-detail/
│   └── portfolio/
├── services/          # Servicios de negocio
│   ├── stock.service.ts
│   ├── auth.service.ts
│   └── firebase.service.ts
├── guards/            # Route guards
│   └── auth.guard.ts
├── models/            # Interfaces TypeScript
│   └── stock.model.ts
└── app.component.ts
```

### Backend

```
backend/
├── routes/            # Rutas de la API
│   └── alpha-vantage.routes.js
├── services/          # Lógica de negocio
│   └── alpha-vantage.service.js
├── middleware/        # Middlewares
│   └── error.middleware.js
└── server.js          # Punto de entrada
```

## 🧪 Testing

```bash
# Frontend
cd frontend
npm test

# Backend
cd backend
npm test
```

**Escribir tests para:**
- Nuevas funcionalidades
- Correcciones de bugs críticos
- Funciones puras/utilidades

## 📚 Recursos Útiles

- [Angular Style Guide](https://angular.io/guide/styleguide)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [BEM CSS Methodology](http://getbem.com/)

## ❓ Preguntas

Si tienes preguntas:

1. Revisa la [documentación](README.md)
2. Busca en [Issues cerrados](https://github.com/TU-USUARIO/burtsa/issues?q=is%3Aissue+is%3Aclosed)
3. Abre un nuevo issue con la etiqueta `question`

## 🎉 Reconocimientos

Todos los contribuidores serán reconocidos en el README.md

¡Gracias por contribuir a Burtsa! 🚀
