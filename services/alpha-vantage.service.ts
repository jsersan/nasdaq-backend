import axios from 'axios';

class AlphaVantageService {
  private apiKey = 'CZURZGBONQG0ESPI';  // 👈 TU API KEY AQUÍ
  private baseURL = 'https://www.alphavantage.co/query';

  /**
   * Obtiene la cotización actual (Precio en vivo)
   */
  async getQuote(symbol: string) {
    try {
      const response = await axios.get(this.baseURL, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol: symbol,
          apikey: this.apiKey
        }
      });

      const quote = response.data['Global Quote'];
      
      return {
        symbol: quote['01. symbol'],
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
        volume: parseInt(quote['06. volume']),
        previousClose: parseFloat(quote['08. previous close']),
        open: parseFloat(quote['02. open']),
        high: parseFloat(quote['03. high']),
        low: parseFloat(quote['04. low'])
      };
    } catch (error) {
      console.error(`Error getting quote for ${symbol}:`, error);
      throw error;
    }
  }

  /**
   * Obtiene el histórico de precios para la gráfica
   */
  async getHistory(symbol: string, interval: string = 'daily') {
    try {
      const functionMap: { [key: string]: string } = {
        '1d': 'TIME_SERIES_INTRADAY',
        '1w': 'TIME_SERIES_DAILY',
        '1m': 'TIME_SERIES_DAILY',
        '3m': 'TIME_SERIES_DAILY',
        '1y': 'TIME_SERIES_DAILY',
        'daily': 'TIME_SERIES_DAILY'
      };

      const params: any = {
        function: functionMap[interval] || 'TIME_SERIES_DAILY',
        symbol: symbol,
        apikey: this.apiKey
      };

      // Si es intradiario, agregar intervalo
      if (params.function === 'TIME_SERIES_INTRADAY') {
        params.interval = '60min';
      }

      const response = await axios.get(this.baseURL, { params });

      // Mapear los datos al formato que espera el frontend
      const timeSeriesKey = Object.keys(response.data).find(key => 
        key.includes('Time Series')
      );

      if (!timeSeriesKey) {
        throw new Error('No time series data found');
      }

      const timeSeries = response.data[timeSeriesKey];
      
      return Object.entries(timeSeries).map(([date, values]: [string, any]) => ({
        date: date,
        open: parseFloat(values['1. open']),
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
        close: parseFloat(values['4. close']),
        volume: parseInt(values['5. volume'])
      })).reverse(); // Ordenar de más antiguo a más reciente

    } catch (error) {
      console.error(`Error getting history for ${symbol}:`, error);
      throw error;
    }
  }

  /**
   * Obtiene datos de un índice (ej: ^IXIC para NASDAQ)
   */
  async getIndex(symbol: string) {
    try {
      // Para índices, Alpha Vantage usa símbolos sin el ^
      const cleanSymbol = symbol.replace('^', '');
      
      const response = await axios.get(this.baseURL, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol: cleanSymbol,
          apikey: this.apiKey
        }
      });

      const quote = response.data['Global Quote'];
      
      return {
        name: cleanSymbol,
        symbol: symbol,
        value: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: parseFloat(quote['10. change percent'].replace('%', ''))
      };
    } catch (error) {
      console.error(`Error getting index for ${symbol}:`, error);
      throw error;
    }
  }
}

export default new AlphaVantageService();