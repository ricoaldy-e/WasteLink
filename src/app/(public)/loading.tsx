import Image from 'next/image';

export default function PublicRootLoading() {
  return (
    <div className="min-h-[75vh] w-full flex flex-col items-center justify-center bg-background select-none">
      <div className="flex flex-col items-center">
        <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#299E63"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="80 150"
              className="animate-spin origin-center"
              style={{ animationDuration: '1.2s' }}
            />
          </svg>

          <div className="relative w-16 h-16 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center p-2.5">
            <Image
              src="/logo.png"
              alt="WasteLink Logo"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="text-center flex flex-col items-center space-y-1.5">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-green select-none">
            Waste<span className="text-text-primary">Link</span>
          </h2>
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-text-secondary select-none animate-pulse">
            #ubahjadikebaikan
          </p>
        </div>
      </div>
    </div>
  );
}
