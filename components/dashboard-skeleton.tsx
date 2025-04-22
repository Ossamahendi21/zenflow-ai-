export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="h-16 bg-white dark:bg-zen-dark shadow animate-pulse"></div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
            <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
          </div>
          <div className="lg:col-span-1">
            <div className="h-[500px] bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
