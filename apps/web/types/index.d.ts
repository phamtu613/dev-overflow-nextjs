import type React from "react";
export interface Question {
  id: string;
  title: string;
  excerpt: string;
  tags: Tag[];
  author: Author;
  timestamp: string;
  votes: number;
  answer: number;
  views: number;
  content?: string;
  codeSnippet?: string;
}

export interface Tag {
  id: string;
  name: string;
  icon?: string;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
}

export interface HotItem {
  id: string;
  title: string;
  icon: React.ReactNode;
}

export interface PopularTag {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

export interface Answer {
  id: string;
  content: string;
  codeSnippet?: string;
  author: Author;
  timestamp: string;
  votes: number;
  isAccepted: boolean;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  website?: string;
  location?: string;
  joinedDate: string;
  stats: {
    questions: number;
    answers: number;
    goldBadges: number;
    silverBadges: number;
    bronzeBadges: number;
  };
}

export interface TopPost {
  id: string;
  title: string;
  votes: number;
  answers: number;
  views: number;
  tags: Tag[];
  author: Author;
  timestamp: string;
}

export interface TopTagItem {
  id: string;
  name: string;
  icon: string;
  count: number;
}
