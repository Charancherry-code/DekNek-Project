export default function Spinner({ label = "Loading..." }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="rounded-2xl border border-cyan-400/30 bg-slate-900/80 p-6 text-center shadow-[0_0_50px_-20px_rgba(34,211,238,0.6)] backdrop-blur-sm">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-cyan-300/30 border-t-cyan-300" />
        <p className="mt-3 text-sm text-slate-200">{label}</p>
      </div>
    </div>
  );
}
