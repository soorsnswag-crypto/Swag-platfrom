import { Button } from './Button'

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export function ErrorState({ message = 'Something went wrong', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center mb-4">
        <span className="text-2xl">!</span>
      </div>
      <h3 className="text-title font-medium mb-2">Oops!</h3>
      <p className="text-text-muted text-body max-w-xs mb-6">{message}</p>
      {onRetry && <Button onClick={onRetry} variant="secondary">Try Again</Button>}
    </div>
  )
}
