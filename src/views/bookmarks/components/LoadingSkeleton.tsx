import { Card, CardContent } from "@/components/ui/card";

function SkeletonCard({ index }: { index: number }) {
  return (
    <Card
      className="bg-card/50 border-border/50 animate-stagger-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <CardContent className="p-4">
        {/* Header skeleton */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg skeleton" />
          <div className="flex-1">
            <div className="h-5 w-3/4 skeleton rounded mb-2" />
            <div className="h-4 w-1/2 skeleton rounded" />
          </div>
          <div className="w-8 h-8 skeleton rounded" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-4 w-full skeleton rounded" />
          <div className="h-4 w-5/6 skeleton rounded" />
          <div className="h-4 w-4/6 skeleton rounded" />
        </div>

        {/* Tags skeleton */}
        <div className="flex gap-1.5 mb-4">
          <div className="h-5 w-16 skeleton rounded-full" />
          <div className="h-5 w-20 skeleton rounded-full" />
          <div className="h-5 w-14 skeleton rounded-full" />
        </div>

        {/* Footer skeleton */}
        <div className="flex items-center gap-4 pt-2 border-t border-border/30">
          <div className="h-4 w-12 skeleton rounded" />
          <div className="h-4 w-16 skeleton rounded" />
          <div className="h-4 w-16 skeleton rounded" />
        </div>
      </CardContent>
    </Card>
  );
}

export function LoadingSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 pb-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonCard key={index} index={index} />
      ))}
    </div>
  );
}

