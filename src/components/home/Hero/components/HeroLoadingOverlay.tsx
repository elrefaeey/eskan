export default function HeroLoadingOverlay() {
  return (
    <div className="absolute inset-0 z-5 bg-linear-to-br from-gray-200 via-gray-300 to-gray-400 rounded-tr-[60px] rounded-br-[12px] lg:rounded-tr-[180px]">
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-gray-400/30 border-t-primary rounded-full animate-spin" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 border-4 border-transparent border-b-primary rounded-full animate-[spin_1.5s_linear_infinite_reverse]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 font-semibold text-lg animate-pulse">
        جاري التحميل...
      </div>
    </div>
  );
}
