import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'text'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  icon?: ReactNode
  children: ReactNode
}

const variants = {
  primary: 'bg-primary text-white hover:opacity-90 active:scale-[0.98]',
  secondary: 'border border-[#333] text-white hover:bg-[#222]',
  ghost: 'text-text-secondary hover:text-white hover:bg-bg-card',
  danger: 'bg-danger text-white hover:opacity-90',
  text: 'text-primary hover:underline',
}

const sizes = {
  sm: 'px-3 py-1.5 text-caption',
  md: 'px-5 py-2.5 text-body',
  lg: 'px-6 py-3 text-body',
}

export function Button({ variant = 'primary', size = 'md', fullWidth, loading, icon, children, className = '', disabled, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : icon ? icon : null}
      {children}
    </button>
  )
}
