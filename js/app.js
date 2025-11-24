// Datasets de tickets para simulación
const dataSets = {
  pequeño: [
    { id: 'T001', titulo: 'Error en login', urgencia: 4, impacto: 3, tiempoEst: 2.5 },
    { id: 'T002', titulo: 'Actualización de perfil', urgencia: 2, impacto: 2, tiempoEst: 1.0 },
    { id: 'T003', titulo: 'Sistema caído', urgencia: 5, impacto: 5, tiempoEst: 4.0 },
    { id: 'T004', titulo: 'Cambio de contraseña', urgencia: 3, impacto: 2, tiempoEst: 0.5 },
    { id: 'T005', titulo: 'Reporte de ventas', urgencia: 2, impacto: 4, tiempoEst: 3.0 }
  ],
  mediano: [
    { id: 'T001', titulo: 'Error en login', urgencia: 4, impacto: 3, tiempoEst: 2.5 },
    { id: 'T002', titulo: 'Actualización de perfil', urgencia: 2, impacto: 2, tiempoEst: 1.0 },
    { id: 'T003', titulo: 'Sistema caído', urgencia: 5, impacto: 5, tiempoEst: 4.0 },
    { id: 'T004', titulo: 'Cambio de contraseña', urgencia: 3, impacto: 2, tiempoEst: 0.5 },
    { id: 'T005', titulo: 'Reporte de ventas', urgencia: 2, impacto: 4, tiempoEst: 3.0 },
    { id: 'T006', titulo: 'Pérdida de datos', urgencia: 5, impacto: 5, tiempoEst: 5.0 },
    { id: 'T007', titulo: 'Mejora en UI', urgencia: 1, impacto: 3, tiempoEst: 2.0 },
    { id: 'T008', titulo: 'Backup automático', urgencia: 3, impacto: 4, tiempoEst: 3.5 }
  ],
  grande: [
    { id: 'T001', titulo: 'Error en login', urgencia: 4, impacto: 3, tiempoEst: 2.5 },
    { id: 'T002', titulo: 'Actualización de perfil', urgencia: 2, impacto: 2, tiempoEst: 1.0 },
    { id: 'T003', titulo: 'Sistema caído', urgencia: 5, impacto: 5, tiempoEst: 4.0 },
    { id: 'T004', titulo: 'Cambio de contraseña', urgencia: 3, impacto: 2, tiempoEst: 0.5 },
    { id: 'T005', titulo: 'Reporte de ventas', urgencia: 2, impacto: 4, tiempoEst: 3.0 },
    { id: 'T006', titulo: 'Pérdida de datos', urgencia: 5, impacto: 5, tiempoEst: 5.0 },
    { id: 'T007', titulo: 'Mejora en UI', urgencia: 1, impacto: 3, tiempoEst: 2.0 },
    { id: 'T008', titulo: 'Backup automático', urgencia: 3, impacto: 4, tiempoEst: 3.5 },
    { id: 'T009', titulo: 'Vulnerabilidad crítica', urgencia: 5, impacto: 5, tiempoEst: 6.0 },
    { id: 'T010', titulo: 'Optimización de consultas', urgencia: 3, impacto: 4, tiempoEst: 4.0 },
    { id: 'T011', titulo: 'Nueva funcionalidad', urgencia: 2, impacto: 3, tiempoEst: 5.0 },
    { id: 'T012', titulo: 'Corrección de bugs menores', urgencia: 1, impacto: 1, tiempoEst: 1.5 }
  ]
};

// Estado global de la aplicación
const state = {
  tickets: [],
  queue: [],
  processed: [],
  currentTicket: null,
  selectedDataSet: 'pequeño',
  metrics: {
    tiempoTotal: 0,
    ticketsAtendidos: 0,
    tiempoPromedio: 0,
    criticosAtendidos: 0,
    startTime: null,
    endTime: null
  },
  isRunning: false,
  autoInterval: null
};

// Inicializar con el dataset pequeño por defecto
state.tickets = [...dataSets[state.selectedDataSet]];

// Calcula la prioridad ponderada: (Urgencia × 0.6) + (Impacto × 0.4)
function calcularPrioridad(ticket) {
  // Combina urgencia e impacto aplicando un peso mayor a la urgencia.
  // Retorna un valor numérico entre 1.0 y 5.0 aproximadamente.
  return (ticket.urgencia * 0.6) + (ticket.impacto * 0.4);
}

// Ordena los tickets por prioridad de mayor a menor (Algoritmo Greedy)
function inicializarCola() {
  // Copia los tickets, calcula su prioridad y los ordena de mayor a menor.
  state.queue = [...state.tickets]
    .map(t => ({ ...t, prioridad: calcularPrioridad(t) }))
    .sort((a, b) => b.prioridad - a.prioridad);
  
  // Reinicia el historial de tickets procesados
  state.processed = [];
  state.currentTicket = null;

  // Reinicia las métricas de rendimiento
  state.metrics = {
    tiempoTotal: 0,
    ticketsAtendidos: 0,
    tiempoPromedio: 0,
    criticosAtendidos: 0,
    startTime: Date.now(),  // Marca inicio de ejecución
    endTime: null
  };

  // Actualiza la interfaz y botones
  actualizarUI();
  habilitarBotones();
}

// Procesa el ticket con mayor prioridad (primero de la cola)
function procesarSiguiente() {
  // Si no hay más tickets, detener modo auto y finalizar
  if (state.queue.length === 0) {
    detenerAuto();
    state.metrics.endTime = Date.now();
    actualizarUI();
    return;
  }

  // Obtiene el ticket más prioritario (posición 0)
  const siguiente = state.queue[0];
  state.currentTicket = siguiente;

  actualizarUI();

  // Simula tiempo de procesamiento (animación visual)
  setTimeout(() => {
    // Remueve ticket de la cola
    state.queue = state.queue.slice(1);

    // Lo agrega al historial de procesados
    state.processed.push(siguiente);
    state.currentTicket = null;

    // Actualiza métricas
    state.metrics.tiempoTotal += siguiente.tiempoEst;
    state.metrics.ticketsAtendidos = state.processed.length;
    state.metrics.tiempoPromedio = state.metrics.tiempoTotal / state.metrics.ticketsAtendidos;

    // Cuenta cuántos tickets críticos fueron atendidos
    state.metrics.criticosAtendidos += (siguiente.urgencia >= 4 ? 1 : 0);

    // Si no quedan tickets en cola, se marca fin de algoritmo
    if (state.queue.length === 0) {
      state.metrics.endTime = Date.now();
      detenerAuto();
    }

    actualizarUI();
    habilitarBotones();

  }, 1000); // Tiempo visual de procesamiento
}

// Cambia el dataset actual y reinicia la simulación
function cambiarDataSet(nombre) {
  // Cambia el dataset seleccionado
  state.selectedDataSet = nombre;
  state.tickets = [...dataSets[nombre]];

  // Reinicia todo
  reiniciar();
  
  // Actualiza estilo visual del botón seleccionado
  document.querySelectorAll('.btn-dataset').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.set === nombre) {
      btn.classList.add('active');
    }
  });
}

// Retorna la clase CSS basada en prioridad (para color del borde)
function getPrioridadClass(prioridad) {
  if (prioridad >= 4.5) return 'critical';
  if (prioridad >= 3.5) return 'high';
  if (prioridad >= 2.5) return 'medium';
  return 'low';
}

// Retorna la clase CSS basada en prioridad (para color de fondo)
function getPrioridadColorClass(prioridad) {
  if (prioridad >= 4.5) return 'bg-critical';
  if (prioridad >= 3.5) return 'bg-high';
  if (prioridad >= 2.5) return 'bg-medium';
  return 'bg-low';
}

// Reinicia toda la simulación
function reiniciar() {
  // Detiene modo automático
  detenerAuto();

  // Limpia listas y variables
  state.queue = [];
  state.processed = [];
  state.currentTicket = null;

  // Reinicia métricas
  state.metrics = {
    tiempoTotal: 0,
    ticketsAtendidos: 0,
    tiempoPromedio: 0,
    criticosAtendidos: 0,
    startTime: null,
    endTime: null
  };

  actualizarUI();
  habilitarBotones();
}

// Alterna entre activar o pausar el modo automático
function toggleAuto() {
  if (state.isRunning) {
    detenerAuto();
  } else {
    iniciarAuto();
  }
}

// Ejecuta el procesamiento automático cada 1.5 segundos
function iniciarAuto() {
  // No inicia si ya no hay tickets
  if (state.queue.length === 0) return;
  
  state.isRunning = true;
  document.getElementById('btnAuto').textContent = '⏸️ Pausar';
  
  // Ejecuta procesamiento repetidamente
  state.autoInterval = setInterval(() => {
    if (state.queue.length > 0 && !state.currentTicket) {
      procesarSiguiente();
    } else if (state.queue.length === 0) {
      detenerAuto();
    }
  }, 1500);
}

// Detiene el procesamiento automático
function detenerAuto() {
  state.isRunning = false;

  // Limpia intervalo
  if (state.autoInterval) {
    clearInterval(state.autoInterval);
    state.autoInterval = null;
  }

  // Cambia texto del botón
  document.getElementById('btnAuto').textContent = '▶️ Auto';
}

// Activa o desactiva botones según el estado actual
function habilitarBotones() {
  const btnIniciar = document.getElementById('btnIniciar');
  const btnSiguiente = document.getElementById('btnSiguiente');
  const btnAuto = document.getElementById('btnAuto');

  const tieneTickets = state.tickets.length > 0;
  const colaIniciada = state.queue.length > 0 || state.processed.length > 0;
  const hayPendientes = state.queue.length > 0;

  // Iniciar se bloquea si ya se inició
  btnIniciar.disabled = !tieneTickets || (colaIniciada && hayPendientes);

  // Siguiente solo si hay tickets pendientes
  btnSiguiente.disabled = !hayPendientes;

  // Auto solo si hay tickets pendientes
  btnAuto.disabled = !hayPendientes;
}

// Actualiza toda la UI: métricas, tickets, animación y resultados
function actualizarUI() {
  // Actualiza métricas en pantalla
  document.getElementById('tiempoTotal').textContent = state.metrics.tiempoTotal.toFixed(1) + 'h';
  document.getElementById('atendidos').textContent = `${state.metrics.ticketsAtendidos}/${state.tickets.length}`;
  document.getElementById('tiempoPromedio').textContent = (state.metrics.tiempoPromedio || 0).toFixed(1) + 'h';
  document.getElementById('criticos').textContent = state.metrics.criticosAtendidos;

  // Contadores de tickets
  document.getElementById('countPendiente').textContent = state.queue.length;
  document.getElementById('countAtendidos').textContent = state.processed.length;

  // Muestra cola pendiente
  const colaPendiente = document.getElementById('colaPendiente');
  colaPendiente.innerHTML = state.queue.map((ticket, index) => `
    <div class="ticket-card priority-${getPrioridadClass(ticket.prioridad)}">
      <div class="ticket-header">
        <span class="ticket-id">#${index + 1} - ${ticket.id}</span>
        <span class="ticket-priority ${getPrioridadColorClass(ticket.prioridad)}">P: ${ticket.prioridad.toFixed(2)}</span>
      </div>
      <div class="ticket-title">${ticket.titulo}</div>
      <div class="ticket-meta">
        <span class="meta-tag">U: ${ticket.urgencia}</span>
        <span class="meta-tag">I: ${ticket.impacto}</span>
        <span class="meta-tag">${ticket.tiempoEst}h</span>
      </div>
    </div>
  `).join('');

  // Muestra atendidos
  const colaAtendidos = document.getElementById('colaAtendidos');
  colaAtendidos.innerHTML = state.processed.map((ticket, index) => `
    <div class="ticket-card priority-low">
      <div class="ticket-header">
        <span class="ticket-id">#${index + 1} - ${ticket.id}</span>
        <span class="ticket-priority bg-low">✓ ${ticket.prioridad.toFixed(2)}</span>
      </div>
      <div class="ticket-title">${ticket.titulo}</div>
    </div>
  `).join('');

  // Mostrar ticket actual en animación
  const ticketProcesando = document.getElementById('ticketProcesando');
  const processingContent = document.getElementById('processingContent');
  
  if (state.currentTicket) {
    ticketProcesando.classList.remove('hidden');
    processingContent.innerHTML = `
      <div class="processing-info">
        <p style="font-size: 0.9rem; color: #cbd5e1;">ID: ${state.currentTicket.id}</p>
        <p style="font-size: 1.2rem; font-weight: bold; margin: 10px 0;">${state.currentTicket.titulo}</p>
        <div style="display: flex; gap: 10px;">
          <span style="background: #2563eb; padding: 8px 15px; border-radius: 6px;">Urgencia: ${state.currentTicket.urgencia}</span>
          <span style="background: #2563eb; padding: 8px 15px; border-radius: 6px;">Impacto: ${state.currentTicket.impacto}</span>
        </div>
      </div>
      <div class="processing-priority ${getPrioridadColorClass(state.currentTicket.prioridad)}">
        <p>Prioridad Calculada</p>
        <p>${state.currentTicket.prioridad.toFixed(2)}</p>
      </div>
    `;
  } else {
    ticketProcesando.classList.add('hidden');
  }

  // Mostrar estadísticas finales al terminar
  const resultadoFinal = document.getElementById('resultadoFinal');
  const finalStats = document.getElementById('finalStats');
  const tiempoEjecucion = document.getElementById('tiempoEjecucion');

  if (state.queue.length === 0 && state.processed.length > 0) {
    resultadoFinal.classList.remove('hidden');
    finalStats.innerHTML = `
      <div class="final-stat">
        <p>Total de Tickets</p>
        <p>${state.processed.length}</p>
      </div>
      <div class="final-stat">
        <p>Tiempo Total</p>
        <p>${state.metrics.tiempoTotal.toFixed(1)}h</p>
      </div>
      <div class="final-stat">
        <p>Tiempo Promedio</p>
        <p>${state.metrics.tiempoPromedio.toFixed(1)}h</p>
      </div>
      <div class="final-stat">
        <p>Críticos Atendidos</p>
        <p>${state.metrics.criticosAtendidos}</p>
      </div>
    `;

    if (state.metrics.startTime && state.metrics.endTime) {
      const tiempoTotal = ((state.metrics.endTime - state.metrics.startTime) / 1000).toFixed(2);
      tiempoEjecucion.textContent = `⚡ Tiempo de ejecución del algoritmo: ${tiempoTotal}s`;
    }
  } else {
    resultadoFinal.classList.add('hidden');
  }
}

// Carga eventos al iniciar la página
document.addEventListener('DOMContentLoaded', () => {

  // Botón para inicializar cola
  document.getElementById('btnIniciar').addEventListener('click', inicializarCola);

  // Botón para procesar ticket manualmente
  document.getElementById('btnSiguiente').addEventListener('click', () => {
    if (state.queue.length > 0 && !state.currentTicket) {
      procesarSiguiente();
    }
  });

  // Botón modo automático
  document.getElementById('btnAuto').addEventListener('click', toggleAuto);

  // Botón reiniciar
  document.getElementById('btnReiniciar').addEventListener('click', reiniciar);

  // Botones de dataset
  document.querySelectorAll('.btn-dataset').forEach(btn => {
    btn.addEventListener('click', () => {
      cambiarDataSet(btn.dataset.set);
    });
  });

  // Cargar UI inicial
  actualizarUI();
  habilitarBotones();
});
