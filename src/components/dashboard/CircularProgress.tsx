import { cn } from '@/lib/utils';

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'destructive';
  showValue?: boolean;
  label?: string;
  sublabel?: string;
  className?: string;
}

const sizeConfig = {
  sm: { size: 80, stroke: 6, fontSize: 'text-lg' },
  md: { size: 120, stroke: 8, fontSize: 'text-2xl' },
  lg: { size: 160, stroke: 10, fontSize: 'text-3xl' },
};

const colorConfig = {
  primary: 'stroke-primary',
  secondary: 'stroke-secondary',
  success: 'stroke-success',
  warning: 'stroke-warning',
  destructive: 'stroke-destructive',
};

export function CircularProgress({
  value,
  max = 100,
  size = 'md',
  color = 'primary',
  showValue = true,
  label,
  sublabel,
  className,
}: CircularProgressProps) {
  const config = sizeConfig[size];
  const radius = (config.size - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min((value / max) * 100, 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative" style={{ width: config.size, height: config.size }}>
        {/* Background circle */}
        <svg
          className="absolute inset-0 -rotate-90"
          width={config.size}
          height={config.size}
        >
          <circle
            cx={config.size / 2}
            cy={config.size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={config.stroke}
            className="text-muted/30"
          />
          {/* Progress circle */}
          <circle
            cx={config.size / 2}
            cy={config.size / 2}
            r={radius}
            fill="none"
            strokeWidth={config.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={cn(
              colorConfig[color],
              "transition-all duration-1000 ease-out"
            )}
            style={{
              filter: `drop-shadow(0 0 8px hsl(var(--${color}) / 0.4))`,
            }}
          />
        </svg>
        
        {/* Center content */}
        {showValue && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn("font-bold text-foreground", config.fontSize)}>
              {typeof value === 'number' && value % 1 !== 0 ? value.toFixed(1) : value}
            </span>
            {sublabel && (
              <span className="text-xs text-muted-foreground">{sublabel}</span>
            )}
          </div>
        )}
      </div>
      
      {label && (
        <span className="text-sm font-medium text-muted-foreground text-center">
          {label}
        </span>
      )}
    </div>
  );
}
