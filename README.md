# 📈 Burtsa - Aplicación de Cotizaciones NASDAQ

> Plataforma web en tiempo real para seguimiento de cotizaciones del mercado de valores IBEX 35 y NASDAQ, desarrollada con Angular y Node.js.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Angular](https://img.shields.io/badge/Angular-20.x-red.svg)](https://angular.io/)
[![Firebase](https://img.shields.io/badge/Firebase-Ready-orange.svg)](https://firebase.google.com/)

## 🌟 Características

- **📊 Cotizaciones en tiempo real** - Datos actualizados de acciones del IBEX 35 y mercados internacionales
- **📈 Gráficos interactivos** - Visualización histórica de precios con múltiples intervalos temporales
- **🔥 Firebase Authentication** - Sistema de autenticación seguro con Google
- **💼 Portfolio personal** - Gestión de cartera de inversiones con seguimiento de rendimiento
- **🎯 Watchlist personalizada** - Seguimiento de tus acciones favoritas
- **📱 Diseño responsive** - Optimizado para desktop, tablet y móvil
- **🌐 Múltiples fuentes de datos** - Integración con Alpha Vantage y datos mock para desarrollo
- **⚡ PWA Ready** - Funcionalidad Progressive Web App

## 🎯 Demo en Vivo

- **Frontend**: [https://burtsa.netlify.app](https://burtsa.netlify.app)
- **Backend API**: `https://tu-backend.onrender.com` *(configurar tu URL)*

## 🏗️ Arquitectura del Proyecto

```
burtsa/
├── frontend/                 # Aplicación Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/  # Componentes de UI
│   │   │   ├── services/    # Servicios de API y lógica de negocio
│   │   │   ├── guards/      # Guards de autenticación
│   │   │   └── models/      # Interfaces TypeScript
│   │   ├── environments/    # Configuración de entornos
│   │   └── assets/          # Recursos estáticos
│   └── angular.json
│
└── backend/                  # API Node.js + Express
    ├── server.js            # Servidor principal
    ├── routes/              # Rutas de la API
    │   └── alpha-vantage.routes.js
    └── package.json
```

## 🚀 Tecnologías Utilizadas

### Frontend
- **Framework**: Angular 20.x
- **Lenguaje**: TypeScript 5.x
- **Gráficos**: Chart.js / Recharts
- **Autenticación**: Firebase Authentication
- **Base de datos**: Cloud Firestore
- **Estilos**: CSS3 + SCSS
- **Build**: Angular CLI

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **HTTP Client**: Axios
- **CORS**: cors middleware
- **Entorno**: dotenv

### APIs Externas
- **Alpha Vantage** - Datos de mercado en tiempo real
- **Firebase** - Autenticación y base de datos

### DevOps
- **Frontend Hosting**: Netlify
- **Backend Hosting**: Render.com
- **Version Control**: Git + GitHub
- **CI/CD**: Netlify Auto-deploy

## 📦 Instalación y Configuración

### Prerrequisitos

```bash
node -v  # v18.0.0 o superior
npm -v   # v9.0.0 o superior
```

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/TU-USUARIO/burtsa.git
cd burtsa
```

### 2️⃣ Configurar el Backend

```bash
cd backend
npm install
```

Crea un archivo `.env` (opcional):

```env
PORT=3000
NODE_ENV=development
ALPHA_VANTAGE_API_KEY=TU_API_KEY
```

Inicia el servidor:

```bash
npm start
```

El backend estará corriendo en `http://localhost:3000`

### 3️⃣ Configurar el Frontend

```bash
cd frontend
npm install
```

Configura tus credenciales en `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  
  firebase: {
    apiKey: "TU_FIREBASE_API_KEY",
    authDomain: "TU_PROYECTO.firebaseapp.com",
    projectId: "TU_PROYECTO",
    storageBucket: "TU_PROYECTO.firebasestorage.app",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
  },
  
  alphaVantage: {
    enabled: true,
    apiKey: 'TU_ALPHA_VANTAGE_KEY',
    backendUrl: 'http://localhost:3000/api/alpha-vantage'
  },
  
  useMockData: false,
  activeAPI: 'alphaVantage'
};
```

Inicia la aplicación:

```bash
npm start
# o
ng serve
```

La aplicación estará disponible en `http://localhost:4200`

## 🔑 Obtener API Keys

### Alpha Vantage (Datos de mercado)

1. Ve a [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Rellena el formulario
3. Recibirás tu API key al instante
4. **Límites FREE**: 25 llamadas/día, 5 llamadas/minuto

### Firebase (Autenticación)

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Activa **Authentication** → **Google Sign-In**
4. Activa **Cloud Firestore**
5. Copia las credenciales de configuración

## 📡 Endpoints de la API

### Datos Mock (Desarrollo)

```bash
# Obtener cotización de una acción
GET /api/quote/:ticker
# Ejemplo: GET /api/quote/SAN.MC

# Obtener histórico de precios
GET /api/history/:ticker
# Ejemplo: GET /api/history/BBVA.MC

# Obtener datos de índice
GET /api/index/:symbol
# Ejemplo: GET /api/index/IBEX
```

### Datos Reales (Alpha Vantage)

```bash
# Obtener cotización en tiempo real
GET /api/alpha-vantage/quote/:symbol
# Ejemplo: GET /api/alpha-vantage/quote/AAPL

# Obtener histórico completo
GET /api/alpha-vantage/history/:symbol?interval=daily
# Ejemplo: GET /api/alpha-vantage/history/MSFT?interval=daily

# Obtener datos de índice
GET /api/alpha-vantage/index/:symbol
# Ejemplo: GET /api/alpha-vantage/index/^IXIC
```

### Health Check

```bash
GET /health
# Respuesta: { status: "OK", uptime: 12345, timestamp: "..." }
```

## 🌐 Despliegue en Producción

### Backend (Render.com)

1. Sube tu código a GitHub
2. Crea una cuenta en [Render.com](https://render.com)
3. Conecta tu repositorio
4. Configura el Web Service:
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Variables de entorno**:
     - `NODE_ENV=production`
     - `ALPHA_VANTAGE_API_KEY=tu_key`

5. Despliega automáticamente

### Frontend (Netlify)

1. Crea una cuenta en [Netlify](https://netlify.com)
2. Conecta tu repositorio de GitHub
3. Configura el build:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist/browser`

4. Actualiza `environment.prod.ts` con la URL de tu backend en Render
5. Despliega automáticamente

## 🎨 Capturas de Pantalla

### Dashboard Principal
*Vista general del mercado con cotizaciones en tiempo real*

### Detalle de Acción
*Gráfico interactivo con histórico de precios y análisis técnico*

### Portfolio
*Gestión de cartera con rendimiento en tiempo real*

## 🔧 Scripts Disponibles

### Frontend

```bash
npm start           # Inicia servidor de desarrollo
npm run build       # Build para producción
npm test            # Ejecuta tests unitarios
npm run lint        # Linting del código
```

### Backend

```bash
npm start           # Inicia el servidor
npm run dev         # Modo desarrollo con nodemon
```

## 📝 Variables de Entorno

### Backend `.env`

```env
# Puerto del servidor
PORT=3000

# Entorno
NODE_ENV=development

# Alpha Vantage API
ALPHA_VANTAGE_API_KEY=tu_api_key_aqui
```

### Frontend `environment.ts`

```typescript
{
  production: false,
  firebase: { /* credenciales */ },
  alphaVantage: {
    enabled: true,
    apiKey: 'tu_key',
    backendUrl: 'http://localhost:3000/api/alpha-vantage'
  },
  useMockData: false,  // true = datos mock, false = API real
  activeAPI: 'alphaVantage'
}
```

## 🛡️ Seguridad

- ✅ **Firebase Authentication** - Autenticación segura
- ✅ **CORS configurado** - Protección contra peticiones no autorizadas
- ✅ **Variables de entorno** - API keys protegidas
- ✅ **HTTPS** - Comunicación cifrada en producción
- ✅ **Firestore Rules** - Reglas de seguridad en base de datos

## 🐛 Debugging y Logs

### Logs del Backend

```bash
# Ver logs en tiempo real
tail -f server.log

# Render.com → Dashboard → Logs
```

### Errores Comunes

**Error: "CORS not allowed"**
- Solución: Agrega tu dominio a `allowedOrigins` en `server.js`

**Error: "API key limit exceeded"**
- Solución: Activa `useMockData: true` o espera a que se reinicie el límite diario

**Error: "Firebase not initialized"**
- Solución: Verifica las credenciales en `environment.ts`

## 📊 Roadmap

- [ ] Integración con más mercados (NYSE, Crypto)
- [ ] Sistema de alertas por precio
- [ ] Análisis técnico avanzado (RSI, MACD, Bollinger)
- [ ] Comparador de activos
- [ ] Exportación de datos (CSV, PDF)
- [ ] Modo oscuro
- [ ] Notificaciones push (PWA)
- [ ] Backtesting de estrategias

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Txema Serrano**

- Website: [txemaserrano.com](https://www.txemaserrano.com)
- GitHub: [@TU-USUARIO](https://github.com/TU-USUARIO)

## 🙏 Agradecimientos

- [Alpha Vantage](https://www.alphavantage.co/) - API de datos financieros
- [Firebase](https://firebase.google.com/) - Backend as a Service
- [Angular](https://angular.io/) - Framework de desarrollo
- [Chart.js](https://www.chartjs.org/) - Librería de gráficos

## 📞 Soporte

Si tienes alguna pregunta o problema:

- 📧 Email: tu@email.com
- 🐛 Issues: [GitHub Issues](https://github.com/TU-USUARIO/burtsa/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/TU-USUARIO/burtsa/discussions)

---

⭐ Si este proyecto te ha sido útil, dale una estrella en GitHub!

**Hecho con ❤️ en España** 
