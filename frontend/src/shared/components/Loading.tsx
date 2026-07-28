export function Spinner({ size = 24 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center p-8">
      <span
        className="inline-block border-2 border-primary/30 border-t-primary rounded-full animate-spin"
        style={{ width: size, height: size }}
      />
    </div>
  )
}

export function PageLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <Spinner size={32} />
        <p className="text-text-muted text-caption">Loading...</p>
      </div>
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="bg-bg-card rounded-xl p-4 animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-[#222]" />
        <div className="flex-1">
          <div className="h-4 bg-[#222] rounded w-1/3 mb-1" />
          <div className="h-3 bg-[#222] rounded w-1/4" />
        </div>
      </div>
      <div className="aspect-[9/16] bg-[#222] rounded-xl mb-3" />
      <div className="h-4 bg-[#222] rounded w-3/4 mb-2" />
      <div className="h-3 bg-[#222] rounded w-1/2" />
    </div>
  )
}

export function FeedSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
    </div>
  )
}
