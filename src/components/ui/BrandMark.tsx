export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <a href="#hero" className="flex items-center gap-3" data-testid="brand-home-link" aria-label="Pixolve ke beranda">
      <span className="relative flex h-9 w-9 items-center justify-center" data-testid="brand-logo-mark">
        <img src="/Logo/Logo Pixolve.png" alt="Pixolve" className="h-9 w-9 object-contain" />
      </span>
      <span className={`text-xl font-black tracking-tight ${light ? "text-white" : "text-[#002365]"}`} data-testid="brand-logo-text">
        Pix<span className="text-[#ffe400]">olve</span>
      </span>
    </a>
  );
}