import React, { forwardRef, useState, useRef } from "react";
import { cn } from "../../lib/utils"; // Assuming you have a cn utility function

const shinyButtonVariants = {
  base: `
    relative 
    inline-flex 
    items-center 
    justify-center 
    overflow-hidden 
    rounded-lg 
    transition-all 
    duration-300 
    ease-out 
    focus:outline-none 
    focus:ring-2 
    focus:ring-offset-2
  `,
  variant: {
    default: "bg-black text-white hover:bg-zinc-800 focus:ring-zinc-500",
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-400",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
  },
  size: {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-8 px-3 py-1 text-xs",
    lg: "h-12 px-6 py-3 text-base",
  },
  disabled: "opacity-50 cursor-not-allowed pointer-events-none",
};

// TypeScript interface for props
interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof shinyButtonVariants.variant;
  size?: keyof typeof shinyButtonVariants.size;
}

const ShinyButton = forwardRef<HTMLButtonElement, ShinyButtonProps>(({
  children = "Button",
  className = "",
  variant = "default",
  size = "default",
  disabled,
  ...props
}, ref) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Use the forwarded ref or the internal ref
  const resolvedRef = (ref || buttonRef) as React.RefObject<HTMLButtonElement>;

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Reset shine effect when mouse leaves
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // Ensure shine effect works with mouse enter
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  return (
    <button
      ref={resolvedRef}
      className={cn(
        shinyButtonVariants.base,
        shinyButtonVariants.variant[variant],
        shinyButtonVariants.size[size],
        disabled && shinyButtonVariants.disabled,
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-disabled={disabled}
      disabled={disabled}
      {...props}
    >
      {/* Shine overlay */}
      <div 
        className={cn(
          "absolute top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-300",
          isHovering && !disabled ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `radial-gradient(
            circle 120px at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(255,255,255,0.3), 
            transparent 50%
          )`
        }}
      />
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </button>
  );
});

ShinyButton.displayName = 'ShinyButton';

export default ShinyButton;