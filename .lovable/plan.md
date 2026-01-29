

# Dashboard Fitness Factory - Rediseno Futurista y Minimalista

## Vision General

Transformar el dashboard actual en una experiencia visual moderna, espaciosa y con navegacion por pestanas que elimine la densidad de informacion en una sola vista.

---

## Cambios de Diseno

### 1. Sistema de Navegacion por Vistas

Implementar un sistema de tabs/pestanas para separar el contenido en vistas distintas:

```text
+------------------------------------------------------------------+
|  [Resumen]  [Ventas]  [Operaciones]  [Alertas]                   |
+------------------------------------------------------------------+
```

- **Resumen**: KPIs principales con metricas circulares animadas
- **Ventas**: Detalles de ventas por sede y graficos
- **Operaciones**: Nomina, compras e inventario
- **Alertas**: Centro de notificaciones con timeline

### 2. Estetica Futurista

- Fondos con gradientes suaves y glassmorphism (blur + transparencia)
- Cards con bordes sutiles y sombras difusas
- Indicadores circulares animados para KPIs
- Espaciado generoso (mucho aire entre elementos)
- Tipografia grande y legible
- Animaciones de entrada suaves

### 3. Paleta de Colores Actualizada

Mantener los colores de marca pero con acabado mas sofisticado:
- Fondo principal mas oscuro/neutro
- Acentos de color mas vibrantes en elementos interactivos
- Uso de transparencias y blurs

---

## Estructura de Componentes

### Vista Resumen (Default)

```text
+------------------------------------------------------------------+
|  LOGO                          DASHBOARD EJECUTIVO       [fecha] |
+------------------------------------------------------------------+
|                                                                   |
|   +-------------+  +-------------+  +-------------+  +---------+  |
|   |             |  |             |  |             |  |         |  |
|   |   VENTAS    |  |   NOMINA    |  |    SLA      |  | ALERTAS |  |
|   |   $4,850    |  |   $2,840    |  |    89%      |  |    3    |  |
|   |   [ring]    |  |   [ring]    |  |   [ring]    |  | [ring]  |  |
|   |   +12.3%    |  |   312h      |  |   3.2min    |  | activas |  |
|   +-------------+  +-------------+  +-------------+  +---------+  |
|                                                                   |
|   +---------------------------+  +----------------------------+   |
|   |   MINI GRAFICO VENTAS    |  |   TOP 3 ALERTAS RAPIDAS    |   |
|   |   (sparkline semanal)    |  |   - Alerta 1               |   |
|   |                          |  |   - Alerta 2               |   |
|   +---------------------------+  +----------------------------+   |
|                                                                   |
+------------------------------------------------------------------+
|                              [POWERED BY OMNIA]                   |
+------------------------------------------------------------------+
```

### Vista Ventas

- Selector de sede con chips
- Grafico de lineas grande y limpio
- Cards comparativas por sede

### Vista Operaciones

- Sub-tabs: Nomina | Compras | Inventario
- Listas limpias con estados visuales
- Progress rings para horas por sede

### Vista Alertas

- Timeline vertical de alertas
- Filtros por tipo y prioridad
- Estados visuales claros (critico/advertencia/info)

---

## Detalles Tecnicos

### Archivos a Crear

1. `src/components/dashboard/FuturisticCard.tsx` - Card con glassmorphism
2. `src/components/dashboard/CircularProgress.tsx` - Indicador circular animado
3. `src/components/dashboard/DashboardNav.tsx` - Navegacion por tabs
4. `src/components/dashboard/views/ResumenView.tsx` - Vista principal
5. `src/components/dashboard/views/VentasView.tsx` - Vista de ventas
6. `src/components/dashboard/views/OperacionesView.tsx` - Vista operaciones
7. `src/components/dashboard/views/AlertasView.tsx` - Vista alertas

### Archivos a Modificar

1. `src/index.css` - Agregar utilidades glassmorphism y animaciones
2. `src/pages/Index.tsx` - Implementar sistema de navegacion
3. `src/components/dashboard/DashboardHeader.tsx` - Simplificar header
4. `src/components/dashboard/PoweredByOmnia.tsx` - Estilo blueprint mejorado

### Animaciones

- Fade-in al cambiar de vista
- Scale-in para cards
- Transiciones suaves en anillos circulares
- Hover effects sutiles

---

## Beneficios del Rediseno

1. **Menos densidad**: Cada vista muestra solo lo relevante
2. **Navegacion clara**: Tabs permiten encontrar informacion rapido
3. **Estetica premium**: Look moderno y profesional
4. **Mejor UX**: Espacio para respirar, jerarquia visual clara
5. **Escalabilidad**: Facil agregar nuevas vistas en el futuro

