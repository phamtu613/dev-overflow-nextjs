"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  BookmarkPlus,
  Calendar,
  Eye,
  Share2,
  ThumbsUp,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface BlogDetail {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  date: string;
  readTime: string;
  views: number;
  likes: number;
  image: string;
  tags: string[];
  relatedPosts: {
    id: string;
    title: string;
    image: string;
  }[];
}

// Mock blog data - would come from API/database
const mockBlogDetail: BlogDetail = {
  id: "1",
  title: "Best Web Dev Roadmap 2023 - The Winning Formula to Master Search",
  excerpt:
    "How do you create compelling presentations that wow your colleagues and impress your managers?",
  content: `
    <h2>Introduction</h2>
    <p>Web development is an ever-evolving field, and staying up-to-date with the latest technologies and best practices is crucial for success. In this comprehensive guide, we'll explore the best web development roadmap for 2023.</p>
    
    <h2>Getting Started</h2>
    <p>Before diving into advanced topics, it's essential to build a strong foundation. Start with HTML, CSS, and JavaScript - the core building blocks of web development.</p>
    
    <h3>HTML Fundamentals</h3>
    <p>HTML (HyperText Markup Language) is the backbone of every webpage. Understanding semantic HTML, accessibility, and modern HTML5 features is crucial.</p>
    
    <h3>CSS Mastery</h3>
    <p>CSS allows you to style your web pages beautifully. Learn about:</p>
    <ul>
      <li>Flexbox and Grid layouts</li>
      <li>Responsive design principles</li>
      <li>CSS preprocessors like Sass</li>
      <li>Modern CSS features and animations</li>
    </ul>
    
    <h3>JavaScript Essentials</h3>
    <p>JavaScript brings interactivity to your websites. Focus on:</p>
    <ul>
      <li>ES6+ features</li>
      <li>Asynchronous programming</li>
      <li>DOM manipulation</li>
      <li>Fetch API and AJAX</li>
    </ul>
    
    <h2>Modern Frameworks and Libraries</h2>
    <p>Once you have a solid foundation, explore modern frameworks that will boost your productivity:</p>
    
    <h3>React</h3>
    <p>React is one of the most popular JavaScript libraries for building user interfaces. Its component-based architecture makes it easy to build and maintain large applications.</p>
    
    <h3>Next.js</h3>
    <p>Next.js is a powerful React framework that enables server-side rendering, static site generation, and many other performance optimizations out of the box.</p>
    
    <h2>Backend Development</h2>
    <p>To become a full-stack developer, you'll need to understand backend technologies as well. Consider learning Node.js, Express, and databases like MongoDB or PostgreSQL.</p>
    
    <h2>Conclusion</h2>
    <p>The journey to becoming a proficient web developer takes time and dedication. Follow this roadmap, practice consistently, and build real-world projects to solidify your skills. Remember, the best way to learn is by doing!</p>
  `,
  author: {
    name: "Olivia Rhye",
    avatar: "/avatar.png",
    bio: "Senior Web Developer & Tech Writer with 8+ years of experience in full-stack development.",
  },
  date: "20 Jan 2022",
  readTime: "8 min read",
  views: 2450,
  likes: 156,
  image: "/thumbnail-blog.png",
  tags: ["Web Development", "JavaScript", "React", "Career"],
  relatedPosts: [
    {
      id: "2",
      title: "Migrating to Linear 101",
      image: "/thumbnail-blog.png",
    },
    {
      id: "3",
      title: "Building your API Stack",
      image: "/thumbnail-blog.png",
    },
  ],
};

export default function BlogsDetailPage() {
  const params = useParams();
  const blog = mockBlogDetail; // Would fetch based on params.id

  return (
    <div className="px-4 py-8 sm:px-8 lg:px-12 lg:py-16">
      {/* Back Button */}
      <Link
        href="/profiles/blogs"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-dark-400 transition-colors hover:text-dark-300 dark:text-light-500 dark:hover:text-light-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blogs
      </Link>

      {/* Main Content Container */}
      <div className="">
        {/* Article Header */}
        <article className="mb-12">
          {/* Tags */}
          <div className="mb-6 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <Badge
                key={tag}
                className="rounded-md bg-light-800 px-3 py-1.5 text-xs font-medium text-light-500 hover:bg-light-700 dark:bg-dark-400 dark:text-light-500 dark:hover:bg-dark-500"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-dark-100 dark:text-light-900 sm:text-4xl lg:text-5xl">
            {blog.title}
          </h1>

          {/* Excerpt */}
          <p className="mb-8 text-lg leading-relaxed text-dark-500 dark:text-light-500">
            {blog.excerpt}
          </p>

          {/* Meta Info */}
          <div className="mb-8 flex flex-wrap items-center gap-6 border-b border-t border-light-700 py-4 dark:border-dark-400">
            <div className="flex items-center gap-2 text-sm text-dark-500 dark:text-light-500">
              <Calendar className="h-4 w-4" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-dark-500 dark:text-light-500">
              <Eye className="h-4 w-4" />
              <span>{blog.views.toLocaleString()} views</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-dark-500 dark:text-light-500">
              <span>•</span>
              <span>{blog.readTime}</span>
            </div>
          </div>

          {/* Author Info */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 overflow-hidden rounded-full bg-light-800 dark:bg-dark-400">
                {blog.author.avatar ? (
                  <Image
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <User className="h-6 w-6 text-light-500" />
                  </div>
                )}
              </div>
              <div>
                <p className="text-base font-semibold text-dark-300 dark:text-light-900">
                  {blog.author.name}
                </p>
                <p className="text-sm text-dark-500 dark:text-light-500">
                  {blog.author.bio}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hidden items-center gap-2 sm:flex">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-light-700 bg-light-800 text-dark-400 hover:bg-light-700 dark:border-dark-400 dark:bg-dark-400 dark:text-light-700 dark:hover:bg-dark-500"
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{blog.likes}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-light-700 bg-light-800 text-dark-400 hover:bg-light-700 dark:border-dark-400 dark:bg-dark-400 dark:text-light-700 dark:hover:bg-dark-500"
              >
                <BookmarkPlus className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-light-700 bg-light-800 text-dark-400 hover:bg-light-700 dark:border-dark-400 dark:bg-dark-400 dark:text-light-700 dark:hover:bg-dark-500"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-2xl bg-light-800 dark:bg-dark-400">
            {blog.image ? (
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="h-full w-full bg-linear-to-br from-light-800 to-light-700 dark:from-dark-400 dark:to-dark-500" />
            )}
          </div>

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none dark:prose-invert
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-dark-300 dark:prose-headings:text-light-900
              prose-h2:mb-4 prose-h2:mt-12 prose-h2:text-3xl
              prose-h3:mb-3 prose-h3:mt-8 prose-h3:text-2xl
              prose-p:mb-6 prose-p:leading-relaxed prose-p:text-dark-500 dark:prose-p:text-light-500
              prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
              prose-li:mb-2 prose-li:text-dark-500 dark:prose-li:text-light-500
              prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline
              prose-strong:font-semibold prose-strong:text-dark-300 dark:prose-strong:text-light-900"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>

        {/* Related Posts */}
        <section className="border-t border-light-700 pt-12 dark:border-dark-400">
          <h2 className="mb-8 text-2xl font-bold text-dark-300 dark:text-light-900">
            Related Articles
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {blog.relatedPosts.map((post) => (
              <Link key={post.id} href={`/profiles/blogs/${post.id}`}>
                <Card className="group cursor-pointer overflow-hidden border-light-border-color bg-light-900 shadow-light-tag-card transition-all hover:shadow-lg dark:border-dark-400 dark:bg-dark-300 dark:shadow-none p-4">
                  <div className="relative aspect-video w-full overflow-hidden bg-light-800 dark:bg-dark-400">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform"
                      />
                    ) : (
                      <div className="h-full w-full bg-linear-to-br from-light-800 to-light-700 dark:from-dark-400 dark:to-dark-500" />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="line-clamp-2 text-lg font-semibold text-dark-300 dark:text-light-900 transition-colors group-hover:text-primary dark:group-hover:text-light-100">
                      {post.title}
                    </h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Mobile Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-3 border-t border-light-700 bg-light-900 p-4 sm:hidden dark:border-dark-400 dark:bg-dark-300">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-light-700 bg-light-800 text-dark-400 dark:border-dark-400 dark:bg-dark-400 dark:text-light-700"
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{blog.likes}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-light-700 bg-light-800 text-dark-400 dark:border-dark-400 dark:bg-dark-400 dark:text-light-700"
          >
            <BookmarkPlus className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-light-700 bg-light-800 text-dark-400 dark:border-dark-400 dark:bg-dark-400 dark:text-light-700"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
