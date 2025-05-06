"use client"

export function HomeLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="h-6 bg-muted rounded w-32"></div>
              <div className="h-12 bg-muted rounded w-3/4 max-w-xl"></div>
              <div className="h-4 bg-muted rounded w-2/3 max-w-lg"></div>
              <div className="h-4 bg-muted rounded w-1/2 max-w-md"></div>
              <div className="flex space-x-4 mt-4">
                <div className="h-10 bg-muted rounded w-32"></div>
                <div className="h-10 bg-muted rounded w-32"></div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="h-[400px] w-[400px] bg-muted rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-background rounded-xl p-6 animate-pulse">
                <div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
                <div className="h-6 bg-muted rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-pulse">
            <div className="h-6 bg-muted rounded w-32 mx-auto mb-4"></div>
            <div className="h-10 bg-muted rounded w-2/3 mx-auto mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-background rounded-xl p-6 animate-pulse">
                <div className="h-8 bg-muted rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-muted rounded w-full mb-4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeLoading
