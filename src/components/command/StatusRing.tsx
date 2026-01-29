import { cn } from '@/lib/utils';

interface StatusRingProps {
  value: number;
  max: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'destructive' | 'secondary';
  label?: string;
  sublabel?: string;
  showValue?: boolean;
  className?: string;
}

export function StatusRing({ 
  value, 
  max, 
  size = 'md', 
  color = 'primary',
  label,
  sublabel,
  showValue = true,
  className 
}: StatusRingProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const sizes = {
    sm: { ring: 60, stroke: 4, text: 'text-sm' },
    md: { ring: 80, stroke: 5, text: 'text-lg' },
    lg: { ring: 120, stroke: 6, text: 'text-2xl' }
  };

  const colors = {
    primary: 'stroke-primary',
    success: 'stroke-success',
    warning: 'stroke-warning',
    destructive: 'stroke-destructive',
    secondary: 'stroke-secondary'
  };

  const glows = {
    primary: 'drop-shadow-[0_0_8px_hsl(185,100%,50%,0.4)]',
    success: 'drop-shadow-[0_0_8px_hsl(142,71%,45%,0.4)]',
    warning: 'drop-shadow-[0_0_8px_hsl(38,92%,50%,0.4)]',
    destructive: 'drop-shadow-[0_0_8px_hsl(0,72%,51%,0.4)]',
    secondary: 'drop-shadow-[0_0_8px_hsl(24,95%,53%,0.4)]'
  };

  const { ring, stroke, text } = sizes[size];
  const radius = (ring - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative" style={{ width: ring, height: ring }}>
        {/* Background ring */}
        <svg className="absolute inset-0 -rotate-90" width={ring} height={ring}>
          <circle
            cx={ring / 2}
            cy={ring / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            className="stroke-muted/30"
          />
        </svg>
        
        {/* Progress ring */}
        <svg className={cn("absolute inset-0 -rotate-90", glows[color])} width={ring} height={ring}>
          <circle
            cx={ring / 2}
            cy={ring / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={cn(colors[color], "transition-all duration-700 ease-out")}
          />
        </svg>

        {/* Center value */}
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn("font-bold tabular-nums", text)}>
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>
      
      {(label || sublabel) && (
        <div className="text-center">
          {label && <p className="text-xs font-medium text-foreground">{label}</p>}
          {sublabel && <p className="text-[10px] text-muted-foreground">{sublabel}</p>}
        </div>
      )}
    </div>
  );
}
