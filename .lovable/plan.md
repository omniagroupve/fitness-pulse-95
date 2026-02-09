
# Revision Completa del Command Center: User-Friendly y Funcional

## Problemas Encontrados

### 1. Textos tecnicos que hay que cambiar a lenguaje simple
- **Overview**: "Executive Snapshot" -> "Resumen del Dia", "Performance por Sede" -> "Como van las Sedes", "Operations Intelligence" -> "Que necesita tu atencion", "SLA Atencion" -> "Tiempo de Respuesta", "Business Pulse" -> "Tendencia de Ventas"
- **Sidebar**: "Command v2.0" -> "Centro de Control", grupo "Sistema" -> "Notificaciones"
- **Header**: "Command Center" -> "Centro de Control"
- **Ventas**: "Analisis detallado de ingresos por sede" -> "Como van las ventas en cada sede"
- **Operaciones**: "Distribucion semanal de horas operativas" -> "Horas trabajadas esta semana", "Validaciones Pendientes" -> "Coaches por Revisar"
- **Alertas**: "Centro de Alertas" / "senales detectadas por el sistema" -> "Alertas" / "cosas que necesitan atencion", "Timeline de Alertas" -> "Detalle de Alertas"
- **AskOmnia**: "AI Assistant" -> "Tu Asistente"

### 2. Vista de "Atencion" no tiene contenido propio
- Actualmente muestra el OverviewView (copia), necesita su propia vista con metricas de atencion al cliente:
  - Mensajes de hoy (47), Tiempo promedio de respuesta (3.2 min), Respuestas rapidas (89%)
  - Grafico de categorias de mensajes (Membresias, Horarios, Pagos, Clases, Otros)
  - Los datos ya existen en mockData (`atencionCliente`)

### 3. Navegacion sidebar duplicada
- "Nomina" y "Compras" en el sidebar redirigen a OperacionesView (duplicado de Operaciones)
- Solucion: Hacer que "Nomina" abra Operaciones en sub-tab Nomina, y "Compras" abra Operaciones en sub-tab Compras, para que la navegacion sea directa

### 4. Light mode necesita ajustes
- El toggle funciona pero algunos elementos de glassmorphism y glows son demasiado sutiles en modo claro
- Las tarjetas con `bg-card/40` y `bg-card/60` necesitan mas opacidad en light mode para que se distingan del fondo
- Los patrones de fondo (dots, grid) deben ajustarse para light mode

---

## Cambios a Realizar

### Archivo 1: `src/components/command/views/OverviewView.tsx`
- Renombrar todos los textos tecnicos a espanol simple:
  - "Executive Snapshot" -> "Resumen del Dia"
  - "SLA Atencion" -> "Tiempo de Respuesta"
  - "Business Pulse" -> "Tendencia de Ventas"
  - "Performance por Sede" -> "Como van las Sedes"
  - "Operations Intelligence" -> "Que necesita tu atencion"
  - "Senales que requieren atencion" -> "Puntos importantes del dia"
  - "Horas Operativas" -> "Horas Trabajadas"
  - "Coaches sin validar" -> "Coaches por revisar"
  - "senales detectadas" -> "cosas por revisar"

### Archivo 2: `src/components/command/views/VentasView.tsx`
- Subtitulo -> "Como van las ventas en cada sede"
- "Tendencia Semanal por Sede" -> "Ventas de la Semana"
- "Comparativo de ventas ultimos 7 dias" -> "Comparando las 4 sedes en los ultimos 7 dias"

### Archivo 3: `src/components/command/views/OperacionesView.tsx`
- Aceptar prop `initialTab` para poder abrir directamente en Nomina o Compras desde el sidebar
- "Gestion de nomina, compras e inventario" -> "Todo sobre tu equipo, compras y productos"
- "Distribucion semanal de horas operativas" -> "Horas trabajadas esta semana por sede"
- "Coaches que requieren validacion de horas" -> "Coaches con horas por revisar"
- "Solicitudes Pendientes" -> "Compras por Aprobar"
- "Compras que requieren aprobacion" -> "Estas compras necesitan tu OK"
- "Alertas de Inventario" -> "Productos con Stock Bajo"
- "Productos que requieren atencion" -> "Estos productos se estan acabando"

### Archivo 4: `src/components/command/views/AtencionView.tsx` (NUEVO)
- Crear vista dedicada de Atencion al Cliente con:
  - 3 MetricCards: Mensajes Hoy (47), Tiempo Promedio (3.2 min), Respuestas Rapidas (89%)
  - Grafico de barras de categorias de mensajes usando Recharts (datos de `atencionCliente.categorias`)
  - Titulos user-friendly: "Atencion al Cliente", "Como estamos respondiendo"

### Archivo 5: `src/pages/Index.tsx`
- Conectar "atencion" -> `AtencionView`
- Conectar "nomina" -> `OperacionesView` con `initialTab="nomina"`
- Conectar "compras" -> `OperacionesView` con `initialTab="compras"`

### Archivo 6: `src/components/command/CommandHeader.tsx`
- "Command Center" -> "Centro de Control"

### Archivo 7: `src/components/command/CommandSidebar.tsx`
- "Command v2.0" -> "Centro de Control"
- Grupo "Sistema" -> "Notificaciones"

### Archivo 8: `src/components/command/AskOmnia.tsx`
- "AI Assistant" -> "Tu Asistente"

### Archivo 9: `src/components/command/AlertTimeline.tsx`
- Revisar que los labels sean en espanol simple (sin terminos como "signal" o "detected")

### Archivo 10: `src/components/command/views/AlertasView.tsx`
- "Centro de Alertas" -> "Alertas"
- "senales detectadas por el sistema" -> "cosas que necesitan tu atencion"
- "Timeline de Alertas" -> "Detalle de Alertas"
- "Ordenadas por prioridad" -> "De mas urgente a menos urgente"

### Archivo 11: `src/index.css`
- Ajustar light mode: aumentar opacidad de tarjetas, ajustar pattern-dots para que no sea cyan en fondo blanco, mejorar contraste de glows

---

## Resultado Esperado
- Todas las vistas con lenguaje 100% en espanol simple, sin jerga tecnica
- Vista de "Atencion al Cliente" funcional con sus propios datos y graficos
- Navegacion directa desde sidebar: Nomina y Compras abren la sub-tab correcta
- Light mode con mejor contraste y legibilidad
- Cada vista tiene datos relevantes y diferenciados
