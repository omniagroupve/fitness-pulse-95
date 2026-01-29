import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface FuturisticCardProps {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
  hover?: boolean;
}

export function FuturisticCard({ 
  children, 
  className,
  gradient = false,
  hover = true
}: FuturisticCardProps) {
  return (
    <div
      className={cn(
        // Base glassmorphism
        "relative rounded-2xl border border-border/50",
        "bg-card/80 backdrop-blur-xl",
        "shadow-[0_8px_32px_rgba(0,0,0,0.08)]",
        // Hover effects
        hover && "transition-all duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] hover:border-border",
        hover && "hover:-translate-y-1",
        // Optional gradient overlay
        gradient && "bg-gradient-to-br from-card/90 to-card/70",
        className
      )}
    >
      {/* Subtle inner glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
