"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  FiHome,
  FiGrid,
  FiBookmark,
  FiTag,
  FiUsers,
  FiEdit3,
  FiStar,
  FiSearch,
  FiMoon,
} from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("newest");

  const tabs = [
    { id: "newest", label: "Newest" },
    { id: "recommended", label: "Recommended Questions" },
    { id: "frequent", label: "Frequent" },
    { id: "unanswered", label: "Unanswered" },
  ];

  const questions = [
    {
      title:
        "The Lightning Component c:LWC_PizzaTracker generated invalid output for field status. Error How to solve this",
      tags: ["javascript", "react.js", "invalid fields", "salesforce"],
      votes: "1.2k",
      answers: 900,
      views: "5.2k",
      author: "Satheesh",
      time: "asked 2 mins ago",
    },
    {
      title:
        "An HTML table where specific cells come from values in a Google Sheet identified by their neighboring cell",
      tags: ["javascript", "react.js", "invalid fields", "salesforce"],
      votes: "1.2k",
      answers: 900,
      views: "5.2k",
      author: "Satheesh",
      time: "asked 2 mins ago",
    },
    {
      title:
        "JavaScript validation for a form stops the form data from being submitted to mysql database",
      tags: ["javascript", "react.js", "mysql", "forms"],
      votes: "1.2k",
      answers: 900,
      views: "5.2k",
      author: "Satheesh",
      time: "asked 2 mins ago",
    },
  ];

  const hotNetwork = [
    "Would it be appropriate to point out an error in another paper during a referee report?",
    "How can an airconditioning machine exist?",
    "Interrogated every time crossing UK Border as citizen",
    "Low digit addition generator",
    "What is an example of 3 numbers that do not make up a vector?",
  ];

  const popularTags = [
    "javascript",
    "typescript",
    "next.js",
    "tailwind css",
    "react.js",
    "git & github",
  ];

  return (
    <div className="min-h-screen w-full bg-[#080D1A] text-white flex">
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="w-[260px] bg-[#0D111C] border-r border-white/10 p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-10">
          <span className="text-orange-500">Dev</span>Overflow
        </h1>

        <div className="space-y-2 flex-1">
          <SidebarItem icon={<FiHome />} label="Home" active />
          <SidebarItem icon={<FiGrid />} label="Collections" />
          <SidebarItem icon={<FiBookmark />} label="Find Jobs" />
          <SidebarItem icon={<FiTag />} label="Tags" />
          <SidebarItem icon={<FiUsers />} label="Communities" />
          <SidebarItem icon={<FiEdit3 />} label="Ask a Question" />
          <SidebarItem icon={<FiStar />} label="Recommended Qs" />
        </div>

        <div className="pt-4 border-t border-white/10">
          <SidebarItem icon={<FiStar />} label="Logout" />
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-8">
        {/* Header Search */}
        <div className="flex items-center justify-between mb-8">
          <div className="relative w-[60%]">
            <div className="ml-20">
              <FiSearch className="absolute left-24 top-3.5 text-gray-400" />
              <Input
                placeholder="Search anything globally"
                className="pl-11 py-3 bg-[#11141C] border border-white/10 rounded-xs placeholder:text-gray-400 w-[65%]"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <FiMoon className="text-xl text-orange-300 hover:text-orange-500 cursor-pointer" />
            <FaUserCircle className="text-3xl text-blue-300" />
          </div>
        </div>

        {/* All Questions + Ask Button */}
        <div className="flex gap-3">
          <div>
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-semibold">All Questions</h2>

              <Button
                className="
                  bg-gradient-to-r from-orange-400 to-orange-600 
                  hover:from-orange-500 hover:to-orange-700 
                  px-6 py-2 rounded-xl text-white shadow-lg
                "
              >
                Ask a Question
              </Button>
            </div>

            {/* Search in Questions */}
            <div className="relative mb-5">
              <FiSearch className="absolute left-4 top-3.5 text-gray-400" />
              <Input
                placeholder="Search for Questions Here..."
                className="pl-11 py-3 bg-[#11141C] border border-white/10 rounded-xs placeholder:text-gray-500"
              />
            </div>

            {/* Tabs */}
            <Tabs defaultValue="newest" className="mb-5">
              <TabsList className="flex justify-start gap-3 p-0 bg-transparent">
                {tabs.map((t) => (
                  <TabsTrigger
                    key={t.id}
                    value={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className="
                      px-5 py-2 rounded-xl text-sm font-medium transition-all
                      bg-[#11141C] text-[#8891A7]
                      hover:bg-[#1A1F2A] hover:text-gray-200

                      data-[state=active]:bg-[#1F2430]
                      data-[state=active]:text-orange-400
                    "
                  >
                    {t.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Question List */}
            <div className="space-y-5">
              {questions.map((q, i) => (
                <Card
                  key={i}
                  className="
        bg-[#11141C] 
        rounded-xl 
        shadow-[0_0_40px_rgba(0,0,0,0.35)]
        transition 
      "
                >
                  <CardContent className="p-5">
                    {/* TITLE */}
                    <h3 className="text-[16px] font-semibold leading-snug mb-4 text-gray-100">
                      {q.title}
                    </h3>

                    {/* TAGS */}
                    <div className="flex gap-2 mb-5">
                      {q.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="
          rounded-md px-2.5 py-1 
          text-[10px] font-medium tracking-wide uppercase
          bg-[#1B2230] border-none 
          text-[#B9C2D0]
        "
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* BOTTOM INFO ROW */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      {/* LEFT: AUTHOR */}
                      <div className="flex items-center gap-2 text-[13px] text-gray-400">
                        {/* Avatar */}
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />

                        <span className="text-gray-200">{q.author}</span>
                        <span className="text-gray-500">• {q.time}</span>
                      </div>

                      {/* RIGHT: META ICONS */}
                      <div className="flex items-center gap-6 text-[13px] text-gray-400">
                        {/* Votes */}
                        <div className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-[14px] w-[14px] text-blue-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                          </svg>
                          <span className="text-gray-300">{q.votes}</span>
                          <span className="text-gray-500">Votes</span>
                        </div>

                        {/* Answers */}
                        <div className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-[14px] w-[14px] text-green-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8 10h8M8 14h5m-7 6l-3-3V7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H6z"
                            />
                          </svg>
                          <span className="text-gray-300">{q.answers}</span>
                          <span className="text-gray-500">Answers</span>
                        </div>

                        {/* Views */}
                        <div className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-[14px] w-[14px] text-purple-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7S3.732 16.057 2.458 12z"
                            />
                          </svg>
                          <span className="text-gray-300">{q.views}</span>
                          <span className="text-gray-500">Views</span>
                        </div>

                      </div>
                    </div>
                  </CardContent>

                </Card>
              ))}
            </div>
          </div>
          {/* ================= RIGHT SIDEBAR ================= */}
          <div>
            <aside className="bg-[#0D111C] p-2 pl-4">
              <h3 className="text-sm font-semibold">Hot Network</h3>
              <ul className="space-y-3 text-xs text-gray-300 mb-6">
                {hotNetwork.map((t, i) => (
                  <li
                    key={i}
                    className="hover:text-orange-400 cursor-pointer leading-tight"
                  >
                    • {t}
                  </li>
                ))}
              </ul>

              <h3 className="text-sm font-semibold mb-4">Popular Tags</h3>
              <div className="space-y-2 text-xs">
                {popularTags.map((t, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-gray-300"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-sm bg-gradient-to-br from-yellow-400 to-orange-500" />
                      {t}
                    </span>
                    <span className="text-gray-400">
                      {Math.floor(Math.random() * 20000)}+
                    </span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ===================================== */
/*           SIDEBAR ITEM                */
/* ===================================== */
function SidebarItem({ icon, label, active }: any) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition
        ${active
          ? "bg-orange-500 text-white shadow"
          : "text-gray-300 hover:bg-[#141922]"
        }`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );
}
