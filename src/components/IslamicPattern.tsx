export function IslamicPattern({ className = "", opacity = 0.05 }: { className?: string; opacity?: number }) {
  return (
    <svg 
      className={className}
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg" 
      width="100%" 
      height="100%"
    >
      <defs>
        <pattern id="islamic-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path 
            d="M 40 0 L 50 10 L 40 20 L 30 10 Z M 0 40 L 10 30 L 20 40 L 10 50 Z M 80 40 L 70 30 L 60 40 L 70 50 Z M 40 80 L 30 70 L 40 60 L 50 70 Z M 40 40 m -15 0 a 15 15 0 1 0 30 0 a 15 15 0 1 0 -30 0" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#islamic-pattern)" />
    </svg>
  );
}

export function ArchPattern({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 200 100" 
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path 
        d="M 0 100 L 0 40 Q 0 0 40 0 L 60 0 Q 100 0 100 40 Q 100 0 140 0 L 160 0 Q 200 0 200 40 L 200 100 Z" 
        fill={color}
      />
    </svg>
  );
}

export function GeometricBorder({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="100%" height="4" xmlns="http://www.w3.org/2000/svg">
      <pattern id="geo-border" x="0" y="0" width="20" height="4" patternUnits="userSpaceOnUse">
        <rect x="0" y="0" width="8" height="4" fill="currentColor" />
        <rect x="12" y="0" width="8" height="4" fill="currentColor" opacity="0.5" />
      </pattern>
      <rect x="0" y="0" width="100%" height="4" fill="url(#geo-border)" />
    </svg>
  );
}