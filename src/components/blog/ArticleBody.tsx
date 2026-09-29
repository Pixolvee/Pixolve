import type { Block } from "@/data/posts";

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h2":
      return <h2 key={i} className="mt-12 font-sans text-2xl font-bold tracking-tight text-slate-900">{block.text}</h2>;
    case "quote":
      return (
        <blockquote key={i} className="my-10 border-l-4 border-[#0e9f85] pl-6 text-2xl italic leading-snug text-slate-700">
          {block.text}
        </blockquote>
      );
    case "ul":
      return (
        <ul key={i} className="my-6 list-disc space-y-2 pl-6 marker:text-[#0e9f85]">
          {block.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      );
    default:
      return <p key={i} className="mt-6">{block.text}</p>;
  }
}

export function ArticleBody({ content }: { content: Block[] }) {
  return (
    <div className="mt-10 font-serif text-[21px] leading-[1.75] text-slate-800" data-testid="article-body">
      {content.map(renderBlock)}
    </div>
  );
}