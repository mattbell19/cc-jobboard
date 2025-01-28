import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  tags: string[];
  imageUrl: string;
  slug: string;
}

import { useBlog } from "../contexts/BlogContext";

const BlogGrid = () => {
  const { posts } = useBlog();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link key={post.id} to={`/blog/${post.slug}`}>
          <Card className="h-full hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48 w-full">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h2 className="text-xl font-bold line-clamp-2">{post.title}</h2>
              <p className="text-muted-foreground line-clamp-3">
                {post.excerpt}
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{post.author}</span>
                <div className="flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default BlogGrid;
