// test-yahoo-methods.js
// Script para probar qué métodos están disponibles en yahoo-finance2 v2.11.3

const yahooFinance = require('yahoo-finance2');

console.log('='.repeat(60));
console.log('MÉTODOS DISPONIBLES EN YAHOO-FINANCE2');
console.log('='.repeat(60));

// Listar todos los métodos disponibles
const methods = Object.keys(yahooFinance).filter(key => {
  return typeof yahooFinance[key] === 'function';
});

console.log('\n📋 Métodos disponibles:');
methods.forEach((method, index) => {
  console.log(`${index + 1}. ${method}`);
});

console.log('\n' + '='.repeat(60));
console.log('PROBANDO MÉTODOS PARA DATOS HISTÓRICOS');
console.log('='.repeat(60));

async function testHistoricalMethods() {
  const ticker = 'AAPL';
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-12-31');

  // Método 1: Intentar 'historical'
  console.log('\n1️⃣ Probando: yahooFinance.historical()');
  try {
    if (typeof yahooFinance.historical === 'function') {
      const result = await yahooFinance.historical(ticker, {
        period1: startDate,
        period2: endDate,
        interval: '1d'
      });
      console.log('   ✅ FUNCIONA! Registros:', result.length);
      console.log('   Primer registro:', result[0]);
    } else {
      console.log('   ❌ Método no existe');
    }
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }

  // Método 2: Intentar '_chart' (método interno)
  console.log('\n2️⃣ Probando: yahooFinance._chart()');
  try {
    if (typeof yahooFinance._chart === 'function') {
      const result = await yahooFinance._chart(ticker, {
        period1: startDate,
        period2: endDate,
        interval: '1d'
      });
      console.log('   ✅ FUNCIONA! Registros:', result.quotes?.length || 0);
      console.log('   Primer registro:', result.quotes?.[0]);
    } else {
      console.log('   ❌ Método no existe');
    }
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }

  // Método 3: Intentar 'chart'
  console.log('\n3️⃣ Probando: yahooFinance.chart()');
  try {
    if (typeof yahooFinance.chart === 'function') {
      const result = await yahooFinance.chart(ticker, {
        period1: startDate,
        period2: endDate,
        interval: '1d'
      });
      console.log('   ✅ FUNCIONA! Registros:', result.quotes?.length || 0);
      console.log('   Primer registro:', result.quotes?.[0]);
    } else {
      console.log('   ❌ Método no existe');
    }
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }

  // Método 4: Intentar 'quoteSummary' con módulo chart
  console.log('\n4️⃣ Probando: yahooFinance.quoteSummary() con chart');
  try {
    if (typeof yahooFinance.quoteSummary === 'function') {
      const result = await yahooFinance.quoteSummary(ticker, {
        modules: ['chart']
      });
      console.log('   ✅ FUNCIONA!');
      console.log('   Resultado:', JSON.stringify(result, null, 2).substring(0, 200));
    } else {
      console.log('   ❌ Método no existe');
    }
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }

  // Método 5: Probar quote (que sabemos que funciona)
  console.log('\n5️⃣ Probando: yahooFinance.quote() (control)');
  try {
    const result = await yahooFinance.quote(ticker);
    console.log('   ✅ FUNCIONA! Precio:', result.regularMarketPrice);
  } catch (error) {
    console.log('   ❌ Error:', error.message);
  }
}

testHistoricalMethods().then(() => {
  console.log('\n' + '='.repeat(60));
  console.log('PRUEBAS COMPLETADAS');
  console.log('='.repeat(60));
}).catch(err => {
  console.error('Error general:', err);
});