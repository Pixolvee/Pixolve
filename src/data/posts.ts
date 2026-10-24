export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  duration: string;
  date: string;
  content: Block[];
};

export const posts: Post[] = [];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);