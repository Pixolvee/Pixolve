import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ArticleHero } from "@/components/blog/ArticleHero";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { getPost, posts } from "@/data/posts";

export default function BlogPost() {
  const { slug = "" } = useParams<{ slug: string }>();
  const post = getPost(slug);

  useEffect(() => {
    if (post) document.title = `${post.title} | Pixolve Insights`;
  }, [post]);

  if (!post) {
    return (
      <main className="grid min-h-screen place-items-center px-5 text-center" data-testid="article-not-found">
        <div>
          <h1 className="text-2xl font-bold text-[#002365]">Artikel tidak ditemukan</h1>
          <Link to="/#blog" className="mt-4 inline-block text-sm font-bold text-[#0e9f85]">Kembali ke insight</Link>
        </div>
      </main>
    );
  }

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main className="min-h-screen bg-white" data-testid="article-page">
      <ReadingProgress />

      {/* TODO: ganti blok header ini dengan Navbar dari components/layout */}
      <header className="border-b border-slate-100">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link to="/" className="text-lg font-black tracking-tight text-[#002365]">Pixolve</Link>
          <Link to="/#blog" className="flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-[#002365]" data-testid="article-back-link">
            <ArrowLeft className="size-4" /> Semua insight
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-[680px] px-5 pb-20 pt-12 sm:pt-16">
        <ArticleHero post={post} />
        <ArticleBody content={post.content} />

        <div className="mt-16 rounded-3xl bg-[#eef3f9] p-8">
          <h3 className="font-sans text-lg font-bold text-[#002365]">Punya tantangan serupa?</h3>
          <p className="mt-2 font-sans text-sm text-slate-600">Ceritakan kebutuhan Anda, kami bantu petakan langkah paling masuk akal.</p>
          <Link to="/#quote-form" className="mt-5 inline-flex items-center gap-1 font-sans text-sm font-bold text-[#002365]">
            Diskusi dengan kami <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </article>

      <RelatedPosts posts={related} />
    </main>
  );
}