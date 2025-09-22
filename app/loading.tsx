export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 to-blue-900">
      <div className="animate-pulse space-y-4 w-full max-w-md px-4">
        <div className="h-8 bg-white/20 rounded-lg w-3/4 mx-auto"></div>
        <div className="space-y-3">
          <div className="h-16 bg-white/10 rounded-lg"></div>
          <div className="h-16 bg-white/10 rounded-lg"></div>
          <div className="h-16 bg-white/10 rounded-lg"></div>
        </div>
        <div className="h-12 bg-white/20 rounded-lg"></div>
      </div>
    </div>
  );
}
