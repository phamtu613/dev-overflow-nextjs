"use client";

import { FilterDropdown } from "@/components/shared/filter-dropdown";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowUpRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  image?: string;
  featured?: boolean;
}

const mockBlogs: BlogPost[] = [
  {
    id: "1",
    title: "Best Web Dev Roadmap 2023 - The Winning Formula to Master Search",
    excerpt:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    author: {
      name: "Olivia Rhye",
      avatar: "/avatar.png",
    },
    date: "20 Jan 2022",
    image: "/thumbnail-blog.png",
    featured: true,
  },
  {
    id: "2",
    title: "Migrating to Linear 101",
    excerpt:
      "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
    author: {
      name: "Phoenix Baker",
      avatar: "/avatar.png",
    },
    date: "19 Jan 2022",
    image: "/thumbnail-blog.png",
  },
  {
    id: "3",
    title: "Building your API Stack",
    excerpt:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    author: {
      name: "Lana Steiner",
      avatar: "/avatar.png",
    },
    date: "18 Jan 2022",
    image: "/thumbnail-blog.png",
  },
];

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Popular");

  const featuredPost = mockBlogs.find((blog) => blog.featured);
  const regularPosts = mockBlogs.filter((blog) => !blog.featured);

  return (
    <div className="px-12 pb-16">
      {/* Header */}
      <h1 className="mb-10 text-[30px] font-bold leading-[42px] tracking-[-0.03em] text-dark-100 dark:text-light-900">
        Overflow Blog
      </h1>

      {/* Search and Filter */}
      <div className="mb-16 flex flex-col gap-7 sm:flex-row">
        {/* Search */}
        <div className="relative flex-1 max-w-[609px]">
          <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-light-400" />
          <Input
            type="text"
            placeholder="Search by title or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-14 rounded-[10px] border-light-700 bg-light-800 pl-12 text-base text-dark-100 placeholder:text-light-400 dark:border-dark-400 dark:bg-dark-300 dark:text-light-900"
          />
        </div>

        {/* Filter Dropdown */}
        <FilterDropdown
          value={sortBy}
          onValueChange={setSortBy}
          options={{
            Popular: "Most Popular",
            Recent: "Most Recent",
            Oldest: "Oldest",
          }}
        />
      </div>

      {/* Blog Content */}
      <div className="flex max-w-[1070px] flex-col gap-12">
        {/* Featured Blog Post */}
        {featuredPost && (
          <Link href={`/blogs/${featuredPost.id}`}>
            <Card className="group flex cursor-pointer flex-col gap-8 overflow-hidden border-0 bg-transparent p-0 shadow-none transition-opacity hover:opacity-90 sm:flex-row">
              {/* Image */}
              <div className="relative h-80 w-full shrink-0 overflow-hidden rounded-[20px] bg-light-800 dark:bg-dark-400 sm:h-80 sm:w-[560px]">
                {featuredPost.image ? (
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-linear-to-br from-light-800 to-light-700 dark:from-dark-400 dark:to-dark-500" />
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-6">
                {/* Heading and Subheading */}
                <div className="flex flex-col gap-4">
                  {/* Heading and Text */}
                  <div className="flex flex-col gap-3">
                    <h2 className="text-2xl font-semibold leading-[31.2px] text-dark-300 dark:text-light-900">
                      {featuredPost.title}
                    </h2>
                    <p className="text-base leading-[22.4px] text-dark-500 dark:text-light-500">
                      {featuredPost.excerpt}
                    </p>
                  </div>
                </div>

                {/* Avatar Label Group */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-light-800 dark:bg-dark-400">
                    {featuredPost.author.avatar ? (
                      <Image
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-linear-to-br from-purple-200 to-purple-400" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-base font-semibold leading-[20.8px] text-dark-500 dark:text-light-700">
                      {featuredPost.author.name}
                    </p>
                    <p className="text-sm leading-[19.6px] text-light-500">
                      {featuredPost.date}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        )}

        {/* Regular Blog Posts Row */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {regularPosts.map((post) => (
            <Link key={post.id} href={`/profiles/blogs/${post.id}`}>
              <Card className="group flex cursor-pointer flex-col gap-8 overflow-hidden border-0 bg-transparent p-0 shadow-none transition-opacity hover:opacity-90">
                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden rounded-[20px] bg-light-800 dark:bg-dark-400">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-linear-to-br from-light-800 to-light-700 dark:from-dark-400 dark:to-dark-500" />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-6">
                  {/* Heading and Subheading */}
                  <div className="flex flex-col gap-4">
                    {/* Heading and Text */}
                    <div className="flex flex-col gap-2">
                      {/* Heading and Icon */}
                      <div className="flex items-start gap-4">
                        <h3 className="flex-1 text-2xl font-semibold leading-[31.2px] text-dark-300 dark:text-light-900">
                          {post.title}
                        </h3>
                        <div className="pt-1">
                          <ArrowUpRight className="h-6 w-6 text-dark-300 dark:text-light-900" />
                        </div>
                      </div>
                      <p className="text-base leading-[22.4px] text-dark-500 dark:text-light-500">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Avatar Label Group */}
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-light-800 dark:bg-dark-400">
                      {post.author.avatar ? (
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-linear-to-br from-orange-200 to-orange-400" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <p className="text-base font-semibold leading-[20.8px] text-dark-400 dark:text-light-700">
                        {post.author.name}
                      </p>
                      <p className="text-sm leading-[19.6px] text-light-500">
                        {post.date}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
