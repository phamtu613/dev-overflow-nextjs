import { QuestionList } from "@/components/question-list";
import { HotNetwork } from "@/components/hot-network";
import { PopularTags } from "@/components/popular-tags";
import { hotNetworkItems, popularTags, questions } from "@/lib/mock-data";
import {
  Bell,
  Flame,
  LayoutGrid,
  Search,
  Sparkles,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const quickStats = [
  { label: "Questions Today", value: "1.2K", note: "+18% vs yesterday" },
  { label: "Solved Threads", value: "892", note: "Strong community support" },
  { label: "New Members", value: "324", note: "Across 14 communities" },
];

const boardStats = [
  {
    label: "Weekly Growth",
    value: "+24.8%",
    icon: TrendingUp,
    tone: "from-emerald-500 to-teal-400",
  },
  {
    label: "Top Contributors",
    value: "128",
    icon: Trophy,
    tone: "from-orange-500 to-amber-400",
  },
  {
    label: "Active Communities",
    value: "42",
    icon: Users,
    tone: "from-sky-500 to-cyan-400",
  },
];

const navItems = [
  { label: "Home", href: "/dashboard", active: true },
  { label: "Collections", href: "/collections" },
  { label: "Find Jobs", href: "/find-jobs" },
  { label: "Tags", href: "/tags" },
  { label: "Communities", href: "/users" },
  { label: "Ask a Question", href: "/ask-question" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen px-3 py-3 text-slate-900 md:px-5">
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-[1480px] flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
        <header className="border-b border-slate-200/80 bg-white/85 px-4 py-4 md:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-300 shadow-[0_12px_24px_rgba(249,115,22,0.35)]">
                <Flame className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold tracking-tight">
                  Dev<span className="text-orange-500">Overflow</span>
                </p>
                <p className="text-sm text-slate-500">
                  Community dashboard template
                </p>
              </div>
            </div>

            <div className="flex flex-1 items-center gap-3 lg:max-w-2xl">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search for questions, tags, users..."
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />
              </div>
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-slate-500 transition hover:border-orange-200 hover:text-orange-500"
              >
                <Bell className="h-5 w-5" />
              </button>
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
                <Image src="/avatar.png" alt="User avatar" width={48} height={48} />
              </div>
            </div>
          </div>
        </header>

        <div className="grid flex-1 gap-0 lg:grid-cols-[240px_minmax(0,1fr)_320px]">
          <aside className="border-r border-slate-200/80 bg-white/70 px-4 py-6 md:px-5">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    item.active
                      ? "bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-[0_12px_24px_rgba(249,115,22,0.28)]"
                      : "text-slate-600 hover:bg-orange-50 hover:text-orange-500"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.active ? <Sparkles className="h-4 w-4" /> : null}
                </Link>
              ))}
            </div>

            <div className="mt-8 rounded-[24px] bg-slate-950 p-5 text-white shadow-[0_18px_36px_rgba(15,23,42,0.28)]">
              <div className="mb-4 inline-flex rounded-full bg-white/10 p-2">
                <LayoutGrid className="h-4 w-4 text-orange-300" />
              </div>
              <p className="text-sm font-semibold">Boost your visibility</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Publish curated prompts, snippets, and dev notes in one place.
              </p>
              <button
                type="button"
                className="mt-4 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-orange-50"
              >
                Upgrade Space
              </button>
            </div>

            <button
              type="button"
              className="mt-8 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-500 transition hover:border-orange-200 hover:text-orange-500"
            >
              Logout
            </button>
          </aside>

          <main className="bg-[linear-gradient(180deg,_rgba(255,255,255,0.72)_0%,_rgba(248,250,252,0.96)_100%)] px-4 py-6 md:px-6">
            <section className="rounded-[28px] border border-orange-100 bg-[radial-gradient(circle_at_top_left,_rgba(255,237,213,0.95),_rgba(255,255,255,0.95)_52%,_rgba(241,245,249,0.96)_100%)] p-6 shadow-[0_24px_60px_rgba(249,115,22,0.12)]">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                <div className="max-w-2xl">
                  <span className="inline-flex rounded-full border border-orange-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">
                    Dashboard Template
                  </span>
                  <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                    All Questions
                  </h1>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 md:text-base">
                    A clean StackOverflow-inspired workspace built from your current source, ready to extend into an admin or community dashboard.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    View Analytics
                  </button>
                  <Link
                    href="/ask-question"
                    className="rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(249,115,22,0.24)] transition hover:scale-[1.01]"
                  >
                    Ask a Question
                  </Link>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {quickStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[24px] border border-white/80 bg-white/80 p-4 shadow-[0_16px_30px_rgba(148,163,184,0.12)]"
                  >
                    <p className="text-sm text-slate-500">{stat.label}</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-orange-500">{stat.note}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-6 grid gap-4 xl:grid-cols-3">
              {boardStats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="rounded-[26px] border border-slate-200/80 bg-white/85 p-5 shadow-[0_16px_34px_rgba(148,163,184,0.12)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm text-slate-500">{stat.label}</p>
                        <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                          {stat.value}
                        </p>
                      </div>
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.tone} text-white shadow-[0_12px_24px_rgba(148,163,184,0.18)]`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>

            <section className="mt-6 rounded-[28px] border border-slate-200/80 bg-white/80 p-4 shadow-[0_18px_48px_rgba(148,163,184,0.12)] md:p-6">
              <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                    Fresh community threads
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Browse the latest discussions and trending technical topics.
                  </p>
                </div>
                <div className="relative w-full md:max-w-sm">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search for questions here..."
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />
                </div>
              </div>

              <QuestionList questions={questions} />
            </section>
          </main>

          <aside className="border-l border-slate-200/80 bg-white/72 px-4 py-6 md:px-5">
            <div className="space-y-5">
              <div className="rounded-[28px] border border-slate-200/80 bg-slate-950 p-5 text-white shadow-[0_18px_40px_rgba(15,23,42,0.28)]">
                <p className="text-sm uppercase tracking-[0.2em] text-orange-300">
                  Live pulse
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-tight">
                  87%
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Answer rate in the last 24 hours across your featured topics.
                </p>
              </div>

              <div className="[&>div]:rounded-[28px] [&>div]:border-slate-200/80 [&>div]:bg-white/80 [&>div]:shadow-[0_18px_40px_rgba(148,163,184,0.12)]">
                <HotNetwork items={hotNetworkItems} />
              </div>

              <div className="[&>div]:rounded-[28px] [&>div]:border-slate-200/80 [&>div]:bg-white/80 [&>div]:shadow-[0_18px_40px_rgba(148,163,184,0.12)]">
                <PopularTags tags={popularTags} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
