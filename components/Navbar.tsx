"use client";

/* Header: title, version, gradient hairline */
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-md border-b border-white/[0.06]">
      <div className="mx-auto flex h-[86px] max-w-[1400px] items-center px-4 sm:px-8">
        <div className="flex flex-col justify-center">
          <div className="text-[1.25rem] font-semibold leading-tight text-white sm:text-[1.35rem]">
            Eternal Wallet
          </div>
          <span className="mt-0.5 text-[9px] leading-none text-white/40">
            v2.0.16.0
          </span>
        </div>
      </div>
      <div
        className="h-[3px] w-full"
        style={{
          background:
            "linear-gradient(90deg, #44fff9 0%, #7188ff 22%, #ff5178 48%, #ffb719 72%, rgba(209,83,209,0.45) 88%, transparent 100%)",
        }}
      />
    </header>
  );
}
