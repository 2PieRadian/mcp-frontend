import { BACKEND_URL } from "./api";
import type { Article, ArticleWithTags, Tag } from "../types/articles";

export async function searchArticles(
  query: string,
  limit: number = 5
): Promise<Article[]> {
  if (!query.trim()) return [];

  // Convert query to slug format for the API
  const slug = query.toLowerCase().replace(/\s+/g, "-");

  const response = await fetch(
    `${BACKEND_URL}/api/v1/article/related/${encodeURIComponent(slug)}?limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      return [];
    }
    throw new Error("Failed to search articles");
  }

  return response.json();
}

export async function fetchAllArticles(): Promise<Article[]> {
  const response = await fetch(`${BACKEND_URL}/api/v1/article/get-articles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  return response.json();
}

export async function fetchArticleBySlug(
  slug: string
): Promise<ArticleWithTags> {
  const response = await fetch(`${BACKEND_URL}/api/v1/article/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Article not found");
    }
    throw new Error("Failed to fetch article");
  }

  return response.json();
}

export async function fetchTags(limit: number = 10): Promise<Tag[]> {
  const response = await fetch(
    `${BACKEND_URL}/api/v1/article/tags?limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch tags");
  }

  return response.json();
}

export async function fetchTagBySlug(slug: string): Promise<Tag> {
  const response = await fetch(`${BACKEND_URL}/api/v1/article/tags/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Tag not found");
    }
    throw new Error("Failed to fetch tag");
  }

  return response.json();
}

export async function fetchArticlesByTag(tagSlug: string): Promise<Article[]> {
  const response = await fetch(
    `${BACKEND_URL}/api/v1/article/tag/${tagSlug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error("Tag is required");
    }
    throw new Error("Failed to fetch articles by tag");
  }

  return response.json();
}

export async function fetchArticleCount(): Promise<number> {
  const response = await fetch(`${BACKEND_URL}/api/v1/article/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch article count");
  }

  const data = await response.json();
  return data.count;
}
