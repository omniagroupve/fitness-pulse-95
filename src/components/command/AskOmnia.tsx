import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  Sparkles, 
  Send, 
  Maximize2, 
  Minimize2,
  Bot,
  User,
  Loader2,
  Zap
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AskOmniaProps {
  expanded?: boolean;
  onToggleExpand?: () => void;
}

const SUGGESTIONS = [
  "¿Cómo van las ventas hoy?",
  "¿Qué alertas tenemos activas?",
  "Compara las sedes del mes",
  "¿Cuánto gastamos en nómina?",
];

const MOCK_RESPONSES: Record<string, string> = {
  "¿Cómo van las ventas hoy?": "📊 **Ventas de hoy: $4,850**\n\nEstamos un **+12.3%** por encima de ayer. Galpón lidera con $1,650, seguido de Casita. Caracas Oeste muestra el mejor crecimiento (+22.4%).",
  "¿Qué alertas tenemos activas?": "🚨 **3 alertas activas:**\n\n• **Crítico:** 2 coaches pendientes de validación\n• **Crítico:** Proteína en nivel crítico (Caracas Oeste)\n• **Advertencia:** 3 compras pendientes de aprobación",
  "Compara las sedes del mes": "📈 **Performance por sede:**\n\n1. **Galpón** — $1,650 (+8.2%) ✅\n2. **Casita** — $1,420 (-3.5%) ⚠️\n3. **Cabudare** — $980 (+15.1%) ✅\n4. **Caracas Oeste** — $800 (+22.4%) 🚀",
  "¿Cuánto gastamos en nómina?": "💰 **Costo nómina semanal: $2,840**\n\nTotal horas: 312h distribuidas en 23 coaches.\n\n⚠️ Hay 2 coaches con horas pendientes de validar (20h combinadas).",
};

export function AskOmnia({ expanded = false, onToggleExpand }: AskOmniaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = MOCK_RESPONSES[text] || 
        "Entendido. Estoy analizando los datos de Fitness Factory para darte una respuesta precisa. Esta funcionalidad estará conectada a tus datos reales próximamente.";
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className={cn(
      "flex flex-col rounded-xl border border-primary/20 bg-card/40 backdrop-blur-2xl overflow-hidden",
      "transition-all duration-500 relative",
      expanded ? "h-[500px]" : "h-auto"
    )}>
      {/* Top glow line */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute inset-0 animate-shimmer" />
        
        <div className="flex items-center gap-3 relative z-10">
          <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/30">
            <Zap className="h-4 w-4 text-primary" />
            <div className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          </div>
          <div>
            <span className="text-sm font-bold text-foreground tracking-tight">Ask OMNIA</span>
            <span className="text-[10px] text-primary/60 ml-2 font-medium">Tu Asistente</span>
          </div>
        </div>
        {onToggleExpand && (
          <button 
            onClick={onToggleExpand}
            className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors relative z-10"
          >
            {expanded ? (
              <Minimize2 className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Maximize2 className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        )}
      </div>

      {/* Messages */}
      {(expanded || messages.length > 0) && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px]">
          {messages.length === 0 && expanded && (
            <div className="text-center py-8">
              <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3 animate-float">
                <Sparkles className="h-5 w-5 text-primary/60" />
              </div>
              <p className="text-sm text-muted-foreground">
                Pregúntame sobre ventas, operaciones o alertas
              </p>
            </div>
          )}
          
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={cn(
                "flex gap-3 animate-fade-in",
                msg.role === 'user' && "justify-end"
              )}
            >
              {msg.role === 'assistant' && (
                <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 border border-primary/20">
                  <Bot className="h-3.5 w-3.5 text-primary" />
                </div>
              )}
              <div className={cn(
                "max-w-[85%] rounded-xl px-4 py-2.5 text-sm",
                msg.role === 'user' 
                  ? "bg-primary/90 text-primary-foreground" 
                  : "bg-muted/40 text-foreground border border-border/30"
              )}>
                <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
              </div>
              {msg.role === 'user' && (
                <div className="h-7 w-7 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0 border border-border/30">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 animate-fade-in">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 border border-primary/20">
                <Bot className="h-3.5 w-3.5 text-primary" />
              </div>
              <div className="bg-muted/30 border border-border/30 rounded-xl px-4 py-3 flex items-center gap-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                <span className="text-xs text-muted-foreground">Analizando datos...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Suggestions */}
      {messages.length === 0 && !expanded && (
        <div className="px-4 py-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSend(suggestion)}
              className="text-[11px] px-3 py-1.5 rounded-lg bg-muted/30 hover:bg-primary/10 text-muted-foreground hover:text-foreground border border-border/30 hover:border-primary/30 transition-all duration-200 font-medium"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-border/30">
        <div className="flex items-center gap-2 bg-muted/20 rounded-xl px-4 py-2 border border-border/30 focus-within:border-primary/40 focus-within:bg-muted/30 transition-all duration-200">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pregunta sobre tu negocio..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className={cn(
              "p-2 rounded-lg transition-all duration-200",
              input.trim() && !isTyping
                ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_12px_hsl(185,100%,50%,0.3)]"
                : "bg-muted/30 text-muted-foreground/40"
            )}
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
