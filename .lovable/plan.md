
# Ask OMNIA - De Mock a AI Real con Lovable Cloud

## Objetivo

Convertir el panel "Ask OMNIA" de respuestas simuladas a un asistente AI real que conoce los datos del negocio de Fitness Factory, usando streaming token-by-token.

---

## Arquitectura

```text
+------------------+       +------------------------+       +---------------------------+
|   AskOmnia.tsx   | ----> | Edge Function: omnia   | ----> | Lovable AI Gateway        |
|   (streaming)    | <---- | (system prompt + data) | <---- | google/gemini-3-flash     |
+------------------+       +------------------------+       +---------------------------+
```

El system prompt del edge function incluira todos los datos de mockData como contexto, de modo que OMNIA "conoce" el estado actual del negocio y puede responder preguntas reales sobre ventas, alertas, sedes, nomina, etc.

---

## Que se va a hacer

### 1. Habilitar Lovable Cloud
- Activar Lovable Cloud para tener Supabase disponible (edge functions).

### 2. Crear Edge Function `omnia`
- Archivo: `supabase/functions/omnia/index.ts`
- Recibe los mensajes del chat
- Inyecta un **system prompt ejecutivo** con los datos del negocio (ventas por sede, alertas, nomina, compras, inventario)
- Llama al Lovable AI Gateway con streaming habilitado
- Maneja errores 429 (rate limit) y 402 (creditos)
- Retorna el stream SSE al frontend

### 3. Refactorizar AskOmnia.tsx
- Eliminar `MOCK_RESPONSES` y el `setTimeout`
- Implementar streaming real token-by-token
- Renderizar respuestas con markdown (`react-markdown`)
- Actualizar el ultimo mensaje del assistant progresivamente
- Manejar errores y mostrar toasts
- Mantener el historial de conversacion completo

### 4. Crear utilidad de streaming
- Archivo: `src/lib/streamChat.ts`
- Funcion reutilizable para parsear SSE line-by-line
- Manejo de buffer, CRLF, `[DONE]`, flush final
- Callbacks `onDelta` y `onDone`

---

## System Prompt de OMNIA

El edge function enviara un system prompt como:

> "Eres OMNIA, el asistente AI ejecutivo de Fitness Factory, una cadena de gimnasios con 4 sedes. Tienes acceso a datos en tiempo real del negocio. Responde de forma concisa, ejecutiva, con datos precisos. Usa emojis con moderacion. Datos actuales: [ventas, alertas, nomina, inventario, SLA...]"

Esto le da al AI contexto completo para responder cualquier pregunta sobre el negocio.

---

## Detalles Tecnicos

### Edge Function (`supabase/functions/omnia/index.ts`)
- CORS headers completos
- System prompt con datos del negocio hardcodeados (fase 1)
- Modelo: `google/gemini-3-flash-preview`
- Stream: true
- Manejo de errores 429/402 con mensajes claros

### Stream Client (`src/lib/streamChat.ts`)
- Parseo SSE linea por linea
- Manejo de JSON parcial entre chunks
- Flush de buffer final
- Soporte para AbortController (cancelacion)

### AskOmnia.tsx (cambios)
- Instalar y usar `react-markdown` para renderizar respuestas
- Streaming: actualizar contenido del ultimo mensaje assistant en cada token
- Toast en errores de red/rate-limit
- Mantener sugerencias iniciales pero que funcionen con AI real

### Dependencia nueva
- `react-markdown` para renderizar respuestas del AI con formato

---

## Resultado

El gerente podra escribir preguntas como:
- "Como van las ventas hoy vs ayer?"
- "Que sede tiene peor rendimiento?"
- "Resume las alertas criticas"
- "Cuantos coaches faltan por validar?"

Y recibir respuestas reales del AI, con streaming, basadas en los datos del negocio.
