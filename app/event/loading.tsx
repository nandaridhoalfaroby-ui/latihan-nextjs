export default function MemuatKatalog() {
  return (
    <div>
      <div className="mb-4 h-8 w-48 animate-pulse rounded-full bg-[#FFFBEB] border border-orange-100" />
      <div className="mb-5 flex gap-2">
        <div className="h-8 w-24 animate-pulse rounded-full bg-[#FFFBEB] border border-orange-100" />
        <div className="h-8 w-32 animate-pulse rounded-full bg-[#FFFEF7] border border-orange-100" />
        <div className="h-8 w-28 animate-pulse rounded-full bg-[#FFC837]/40 border border-amber-200" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded- bg-[#FFFEF7] border border-orange-100 p-5 shadow-sm">
            <div className="h-6 w-24 animate-pulse rounded-full bg-[#FFFBEB] border border-orange-100" />
            <div className="mt-4 h-5 w-3/4 animate-pulse rounded-full bg-[#FFFBEB]" />
            <div className="mt-2 h-4 w-1/2 animate-pulse rounded-full bg-[#FFFBEB]" />
            <div className="mt-4 h-6 w-1/3 animate-pulse rounded-full bg-[#FFFBEB]" />
            <div className="mt-4 h-2 w-full animate-pulse rounded-full bg-[#FFFBEB]" />
            <div className="mt-4 h-10 w-full animate-pulse rounded-full bg-[#FFC837]/40" />
          </div>
        ))}
      </div>
    </div>
  );
}