import { TopPost } from "@/types";
import { QuestionCard } from "./question-card";

interface TopPostsProps {
  posts: TopPost[];
}

export function TopPosts({ posts }: TopPostsProps) {
  const transformedPosts = posts.map((post) => ({
    ...post,
    answer: post.answers,
    excerpt: "",
  }));

  return (
    <div className="bg-white dark:bg-[#11141C] transition pr-11 pb-9 pl-11">
      <h2 className="text-xl font-bold text-color-foreground mb-6">
        Top Posts
      </h2>

      <div className="space-y-6">
        {transformedPosts.map((post) => (
          <QuestionCard key={post.id} question={post} />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
          Load More
        </button>
      </div>
    </div>
  );
}
