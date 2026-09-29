import type { Post } from "@/data/posts";

export function ArticleHero({ post }: { post: Post }) {
  const initials = post.author.name.split(" ").map((w) => w[0]).join("").slice(0, 2);

  return (
    <>
      <span className="rounded-full bg-[#002365]/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#002365]">
        {post.category}
      </span>
      <h1 className="mt-6 font-serif text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl" data-testid="article-title">
        {post.title}
      </h1>
      <p className="mt-4 font-serif text-xl leading-relaxed text-slate-500">{post.excerpt}</p>

      <div className="mt-8 flex items-center gap-3 border-y border-slate-100 py-4">
        <div className="grid size-11 place-items-center rounded-full bg-[#002365] text-sm font-bold text-white">{initials}</div>
        <div className="text-sm">
          <p className="font-semibold text-slate-900">{post.author.name}</p>
          <p className="text-slate-500">{post.author.role} · {post.date} · {post.duration}</p>
        </div>
      </div>
    </>
  );
}