var dataLong = document.getElementById('dataLong')
var largoData = Number(dataLong.dataset.valor)


var dataBills = []
var mesBills = []
for (x = 0; x < largoData ; -- largoData) {
    var itino = 'consumo' + (largoData - 1)
    var billsData = document.getElementById(itino)
    var bills = billsData.dataset.valor
    dataBills.push(bills)
    var variable = '0' + largoData
    var billsMes = document.getElementById(variable)
    if (billsMes != null){
      mesBills.push(billsMes.dataset.valor)
    }
}

const meses = {
  '01': 'Enero',
  '02': 'Febrero',
  '03': 'Marzo',
  '04': 'Abril',
  '05': 'Mayo',
  '06': 'Junio'
}

console.log(meses['01'])

// Función para crear el gráfico
function createChart() {
  // Obtener el contexto del canvas para dibujar el gráfico
  const ctx = document.getElementById('graphConsumo').getContext('2d');

  // Configuración del gráfico
  const myChart = new Chart(ctx, {
      type: 'bar', // Tipo de gráfico (puede ser bar, line, pie, etc.)
      data: {

          labels: [meses[mesBills[5]], meses[mesBills[4]], meses[mesBills[3]], meses[mesBills[2]], meses[mesBills[1]], meses[mesBills[0]] ], // Etiquetas para el eje X
          datasets: [{
              label: 'Consumo en kw',
              data: dataBills, // Datos para el eje Y
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo de los barras
              borderColor: 'rgba(75, 192, 192, 1)', // Color de borde de las barras
              borderWidth: 1 // Ancho del borde
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true // Configura el eje Y para empezar en 0
              }
          }
      }
  });

  // Mostrar el gráfico
  myChart.render();
}

// Llamar a la función para crear el gráfico
createChart();
