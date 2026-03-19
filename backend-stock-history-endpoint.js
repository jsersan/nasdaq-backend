// ============================================
// ENDPOINT BACKEND PARA DATOS HISTÓRICOS
// ============================================
// Añadir a tu server.js o crear archivo separado

const express = require('express');
const router = express.Router();

/**
 * GET /api/stock/:symbol/history
 * Obtener datos históricos de una acción
 */
router.get('/api/stock/:symbol/history', async (req, res) => {
  try {
    const { symbol } = req.params;
    const days = parseInt(req.query.days) || 200;
    
    console.log(`📊 Solicitando histórico de ${symbol} para ${days} días`);

    // OPCIÓN 1: Usar Yahoo Finance (requiere yahoo-finance2)
    // const yahooFinance = require('yahoo-finance2').default;
    // const endDate = new Date();
    // const startDate = new Date();
    // startDate.setDate(startDate.getDate() - days);
    
    // const result = await yahooFinance.historical(symbol + '.MC', {
    //   period1: startDate,
    //   period2: endDate,
    //   interval: '1d'
    // });
    
    // const history = result.map(item => ({
    //   date: item.date.toISOString().split('T')[0],
    //   open: item.open,
    //   high: item.high,
    //   low: item.low,
    //   close: item.close,
    //   volume: item.volume
    // }));

    // OPCIÓN 2: Datos simulados para desarrollo
    const history = generateSimulatedHistory(symbol, days);

    res.json({
      success: true,
      symbol,
      days,
      dataPoints: history.length,
      history
    });

  } catch (error) {
    console.error('Error obteniendo histórico:', error);
    
    // Fallback a datos simulados
    const { symbol } = req.params;
    const days = parseInt(req.query.days) || 200;
    const history = generateSimulatedHistory(symbol, days);
    
    res.json({
      success: true,
      symbol,
      days,
      dataPoints: history.length,
      history,
      source: 'simulated'
    });
  }
});

/**
 * Generar datos históricos simulados
 */
function generateSimulatedHistory(symbol, days) {
  const history = [];
  
  // Precios base por símbolo (IBEX35)
  const basePrices = {
    'TELEFONICA': 4.20,
    'BBVA': 8.50,
    'SANTANDER': 4.10,
    'IBERDROLA': 11.50,
    'INDITEX': 45.80,
    'REPSOL': 13.20,
    'AMADEUS IT': 54.60,
    'CAIXABANK': 4.80,
    'NATURGY': 19.90,
    'ACCIONA': 209.80
  };
  
  let basePrice = basePrices[symbol.toUpperCase()] || 50.0;
  const volatility = 0.02; // 2% volatilidad diaria
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Tendencia general (ligeramente alcista)
    const trend = (days - i) * 0.001;
    
    // Ruido aleatorio
    const noise = (Math.random() - 0.5) * volatility * basePrice;
    
    // Precio de cierre
    const close = basePrice + trend + noise;
    
    // Calcular open, high, low basados en close
    const dailyRange = close * 0.015; // Rango del 1.5%
    const open = close + (Math.random() - 0.5) * dailyRange;
    const high = Math.max(open, close) + Math.random() * dailyRange * 0.5;
    const low = Math.min(open, close) - Math.random() * dailyRange * 0.5;
    
    // Volumen aleatorio
    const volume = Math.floor(Math.random() * 2000000) + 500000;
    
    history.push({
      date: date.toISOString().split('T')[0],
      open: parseFloat(open.toFixed(4)),
      high: parseFloat(high.toFixed(4)),
      low: parseFloat(low.toFixed(4)),
      close: parseFloat(close.toFixed(4)),
      volume
    });
    
    // Actualizar precio base para siguiente día
    basePrice = close;
  }
  
  return history;
}

/**
 * GET /api/stock/:symbol/indicators
 * Obtener indicadores técnicos calculados en el backend
 */
router.get('/api/stock/:symbol/indicators', async (req, res) => {
  try {
    const { symbol } = req.params;
    const days = parseInt(req.query.days) || 200;
    
    // Obtener histórico
    const history = generateSimulatedHistory(symbol, days);
    
    // Aquí podrías calcular los indicadores en el backend
    // Por ahora, dejamos que el frontend los calcule
    
    res.json({
      success: true,
      symbol,
      message: 'Use el servicio TechnicalIndicatorsService en el frontend para calcular',
      historyAvailable: true,
      dataPoints: history.length
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error obteniendo indicadores' });
  }
});

module.exports = router;

// ============================================
// INTEGRACIÓN EN server.js
// ============================================

/*
// En tu server.js principal:

const stockHistoryRoutes = require('./routes/stock-history'); // Ajusta la ruta
app.use(stockHistoryRoutes);

// O directamente:
app.get('/api/stock/:symbol/history', async (req, res) => {
  // ... código del endpoint aquí
});
*/