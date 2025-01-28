import React, { createContext, useContext, useState } from "react";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  imageUrl: string;
  slug: string;
}

interface BlogContextType {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, "id" | "slug">) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const savedPosts = localStorage.getItem("blog_posts");
    return savedPosts
      ? JSON.parse(savedPosts)
      : [
          {
            id: "1",
            title: "Top 10 Tips for Passing Your Cabin Crew Interview",
            excerpt:
              "Master the art of cabin crew interviews with our expert tips...",
            content:
              "<h2>Master the art of cabin crew interviews with our expert tips.</h2><p>From dress code to body language, learn everything you need to know to succeed in your cabin crew interview.</p><ul><li>Research the airline thoroughly</li><li>Practice common interview questions</li><li>Dress professionally</li><li>Maintain positive body language</li><li>Prepare relevant examples</li></ul>",
            author: "Career Coach",
            date: "2024-03-20",
            tags: ["Interview Tips", "Career Advice"],
            imageUrl:
              "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
            slug: "top-10-tips-cabin-crew-interview",
          },
        ];
  });

  const addPost = (newPost: Omit<BlogPost, "id" | "slug">) => {
    const postWithId = {
      ...newPost,
      id: Math.random().toString(36).substr(2, 9),
      slug: newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    };
    setPosts((prevPosts) => {
      const newPosts = [postWithId, ...prevPosts];
      localStorage.setItem("blog_posts", JSON.stringify(newPosts));
      return newPosts;
    });
  };

  return (
    <BlogContext.Provider value={{ posts, addPost }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
}
