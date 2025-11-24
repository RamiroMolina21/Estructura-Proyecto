// Datasets de tickets basados en proceso real (~10 tickets diarios)
const dataSets = {
  pequeño: [
    { id: 'T001', titulo: 'Mantenimiento computador', solicitante: 'Decano de Ingeniería', rangoAdmin: 5, ubicacion: 'Rectoría', tiempoEst: 0.3, critico: true },
    { id: 'T002', titulo: 'Limpieza RAM', solicitante: 'Docente Matemáticas', rangoAdmin: 3, ubicacion: 'Salón 203', tiempoEst: 0.2, critico: false },
    { id: 'T003', titulo: 'Impresora no imprime', solicitante: 'Director Financiero', rangoAdmin: 5, ubicacion: 'Oficina Financiera', tiempoEst: 0.5, critico: true },
    { id: 'T004', titulo: 'Cambio de teclado', solicitante: 'Auxiliar administrativo', rangoAdmin: 1, ubicacion: 'Biblioteca', tiempoEst: 0.2, critico: false },
    { id: 'T005', titulo: 'Instalación software', solicitante: 'Coordinador académico', rangoAdmin: 4, ubicacion: 'Decanatura', tiempoEst: 0.4, critico: false }
  ],
  mediano: [
    { id: 'T001', titulo: 'Mantenimiento computador', solicitante: 'Decano de Ingeniería', rangoAdmin: 5, ubicacion: 'Rectoría', tiempoEst: 0.3, critico: true },
    { id: 'T002', titulo: 'Limpieza RAM', solicitante: 'Docente Matemáticas', rangoAdmin: 3, ubicacion: 'Salón 203', tiempoEst: 0.2, critico: false },
    { id: 'T003', titulo: 'Impresora no imprime', solicitante: 'Director Financiero', rangoAdmin: 5, ubicacion: 'Oficina Financiera', tiempoEst: 0.5, critico: true },
    { id: 'T004', titulo: 'Cambio de teclado', solicitante: 'Auxiliar administrativo', rangoAdmin: 1, ubicacion: 'Biblioteca', tiempoEst: 0.2, critico: false },
    { id: 'T005', titulo: 'Instalación software', solicitante: 'Coordinador académico', rangoAdmin: 4, ubicacion: 'Decanatura', tiempoEst: 0.4, critico: false },
    { id: 'T006', titulo: 'Sistema operativo dañado', solicitante: 'Rector', rangoAdmin: 5, ubicacion: 'Rectoría', tiempoEst: 1.0, critico: true },
    { id: 'T007', titulo: 'Mouse no funciona', solicitante: 'Docente Física', rangoAdmin: 3, ubicacion: 'Lab Física', tiempoEst: 0.1, critico: false },
    { id: 'T008', titulo: 'Configurar correo', solicitante: 'Vicerrector', rangoAdmin: 5, ubicacion: 'Vicerrectoría', tiempoEst: 0.3, critico: false },
    { id: 'T009', titulo: 'Actualizar antivirus', solicitante: 'Secretaria', rangoAdmin: 2, ubicacion: 'Secretaría', tiempoEst: 0.2, critico: false },
    { id: 'T010', titulo: 'Formateo urgente', solicitante: 'Dir. Administrativa', rangoAdmin: 5, ubicacion: 'Admin', tiempoEst: 0.8, critico: true }
  ],
  grande: [
    { id: 'T001', titulo: 'Mantenimiento computador', solicitante: 'Decano de Ingeniería', rangoAdmin: 5, ubicacion: 'Rectoría', tiempoEst: 0.3, critico: true },
    { id: 'T002', titulo: 'Limpieza RAM', solicitante: 'Docente Matemáticas', rangoAdmin: 3, ubicacion: 'Salón 203', tiempoEst: 0.2, critico: false },
    { id: 'T003', titulo: 'Impresora no imprime', solicitante: 'Director Financiero', rangoAdmin: 5, ubicacion: 'Oficina Financiera', tiempoEst: 0.5, critico: true },
    { id: 'T004', titulo: 'Cambio de teclado', solicitante: 'Auxiliar administrativo', rangoAdmin: 1, ubicacion: 'Biblioteca', tiempoEst: 0.2, critico: false },
    { id: 'T005', titulo: 'Instalación software', solicitante: 'Coordinador académico', rangoAdmin: 4, ubicacion: 'Decanatura', tiempoEst: 0.4, critico: false },
    { id: 'T006', titulo: 'Sistema operativo dañado', solicitante: 'Rector', rangoAdmin: 5, ubicacion: 'Rectoría', tiempoEst: 1.0, critico: true },
    { id: 'T007', titulo: 'Mouse no funciona', solicitante: 'Docente Física', rangoAdmin: 3, ubicacion: 'Lab Física', tiempoEst: 0.1, critico: false },
    { id: 'T008', titulo: 'Configurar correo', solicitante: 'Vicerrector', rangoAdmin: 5, ubicacion: 'Vicerrectoría', tiempoEst: 0.3, critico: false },
    { id: 'T009', titulo: 'Actualizar antivirus', solicitante: 'Secretaria', rangoAdmin: 2, ubicacion: 'Secretaría', tiempoEst: 0.2, critico: false },
    { id: 'T010', titulo: 'Formateo urgente', solicitante: 'Dir. Administrativa', rangoAdmin: 5, ubicacion: 'Admin', tiempoEst: 0.8, critico: true },
    { id: 'T011', titulo: 'Placa base dañada', solicitante: 'Decano Derecho', rangoAdmin: 5, ubicacion: 'Facultad Derecho', tiempoEst: 2.0, critico: true },
    { id: 'T012', titulo: 'Cable de red', solicitante: 'Monitor', rangoAdmin: 2, ubicacion: 'Cafetería', tiempoEst: 0.1, critico: false },
    { id: 'T013', titulo: 'Pantalla no enciende', solicitante: 'Docente Química', rangoAdmin: 3, ubicacion: 'Lab Química', tiempoEst: 0.4, critico: false },
    { id: 'T014', titulo: 'Televisor aula', solicitante: 'Auxiliar', rangoAdmin: 1, ubicacion: 'Auditorio', tiempoEst: 0.3, critico: false }
  ]
};

// Estado global
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

// Inicializar con dataset pequeño
state.tickets = [...dataSets[state.selectedDataSet]];

// ⚙️ ALGORITMO GREEDY: Calcula prioridad ponderada
// Este es el corazón del algoritmo voraz
function calcularPrioridad(ticket) {
  // Prioridad base = rango administrativo (1-5)
  let prioridad = ticket.rangoAdmin;
  
  // Bonus por criticidad (áreas concurridas como Rectoría, Financiera)
  if (ticket.critico) {
    prioridad += 0.5;
  }
  
  return prioridad;
}

// ⚙️ ALGORITMO GREEDY: Inicializa y ordena la cola
// Aquí se aplica la estrategia voraz: ordenar por prioridad y siempre elegir el mayor
function inicializarCola() {
  // Paso 1: Calcular prioridad de cada ticket
  state.queue = [...state.tickets]
    .map(t => ({ ...t, prioridad: calcularPrioridad(t) }))
    // Paso 2: DECISIÓN GREEDY - Ordenar de mayor a menor prioridad
    .sort((a, b) => {
      // Primero por prioridad (decisión voraz: mayor prioridad primero)
      if (b.prioridad !== a.prioridad) {
        return b.prioridad - a.prioridad;
      }
      // Desempate por orden de llegada (FIFO)
      return a.id.localeCompare(b.id);
    });
  
  state.processed = [];
  state.currentTicket = null;
  state.metrics = {
    tiempoTotal: 0,
    ticketsAtendidos: 0,
    tiempoPromedio: 0,
    criticosAtendidos: 0,
    startTime: Date.now(),
    endTime: null
  };

  actualizarUI();
  habilitarBotones();
}

// ⚙️ ALGORITMO GREEDY: Procesa el siguiente ticket
// Siempre toma el primero de la cola (el de mayor prioridad)
function procesarSiguiente() {
  if (state.queue.length === 0) {
    detenerAuto();
    state.metrics.endTime = Date.now();
    actualizarUI();
    return;
  }

  // DECISIÓN GREEDY: Siempre procesar el ticket con mayor prioridad (posición 0)
  const siguiente = state.queue[0];
  state.currentTicket = siguiente;

  actualizarUI();

  setTimeout(() => {
    // Remover ticket procesado de la cola
    state.queue = state.queue.slice(1);
    state.processed.push(siguiente);
    state.currentTicket = null;

    // Actualizar métricas
    state.metrics.tiempoTotal += siguiente.tiempoEst;
    state.metrics.ticketsAtendidos = state.processed.length;
    state.metrics.tiempoPromedio = state.metrics.tiempoTotal / state.metrics.ticketsAtendidos;
    state.metrics.criticosAtendidos += (siguiente.critico ? 1 : 0);

    if (state.queue.length === 0) {
      state.metrics.endTime = Date.now();
      detenerAuto();
    }

    actualizarUI();
    habilitarBotones();
  }, 1000);
}

function cambiarDataSet(nombre) {
  state.selectedDataSet = nombre;
  state.tickets = [...dataSets[nombre]];
  reiniciar();
  
  document.querySelectorAll('.btn-dataset').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.set === nombre) {
      btn.classList.add('active');
    }
  });
}

function getRangoLabel(rango) {
  const labels = {
    5: 'Directivo',
    4: 'Coordinador',
    3: 'Docente',
    2: 'Administrativo',
    1: 'Auxiliar'
  };
  return labels[rango] || 'N/A';
}

function getPrioridadClass(prioridad) {
  if (prioridad >= 5.0) return 'critical';
  if (prioridad >= 4.0) return 'high';
  if (prioridad >= 3.0) return 'medium';
  return 'low';
}

function getPrioridadColorClass(prioridad) {
  if (prioridad >= 5.0) return 'bg-critical';
  if (prioridad >= 4.0) return 'bg-high';
  if (prioridad >= 3.0) return 'bg-medium';
  return 'bg-low';
}

function reiniciar() {
  detenerAuto();
  state.queue = [];
  state.processed = [];
  state.currentTicket = null;
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

function toggleAuto() {
  if (state.isRunning) {
    detenerAuto();
  } else {
    iniciarAuto();
  }
}

function iniciarAuto() {
  if (state.queue.length === 0) return;
  state.isRunning = true;
  document.getElementById('btnAuto').textContent = '⏸️ Pausar';
  
  state.autoInterval = setInterval(() => {
    if (state.queue.length > 0 && !state.currentTicket) {
      procesarSiguiente();
    } else if (state.queue.length === 0) {
      detenerAuto();
    }
  }, 1500);
}

function detenerAuto() {
  state.isRunning = false;
  if (state.autoInterval) {
    clearInterval(state.autoInterval);
    state.autoInterval = null;
  }
  document.getElementById('btnAuto').textContent = '▶️ Auto';
}

function habilitarBotones() {
  const btnIniciar = document.getElementById('btnIniciar');
  const btnSiguiente = document.getElementById('btnSiguiente');
  const btnAuto = document.getElementById('btnAuto');

  const tieneTickets = state.tickets.length > 0;
  const colaIniciada = state.queue.length > 0 || state.processed.length > 0;
  const hayPendientes = state.queue.length > 0;

  btnIniciar.disabled = !tieneTickets || (colaIniciada && hayPendientes);
  btnSiguiente.disabled = !hayPendientes;
  btnAuto.disabled = !hayPendientes;
}

function actualizarUI() {
  // Métricas
  document.getElementById('tiempoTotal').textContent = state.metrics.tiempoTotal.toFixed(1) + 'h';
  document.getElementById('atendidos').textContent = `${state.metrics.ticketsAtendidos}/${state.tickets.length}`;
  document.getElementById('tiempoPromedio').textContent = (state.metrics.tiempoPromedio || 0).toFixed(1) + 'h';
  document.getElementById('criticos').textContent = state.metrics.criticosAtendidos;

  // Contadores
  document.getElementById('countPendiente').textContent = state.queue.length;
  document.getElementById('countAtendidos').textContent = state.processed.length;

  // Cola pendiente
  const colaPendiente = document.getElementById('colaPendiente');
  colaPendiente.innerHTML = state.queue.map((ticket, index) => `
    <div class="ticket-card priority-${getPrioridadClass(ticket.prioridad)}">
      <div class="ticket-header">
        <span class="ticket-id">#${index + 1} - ${ticket.id}</span>
        <span class="ticket-priority ${getPrioridadColorClass(ticket.prioridad)}">P: ${ticket.prioridad.toFixed(1)}</span>
      </div>
      <div class="ticket-title">${ticket.titulo}</div>
      <p style="font-size: 0.9rem; color: #cbd5e1; margin: 5px 0;">👤 ${ticket.solicitante}</p>
      <div class="ticket-meta">
        <span class="meta-tag">${getRangoLabel(ticket.rangoAdmin)}</span>
        <span class="meta-tag">📍 ${ticket.ubicacion}</span>
        <span class="meta-tag">⏱️ ${ticket.tiempoEst}h</span>
        ${ticket.critico ? '<span class="meta-tag" style="background: #ef4444;">🚨 Crítico</span>' : ''}
      </div>
    </div>
  `).join('');

  // Cola atendidos
  const colaAtendidos = document.getElementById('colaAtendidos');
  colaAtendidos.innerHTML = state.processed.map((ticket, index) => `
    <div class="ticket-card priority-low">
      <div class="ticket-header">
        <span class="ticket-id">#${index + 1} - ${ticket.id}</span>
        <span class="ticket-priority bg-low">✓ ${ticket.prioridad.toFixed(1)}</span>
      </div>
      <div class="ticket-title">${ticket.titulo}</div>
      <p style="font-size: 0.9rem; color: #cbd5e1; margin: 5px 0;">👤 ${ticket.solicitante}</p>
    </div>
  `).join('');

  // Ticket procesando
  const ticketProcesando = document.getElementById('ticketProcesando');
  const processingContent = document.getElementById('processingContent');
  
  if (state.currentTicket) {
    ticketProcesando.classList.remove('hidden');
    processingContent.innerHTML = `
      <div class="processing-info">
        <p style="font-size: 0.9rem; color: #cbd5e1;">ID: ${state.currentTicket.id}</p>
        <p style="font-size: 1.3rem; font-weight: bold; margin: 10px 0;">${state.currentTicket.titulo}</p>
        <p style="color: #cbd5e1; margin-bottom: 5px;">👤 ${state.currentTicket.solicitante}</p>
        <p style="color: #cbd5e1; margin-bottom: 10px;">📍 ${state.currentTicket.ubicacion}</p>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <span style="background: #3b82f6; padding: 8px 15px; border-radius: 6px;">${getRangoLabel(state.currentTicket.rangoAdmin)}</span>
          ${state.currentTicket.critico ? '<span style="background: #ef4444; padding: 8px 15px; border-radius: 6px;">🚨 Crítico</span>' : ''}
        </div>
      </div>
      <div class="processing-priority ${getPrioridadColorClass(state.currentTicket.prioridad)}">
        <p>Prioridad Calculada</p>
        <p>${state.currentTicket.prioridad.toFixed(1)}</p>
      </div>
    `;
  } else {
    ticketProcesando.classList.add('hidden');
  }

  // Resultado final
  const resultadoFinal = document.getElementById('resultadoFinal');
  const finalStats = document.getElementById('finalStats');
  const tiempoEjecucion = document.getElementById('tiempoEjecucion');

  if (state.queue.length === 0 && state.processed.length > 0) {
    resultadoFinal.classList.remove('hidden');
    finalStats.innerHTML = `
      <div class="final-stat">
        <p>Total Tickets</p>
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

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btnIniciar').addEventListener('click', inicializarCola);
  document.getElementById('btnSiguiente').addEventListener('click', () => {
    if (state.queue.length > 0 && !state.currentTicket) {
      procesarSiguiente();
    }
  });
  document.getElementById('btnAuto').addEventListener('click', toggleAuto);
  document.getElementById('btnReiniciar').addEventListener('click', reiniciar);

  document.querySelectorAll('.btn-dataset').forEach(btn => {
    btn.addEventListener('click', () => {
      cambiarDataSet(btn.dataset.set);
    });
  });

  actualizarUI();
  habilitarBotones();
});
