export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: unknown; // TipTap JSON content
  authorName: string;
  coverImage: string | null;
  status: "PUBLISHED" | "DRAFT";
  createdAt: string;
  updatedAt: string;
}

export interface ArticleWithTags extends Article {
  tags: Array<{
    articleId: number;
    tagId: number;
    createdAt: string;
    updatedAt: string;
  }>;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    articles: number;
  };
}
