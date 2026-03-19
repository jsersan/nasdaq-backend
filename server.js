const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// CONFIGURACIÓN DE CORS
// ============================================
const allowedOrigins = [
  'http://localhost:4200',
  'https://burtsa.netlify.app',
  'https://www.txemaserrano.com',
  'http://www.txemaserrano.com',
  'https://txemaserrano.com',
  'http://txemaserrano.com'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS no permitido'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ============================================
// DATOS ACTUALIZADOS (15 marzo 2026)
// ============================================
const stockData = {
  'ANA.MC': { price: 216.40, change: 0.60, changePercent: 0.28, volume: 36000, previousClose: 215.80, dayHigh: 222.60, dayLow: 212.40, name: 'ACCIONA' },
  'ANE.MC': { price: 20.80, change: 0.10, changePercent: 0.48, volume: 234000, previousClose: 20.70, dayHigh: 21.16, dayLow: 20.32, name: 'ACCIONA ENERGÍA' },
  'ACX.MC': { price: 11.90, change: -0.22, changePercent: -1.82, volume: 905000, previousClose: 12.12, dayHigh: 12.10, dayLow: 11.80, name: 'ACERINOX' },
  'ACS.MC': { price: 103.30, change: -2.00, changePercent: -1.90, volume: 123000, previousClose: 105.30, dayHigh: 105.30, dayLow: 102.90, name: 'ACS' },
  'REP.MC': { price: 23.00, change: 0.75, changePercent: 3.28, volume: 8000000, previousClose: 22.25, dayHigh: 23.10, dayLow: 22.20, name: 'REPSOL' },
  'NTGY.MC': { price: 24.96, change: 0.44, changePercent: 1.79, volume: 2000000, previousClose: 24.52, dayHigh: 25.02, dayLow: 24.66, name: 'NATURGY' },
  'IBE.MC': { price: 19.805, change: 0.265, changePercent: 1.36, volume: 8000000, previousClose: 19.540, dayHigh: 19.975, dayLow: 19.450, name: 'IBERDROLA' },
  'ITX.MC': { price: 51.62, change: -0.96, changePercent: -1.83, volume: 2000000, previousClose: 52.58, dayHigh: 52.62, dayLow: 50.96, name: 'INDITEX' },
  'SAN.MC': { price: 9.582, change: -0.119, changePercent: -1.23, volume: 42000000, previousClose: 9.701, dayHigh: 9.821, dayLow: 9.364, name: 'SANTANDER' },
  'BBVA.MC': { price: 18.010, change: -0.175, changePercent: -0.96, volume: 11000000, previousClose: 18.185, dayHigh: 18.375, dayLow: 17.745, name: 'BBVA' },
  'TEF.MC': { price: 3.671, change: 0.103, changePercent: 2.89, volume: 17000000, previousClose: 3.568, dayHigh: 3.671, dayLow: 3.568, name: 'TELEFONICA' }
};

// ============================================
// ENDPOINTS
// ============================================

app.get('/api/quote/:ticker', (req, res) => {
  const { ticker } = req.params;
  const data = stockData[ticker];
  
  if (!data) {
    return res.status(404).json({ error: 'Símbolo no encontrado' });
  }

  res.json({
    c: data.price,
    d: data.change,
    dp: data.changePercent,
    h: data.dayHigh,
    l: data.dayLow,
    pc: data.previousClose,
    t: Math.floor(Date.now() / 1000),
    volume: data.volume
  });

  console.log(`✅ Quote ${ticker}: ${data.price}€`);
});

app.get('/api/history/:ticker', (req, res) => {
  const { ticker } = req.params;
  const data = stockData[ticker];
  
  if (!data) {
    return res.status(404).json({ error: 'Símbolo no encontrado' });
  }

  // Generar histórico de 1 año
  const history = generateHistoricalData(data.price);
  console.log(`✅ History ${ticker}: ${history.length} registros`);
  res.json(history);
});

app.get('/api/index/:symbol', (req, res) => {
  res.json({
    name: 'IBEX 35',
    value: 17059,
    change: -80,
    changePercent: -0.47,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/euribor/current', (req, res) => {
  res.json({ 
    rate: 2.858, 
    date: new Date().toISOString().split('T')[0] 
  });
});

// ============================================
// RUTAS ALPHA VANTAGE
// ============================================
const alphaVantageRoutes = require('./routes/alpha-vantage.routes');
app.use('/api/alpha-vantage', alphaVantageRoutes);

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({ 
    name: 'Burtsa Backend API', 
    version: '6.0.0 - Mock Data',
    mode: 'Mock (datos actualizados 15 marzo 2026)',
    note: 'Sin dependencias de APIs externas',
    endpoints: {
      quote: '/api/quote/:ticker',
      history: '/api/history/:ticker',
      index: '/api/index/:symbol'
    }
  });
});

// ============================================
// FUNCIONES AUXILIARES
// ============================================

function generateHistoricalData(currentPrice) {
  const history = [];
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  let price = currentPrice * 0.80; // Precio hace 1 año
  const currentDate = new Date(oneYearAgo);

  while (currentDate <= today) {
    const dayOfWeek = currentDate.getDay();
    
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const trend = 0.0003;
      const volatility = (Math.random() - 0.5) * 0.04;
      price = price * (1 + trend + volatility);
      
      const high = price * (1 + Math.random() * 0.01);
      const low = price * (1 - Math.random() * 0.01);
      
      history.push({
        date: currentDate.toISOString().split('T')[0],
        price: parseFloat(price.toFixed(4)),
        close: parseFloat(price.toFixed(4)),
        high: parseFloat(high.toFixed(4)),
        low: parseFloat(low.toFixed(4)),
        volume: Math.floor(Math.random() * 5000000) + 1000000
      });
    }
    
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return history;
}

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, '0.0.0.0', () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 BACKEND BURTSA - MODO MOCK');
  console.log('='.repeat(60));
  console.log(`📍 Puerto: ${PORT}`);
  console.log(`💾 Datos: Mock actualizados (15 marzo 2026)`);
  console.log(`💰 Coste: GRATIS (sin APIs externas)`);
  console.log(`⏰ ${new Date().toISOString()}`);
  console.log('\n📊 ENDPOINTS:');
  console.log('   ✅ /api/quote/:ticker');
  console.log('   ✅ /api/history/:ticker');
  console.log('   ✅ /api/index/:symbol');
  console.log('\n🌐 CORS permitido:');
  allowedOrigins.forEach(origin => console.log(`   - ${origin}`));
  console.log('\n✅ Listo para desarrollo y demos');
  console.log('='.repeat(60) + '\n');
});

process.on('unhandledRejection', (reason) => {
  console.error('❌ Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});