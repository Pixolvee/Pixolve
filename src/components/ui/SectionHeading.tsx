export function SectionHeading({ eyebrow, title, body, light = false }: { eyebrow: string; title: string; body?: string; light?: boolean }) {
  const slug = eyebrow.toLowerCase().replaceAll(" ", "-");
  return (
    <div className="max-w-2xl" data-testid={`section-heading-${slug}`}>
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#ffe400]" data-testid={`section-eyebrow-${slug}`}>{eyebrow}</p>
      <h2 className={`font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl ${light ? "text-white" : "text-[#002365]"}`} data-testid={`section-title-${slug}`}>{title}</h2>
      {body && <p className={`mt-5 text-base leading-8 ${light ? "text-blue-100" : "text-slate-600"}`} data-testid={`section-body-${slug}`}>{body}</p>}
    </div>
  );
}