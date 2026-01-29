// Mock data for Fitness Factory Dashboard MVP
// Sedes: Galpón, Casita, Cabudare, Caracas Oeste

export const SEDES = ['Galpón', 'Casita', 'Cabudare', 'Caracas Oeste'] as const;
export type Sede = typeof SEDES[number];

// Header - Estado General
export const estadoGeneral = {
  fecha: new Date().toLocaleDateString('es-VE', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }),
  ventasHoy: 4850,
  ventasAyer: 4320,
  variacionVentas: 12.3,
  horasTrabajadas: 312,
  costoNomina: 2840,
};

// Ventas por sede
export const ventasPorSede = [
  { sede: 'Galpón', ventas: 1650, variacion: 8.2 },
  { sede: 'Casita', ventas: 1420, variacion: -3.5 },
  { sede: 'Cabudare', ventas: 980, variacion: 15.1 },
  { sede: 'Caracas Oeste', ventas: 800, variacion: 22.4 },
];

// Ventas diarias (últimos 7 días)
export const ventasDiarias = [
  { dia: 'Lun', Galpón: 1520, Casita: 1380, Cabudare: 890, 'Caracas Oeste': 720 },
  { dia: 'Mar', Galpón: 1580, Casita: 1420, Cabudare: 920, 'Caracas Oeste': 750 },
  { dia: 'Mié', Galpón: 1490, Casita: 1350, Cabudare: 880, 'Caracas Oeste': 680 },
  { dia: 'Jue', Galpón: 1620, Casita: 1480, Cabudare: 950, 'Caracas Oeste': 790 },
  { dia: 'Vie', Galpón: 1710, Casita: 1520, Cabudare: 1020, 'Caracas Oeste': 850 },
  { dia: 'Sáb', Galpón: 1850, Casita: 1650, Cabudare: 1150, 'Caracas Oeste': 920 },
  { dia: 'Hoy', Galpón: 1650, Casita: 1420, Cabudare: 980, 'Caracas Oeste': 800 },
];

// Asistencia y Nómina
export const asistenciaNomina = {
  horasPorSede: [
    { sede: 'Galpón', horas: 98, coaches: 8 },
    { sede: 'Casita', horas: 82, coaches: 6 },
    { sede: 'Cabudare', horas: 72, coaches: 5 },
    { sede: 'Caracas Oeste', horas: 60, coaches: 4 },
  ],
  coachesValidacionPendiente: [
    { nombre: 'Carlos Mendez', sede: 'Galpón', horasPendientes: 12 },
    { nombre: 'María García', sede: 'Casita', horasPendientes: 8 },
  ],
  estadoNomina: 'pendiente' as 'ok' | 'pendiente',
  costoTotalSemanal: 2840,
};

// Compras e Inventario
export const comprasInventario = {
  comprasPendientes: 3,
  comprasAprobadas: 8,
  gastoSemanal: 1250,
  solicitudesPendientes: [
    { id: 1, descripcion: 'Toallas gimnasio (50 und)', sede: 'Galpón', monto: 180, fecha: '2026-01-28' },
    { id: 2, descripcion: 'Cuerdas de saltar (20 und)', sede: 'Casita', monto: 95, fecha: '2026-01-27' },
    { id: 3, descripcion: 'Colchonetas yoga (10 und)', sede: 'Cabudare', monto: 320, fecha: '2026-01-26' },
  ],
  alertasInventario: [
    { producto: 'Agua embotellada', sede: 'Galpón', nivel: 'bajo' },
    { producto: 'Suplementos proteína', sede: 'Caracas Oeste', nivel: 'crítico' },
  ],
};

// Atención al Cliente
export const atencionCliente = {
  mensajesHoy: 47,
  slaPromedio: 3.2, // minutos
  respuestasMenos5Min: 89, // porcentaje
  categorias: [
    { categoria: 'Membresías', cantidad: 18 },
    { categoria: 'Horarios', cantidad: 12 },
    { categoria: 'Pagos', cantidad: 9 },
    { categoria: 'Clases', cantidad: 5 },
    { categoria: 'Otros', cantidad: 3 },
  ],
};

// Alertas
export const alertas = {
  criticas: [
    { tipo: 'nómina', mensaje: '2 coaches sin validación de horas', sede: 'Múltiple', prioridad: 'alta' },
    { tipo: 'inventario', mensaje: 'Proteína en nivel crítico', sede: 'Caracas Oeste', prioridad: 'alta' },
  ],
  advertencias: [
    { tipo: 'compras', mensaje: '3 compras pendientes de aprobación', sede: 'Múltiple', prioridad: 'media' },
    { tipo: 'ventas', mensaje: 'Casita con -3.5% vs ayer', sede: 'Casita', prioridad: 'media' },
  ],
  informativas: [
    { tipo: 'sla', mensaje: 'SLA dentro de objetivo (89% < 5min)', sede: 'Global', prioridad: 'baja' },
  ],
};
