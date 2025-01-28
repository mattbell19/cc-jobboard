import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import RichTextEditor from "./RichTextEditor";
import { useBlog } from "../contexts/BlogContext";

const BlogImport = () => {
  const { addPost } = useBlog();
  const { register, handleSubmit: formHandleSubmit } = useForm();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSinglePost = () => {
    if (!title || !content || !author) {
      alert("Please fill in all required fields");
      return;
    }

    const post = {
      title,
      content,
      author,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      imageUrl:
        imageUrl ||
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
      excerpt: content.replace(/<[^>]*>/g, "").substring(0, 150) + "...",
      date: new Date().toISOString(),
    };

    addPost(post);
    window.location.href = "/blog";
  };

  const onSubmitBulk = async (data: { articles: string }) => {
    try {
      const posts = JSON.parse(data.articles);
      posts.forEach((post) => addPost(post));
      window.location.href = "/blog";
    } catch (error) {
      console.error("Failed to parse blog posts:", error);
      alert("Failed to parse blog posts. Please check the JSON format.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Import Blog Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="single">
            <TabsList className="mb-4">
              <TabsTrigger value="single">Single Post</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Import</TabsTrigger>
            </TabsList>

            <TabsContent value="single" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter article title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <RichTextEditor content={content} onChange={setContent} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Enter author name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="e.g. Career Advice, Interview Tips"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Featured Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Enter image URL (optional)"
                  />
                </div>

                <Button onClick={handleSinglePost} className="w-full">
                  Create Post
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="bulk">
              <form
                onSubmit={formHandleSubmit(onSubmitBulk)}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="articles">Paste Articles (JSON format)</Label>
                  <textarea
                    id="articles"
                    className="min-h-[400px] w-full p-4 font-mono text-sm border rounded-lg"
                    placeholder='[
  {
    "title": "Article Title",
    "content": "Article content...",
    "author": "Author Name",
    "tags": ["tag1", "tag2"],
    "imageUrl": "https://..."
  }
]'
                    {...register("articles")}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Import Articles
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogImport;
