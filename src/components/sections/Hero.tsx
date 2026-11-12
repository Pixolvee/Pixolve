import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, Code2, MoveRight } from "lucide-react";

// ─── Animated Code Block ──────────────────────────────────────────────────────

type Token = { text: string; color?: string };
type CodeLine = Token[];

const CODE_LINES: CodeLine[] = [
  [
    { text: "const ", color: "text-[#ffe400]" },
    { text: "product", color: "text-[#75a8ff]" },
    { text: " = " },
    { text: "await", color: "text-[#7de2ae]" },
    { text: " pixolve.build({" },
  ],
  [{ text: "  vision: ", color: "text-blue-200" }, { text: '"your next advantage"', color: "text-[#ffcc9b]" }, { text: "," }],
  [{ text: "  scale: ", color: "text-blue-200" }, { text: '"enterprise-ready"', color: "text-[#ffcc9b]" }, { text: "," }],
  [{ text: "  quality: ", color: "text-blue-200" }, { text: "99.9", color: "text-[#ffe400]" }],
  [{ text: "}); " }, { text: "// ship with confidence", color: "text-[#7de2ae]" }],
  [],
  [
    { text: "await", color: "text-[#7de2ae]" },
    { text: " " },
    { text: "pixolve", color: "text-[#75a8ff]" },
    { text: "." },
    { text: "deploy", color: "text-[#ffe400]" },
    { text: "({" },
  ],
  [{ text: "  target: ", color: "text-blue-200" }, { text: '"production"', color: "text-[#ffcc9b]" }, { text: "," }],
  [{ text: "  region: ", color: "text-blue-200" }, { text: '"ap-southeast-1"', color: "text-[#ffcc9b]" }, { text: "," }],
  [{ text: "  replicas: ", color: "text-blue-200" }, { text: "3", color: "text-[#ffe400]" }, { text: "," }],
  [{ text: "  healthCheck: ", color: "text-blue-200" }, { text: '"/api/health"', color: "text-[#ffcc9b]" }],
  [{ text: "});" }],
];

function lineToPlainText(line: CodeLine) {
  return line.map((t) => t.text).join("");
}

function AnimatedCodeBlock() {
  const [completedLines, setCompletedLines] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const CHAR_DELAY = 26;
  const LINE_PAUSE = 160;
  const RESTART_DELAY = 3000;

  useEffect(() => {
    if (done) {
      timerRef.current = setTimeout(() => {
        setCompletedLines(0);
        setTypedChars(0);
        setDone(false);
      }, RESTART_DELAY);
      return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }

    if (completedLines >= CODE_LINES.length) {
      setDone(true);
      return;
    }

    const currentLine = CODE_LINES[completedLines];
    const lineText = lineToPlainText(currentLine);

    if (typedChars < lineText.length) {
      timerRef.current = setTimeout(() => setTypedChars((c) => c + 1), CHAR_DELAY);
    } else {
      timerRef.current = setTimeout(() => {
        setCompletedLines((l) => l + 1);
        setTypedChars(0);
      }, LINE_PAUSE);
    }

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [completedLines, typedChars, done]);

  // cursor blink
  useEffect(() => {
    const id = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  function renderLine(lineIdx: number) {
    const line = CODE_LINES[lineIdx];
    if (!line || line.length === 0) return <>&nbsp;</>;

    const isCurrentLine = lineIdx === completedLines;
    const lineText = lineToPlainText(line);
    const revealedCount = isCurrentLine ? typedChars : lineIdx < completedLines ? lineText.length : 0;

    let used = 0;
    return line.map((token, ti) => {
      const start = used;
      used += token.text.length;
      if (revealedCount <= start) return null;
      const visible = token.text.slice(0, revealedCount - start);
      return (
        <span key={ti} className={token.color ?? "text-blue-100"}>
          {visible}
        </span>
      );
    });
  }

  const totalDisplayedLines = done ? CODE_LINES.length : completedLines + 1;

  return (
    <div
      className="relative overflow-hidden rounded-[1.75rem] border border-white/20 bg-[#00102f]/75 shadow-2xl backdrop-blur"
      data-testid="hero-code-card"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff6b6b]" />
          <span className="size-2.5 rounded-full bg-[#ffe400]" />
          <span className="size-2.5 rounded-full bg-[#7de2ae]" />
        </div>
        <span className="font-mono text-[10px] text-blue-200">Pixolve / delivery-system</span>
        <Code2 className="size-4 text-[#ffe400]" />
      </div>

      {/* Code lines */}
      <div className="p-5 font-mono text-xs leading-6 sm:p-7">
        <div className="grid grid-cols-[auto_1fr] gap-4">
          {/* Line numbers */}
          <div className="select-none space-y-[0.95rem] text-blue-300/50">
            {CODE_LINES.map((_, i) => (
              <span
                key={i}
                className={`block transition-opacity duration-200 ${i < totalDisplayedLines ? "opacity-100" : "opacity-0"}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            ))}
          </div>

          {/* Code */}
          <div className="space-y-[0.95rem]">
            {CODE_LINES.map((_, lineIdx) => {
              const isActive = lineIdx === completedLines && !done;
              const isVisible = lineIdx < totalDisplayedLines;
              return (
                <div
                  key={lineIdx}
                  className={`min-h-[1.2em] transition-opacity duration-200 ${isVisible ? "opacity-100" : "opacity-0"}`}
                >
                  {renderLine(lineIdx)}
                  {isActive && (
                    <span
                      className="ml-px inline-block h-[0.9em] w-[2px] align-middle rounded-sm bg-[#ffe400]"
                      style={{ opacity: showCursor ? 1 : 0, transition: "opacity 0.08s" }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-2 border-t border-white/10 px-5 py-2.5">
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7de2ae] opacity-50" />
          <span className="relative inline-flex size-2 rounded-full bg-[#7de2ae]" />
        </span>
        <span className="font-mono text-[10px] text-[#7de2ae]">
          {done ? "Build complete — deployed successfully" : "Building…"}
        </span>
      </div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#00153d_0%,#002365_58%,#053082_100%)] pt-24 text-white sm:pt-32"
      data-testid="hero-section"
    >
      <div className="absolute -right-32 top-8 -z-10 h-[520px] w-[520px] rounded-full bg-[#ffe400]/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-64 w-64 rounded-full bg-[#75a8ff]/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-14 sm:pb-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-24">
        {/* Left copy */}
        <div data-testid="hero-copy">
          <h1
            className="max-w-3xl font-heading text-3xl font-extrabold leading-[1.04] tracking-[-0.04em] sm:text-5xl lg:text-6xl"
            data-testid="hero-headline"
          >
            Bangun produk digital yang{" "}
            <span className="text-[#ffe400]">bergerak lebih cepat.</span>
          </h1>
          <p
            className="mt-5 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base"
            data-testid="hero-subheadline"
          >
            Pixolve adalah software house untuk tim yang ingin mengubah ide kompleks menjadi Web
            Platform, Mobile App, Data Science, dan UI/UX yang siap dipakai dan siap scale.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row" data-testid="hero-actions">
            <a
              href="#quote-form"
              className="inline-flex items-center justify-center rounded-full bg-[#ffe400] px-6 py-4 text-sm font-bold text-[#00153d] transition-transform hover:-translate-y-1"
              data-testid="hero-consultation-cta"
            >
              Mulai Konsultasi Gratis <MoveRight className="ml-2 size-4" />
            </a>
            <a
              href="#portofolio"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-4 text-sm font-bold text-white hover:border-[#ffe400] hover:text-[#ffe400]"
              data-testid="hero-portfolio-cta"
            >
              Eksplor Portofolio <ArrowDownRight className="ml-2 size-4" />
            </a>
          </div>
        </div>

        {/* Right: animated code card */}
        <div className="relative hidden lg:block animate-float-soft" data-testid="hero-product-visual">
          <div className="absolute -inset-4 rounded-[2rem] bg-[#ffe400]/10 blur-2xl" />
          <AnimatedCodeBlock />
        </div>
      </div>
    </section>
  );
}
