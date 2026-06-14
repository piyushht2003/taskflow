export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-neutral-950/20 to-neutral-950"></div>
      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          TaskFlow
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-400">
          Streamline your project management
        </p>
      </div>

      <div className="relative z-10 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10">
          {children}
        </div>
      </div>
    </div>
  )
}
