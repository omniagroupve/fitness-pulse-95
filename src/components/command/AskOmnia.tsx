import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  Sparkles, 
  Send, 
  Maximize2, 
  Minimize2,
  Bot,
  User,
  Loader2
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

    // Simulate AI response
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
      "flex flex-col rounded-xl border border-primary/30 bg-card/60 backdrop-blur-xl overflow-hidden",
      "transition-all duration-500",
      expanded ? "h-[500px]" : "h-auto"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center animate-pulse-glow">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <span className="text-sm font-semibold text-foreground">Ask OMNIA</span>
            <span className="text-[10px] text-muted-foreground ml-2">AI Assistant</span>
          </div>
        </div>
        {onToggleExpand && (
          <button 
            onClick={onToggleExpand}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
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
              <Sparkles className="h-8 w-8 text-primary/50 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                Pregúntame sobre ventas, operaciones o alertas
              </p>
            </div>
          )}
          
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={cn(
                "flex gap-3",
                msg.role === 'user' && "justify-end"
              )}
            >
              {msg.role === 'assistant' && (
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
              )}
              <div className={cn(
                "max-w-[85%] rounded-xl px-4 py-2.5 text-sm",
                msg.role === 'user' 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-foreground"
              )}>
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
              {msg.role === 'user' && (
                <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                <Bot className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <div className="bg-muted rounded-xl px-4 py-3 flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">Analizando...</span>
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
              className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-border/40">
        <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-4 py-2 border border-border/50 focus-within:border-primary/50 transition-colors">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pregunta sobre tu negocio..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className={cn(
              "p-2 rounded-lg transition-all",
              input.trim() && !isTyping
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground"
            )}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
