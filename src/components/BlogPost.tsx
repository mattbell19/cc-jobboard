import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { CalendarDays, User } from "lucide-react";
import { useParams } from "react-router-dom";
import { useBlog } from "../contexts/BlogContext";

const BlogPost = () => {
  const { slug } = useParams();
  const { posts } = useBlog();

  const post = posts.find((p) => p.slug === slug) || {
    title: "How to Become a Cabin Crew Member",
    content:
      "Learn the essential steps and requirements to start your career as a cabin crew member...",
    author: "Aviation Expert",
    date: "2024-03-20",
    tags: ["Career Advice", "Aviation", "Cabin Crew"],
    imageUrl:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white overflow-hidden">
      <div className="relative h-[300px] w-full">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            {post.author}
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            {new Date(post.date).toLocaleDateString()}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </CardContent>
    </Card>
  );
};

export default BlogPost;
