const express = require('express');
const axios = require('axios');

const router = express.Router();

// ============================================
// CONFIGURACIÓN ALPHA VANTAGE
// ============================================
const ALPHA_VANTAGE_API_KEY = 'CZURZGBONQG0ESPI';
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';

// ============================================
// GET /api/alpha-vantage/quote/:symbol
// ============================================
router.get('/quote/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    
    const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: symbol,
        apikey: ALPHA_VANTAGE_API_KEY
      }
    });

    const quote = response.data['Global Quote'];
    
    if (!quote || Object.keys(quote).length === 0) {
      return res.status(404).json({ error: 'Símbolo no encontrado' });
    }

    res.json({
      symbol: quote['01. symbol'],
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
      volume: parseInt(quote['06. volume']),
      previousClose: parseFloat(quote['08. previous close']),
      open: parseFloat(quote['02. open']),
      high: parseFloat(quote['03. high']),
      low: parseFloat(quote['04. low'])
    });

    console.log(`✅ Alpha Vantage Quote ${symbol}: ${quote['05. price']}`);
  } catch (error) {
    console.error('❌ Error in /quote/:symbol:', error.message);
    res.status(500).json({ error: 'Failed to fetch quote from Alpha Vantage' });
  }
});

// ============================================
// GET /api/alpha-vantage/history/:symbol
// ============================================
router.get('/history/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const { interval = 'daily' } = req.query;

    const params = {
      function: 'TIME_SERIES_DAILY',
      symbol: symbol,
      apikey: ALPHA_VANTAGE_API_KEY,
      outputsize: 'full' // Para obtener más de 100 días
    };

    const response = await axios.get(ALPHA_VANTAGE_BASE_URL, { params });

    const timeSeries = response.data['Time Series (Daily)'];
    
    if (!timeSeries) {
      return res.status(404).json({ error: 'No se encontraron datos históricos' });
    }

    const history = Object.entries(timeSeries).map(([date, values]) => ({
      date: date,
      open: parseFloat(values['1. open']),
      high: parseFloat(values['2. high']),
      low: parseFloat(values['3. low']),
      close: parseFloat(values['4. close']),
      price: parseFloat(values['4. close']),
      volume: parseInt(values['5. volume'])
    })).reverse(); // Ordenar de más antiguo a más reciente

    console.log(`✅ Alpha Vantage History ${symbol}: ${history.length} registros`);
    res.json(history);
  } catch (error) {
    console.error('❌ Error in /history/:symbol:', error.message);
    res.status(500).json({ error: 'Failed to fetch history from Alpha Vantage' });
  }
});

// ============================================
// GET /api/alpha-vantage/index/:symbol
// ============================================
router.get('/index/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    // Para índices, Alpha Vantage usa símbolos sin el ^
    const cleanSymbol = symbol.replace('^', '');
    
    const response = await axios.get(ALPHA_VANTAGE_BASE_URL, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: cleanSymbol,
        apikey: ALPHA_VANTAGE_API_KEY
      }
    });

    const quote = response.data['Global Quote'];
    
    if (!quote || Object.keys(quote).length === 0) {
      return res.status(404).json({ error: 'Índice no encontrado' });
    }

    res.json({
      name: cleanSymbol,
      symbol: symbol,
      value: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', ''))
    });

    console.log(`✅ Alpha Vantage Index ${symbol}: ${quote['05. price']}`);
  } catch (error) {
    console.error('❌ Error in /index/:symbol:', error.message);
    res.status(500).json({ error: 'Failed to fetch index from Alpha Vantage' });
  }
});

module.exports = router;