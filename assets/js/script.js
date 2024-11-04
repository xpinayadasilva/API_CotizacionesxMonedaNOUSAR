const montoCLP = document.getElementById('montoCLP');
const tipoMoneda = document.getElementById('tipoMoneda');
const btnBuscar = document.getElementById('btnBuscar');
const resultado = document.getElementById('resultado');
const graficaIndicador = document.getElementById('graficaMoneda');

//Obtiene las monedas de la API
async function obtenerMonedas() {
    try {
      const response = await fetch('https://mindicador.cl/api');
      const data = await response.json();      
      return data;     
    } catch (error) {  
      alert("No se pudo conectar con el servidor, intente mas tarde");
      return false;  
    }
  }

//Carga el select con las monedas
async function cargarTiposMonedas() {
  const monedas = await obtenerMonedas();
  if (!monedas) {
    return;
  }
  Object.values(monedas)
  .slice(3)
  .forEach((moneda) => {
      tipoMoneda.innerHTML += `<option value="${moneda.codigo}">${moneda.nombre}</option>`;
  })  
};

async function  obtenerValorTipoMoneda  (tipoMoneda)  {
  const data = await obtenerMonedas();
  if (!data) {
    return "false";
  }
  const { [tipoMoneda]: { valor } } = data;
  return valor;
}
       
//Valida que se haya colocado un valor mayor a cero
function validarInput(input) {
  let valor = parseFloat(input.value);

  if (Number.isInteger(valor) && valor > 0) {    
    return true;
  } else {     
    return false;
  }
}


//Convierte el monto a la moneda seleccionada
btnBuscar.addEventListener('click', async () => {
  let importe = parseFloat(montoCLP.value);  
  if (validarInput(montoCLP)) {
    const valorTipoMoneda = await obtenerValorTipoMoneda(tipoMoneda.value);    
    if (valorTipoMoneda != "false") {
      resultado.innerHTML = 'Resultado: $' + (montoCLP.value / valorTipoMoneda).toFixed(2);
      await renderizarGraficaIndicador();
    }
    montoCLP.value = '';   

  } else {    
    montoCLP.value = '';
    alert('Por favor introduzca un importe mayor a cero');
  }
})

function prepararConfiguracionParaLaGrafica(monedas) {
    // Creamos las variables necesarias para el objeto de configuración
    const tipoDeGrafica = "line";
    const nombresDeLasMonedas = monedas.map((moneda) => moneda.Codigo);
    const titulo = "Monedas";
    const colorDeLinea = "red";
    const valores = monedas.map((moneda) => {
    const valor = moneda.Valor.replace(",", ".");
    alert('prepara chart');
    return Number(valor);
    })
    // Creamos el objeto de configuración usando las variables anteriores
    const config = {
    type: tipoDeGrafica,
    data: {
    labels: nombresDeLasMonedas,
    datasets: [
        {
            label: titulo,
            backgroundColor: colorDeLinea,
            data: valores
        }
        ]
    }
}
return config;
}        

async function renderGrafica() {
    const monedas = await obtenerMonedas();
    const config = prepararConfiguracionParaLaGrafica(monedas);
    const chartDOM = document.getElementById("myChart");
    new Chart(chartDOM, config);
    alert('chart');
}

obtenerMonedas();
cargarTiposMonedas();
renderGrafica();
