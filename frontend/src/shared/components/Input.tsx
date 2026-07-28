import { forwardRef, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && <label className="text-caption text-text-secondary font-medium">{label}</label>}
        <input
          ref={ref}
          className={`w-full px-4 py-3 rounded-xl bg-bg-secondary border ${error ? 'border-danger' : 'border-border'} text-white placeholder:text-text-disabled text-body outline-none transition-colors duration-150 focus:border-primary ${className}`}
          {...props}
        />
        {error && <span className="text-small text-danger">{error}</span>}
        {helperText && !error && <span className="text-small text-text-muted">{helperText}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'
