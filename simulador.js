function simular() {
  const mercado = parseInt(document.getElementById('mercado').value);
  const precio = parseFloat(document.getElementById('precio').value);
  const penet = parseFloat(document.getElementById('penet').value) / 100;

  const escenarios = {
    "Pesimista": penet * 0.5,
    "Base": penet,
    "Optimista": penet * 1.5
  };

  const ingresos = Object.entries(escenarios).map(([nombre, penetracion]) => {
    return {
      label: nombre,
      valor: mercado * penetracion * precio
    };
  });

  const ctx = document.getElementById("grafico").getContext("2d");

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ingresos.map(i => i.label),
      datasets: [{
        label: 'Ingresos Proyectados ($)',
        data: ingresos.map(i => i.valor),
        backgroundColor: ['#e74c3c', '#3498db', '#2ecc71']
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: val => `$${val.toLocaleString()}`
          }
        }
      }
    }
  });
}
