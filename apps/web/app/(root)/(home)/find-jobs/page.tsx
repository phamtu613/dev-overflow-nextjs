"use client";

import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Input } from "@repo/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";
import {
  ArrowUpRight,
  ChevronDown,
  Clock,
  DollarSign,
  MapPin,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Job {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  employmentType: string;
  salary: string;
  companyLogo?: string;
}

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Principal Salesforce Developer",
    category: "Development",
    location: "Melbourne, AU",
    description:
      "About the Company Join AT&T and reimagine the communications and technologies that connect the world.",
    employmentType: "Full-time",
    salary: "80k - 100k",
    companyLogo: "/logo-company.png",
  },
  {
    id: "2",
    title: "C++ Software Developer",
    category: "Software",
    location: "Melbourne, AU",
    description: "We're looking for a mid-level UX designer to join our team.",
    employmentType: "Full-time",
    salary: "40k - 90k",
  },
  {
    id: "3",
    title: "Application Developer III",
    category: "Development",
    location: "Melbourne, AU",
    description:
      "About the Company Join AT&T and reimagine the communications and technologies that connect the world.",
    employmentType: "Full-time",
    salary: "80k - 100k",
    companyLogo: "/logo-company.png",
  },
  {
    id: "4",
    title: "Staff Developer Advocate",
    category: "Software",
    location: "Melbourne, AU",
    description:
      "We're looking for an experienced frontend developer to join our team.",
    employmentType: "Full-time",
    salary: "40k - 90k",
  },
];

export default function FindJobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = () => {
    console.log("Searching for:", searchQuery, "in", location);
  };

  return (
    <div className="px-12 pb-16">
      {/* Header */}
      <h1 className="mb-10 text-[30px] font-bold leading-[42px] tracking-[-0.03em] text-dark-100 dark:text-light-900">
        Jobs
      </h1>

      {/* Search Section */}
      <div className="mb-16 flex flex-col justify-between gap-5 lg:flex-row">
        {/* Inputs */}
        <div className="flex flex-col gap-5 sm:flex-row">
          {/* Job Search Input */}
          <div className="relative w-full sm:w-[360px]">
            <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-light-400" />
            <Input
              type="text"
              placeholder="Job Title, Company, or Keywords"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 rounded-[10px] border-light-700 bg-light-800 pl-12 text-base text-dark-100 placeholder:text-light-400 dark:border-dark-400 dark:bg-dark-300 dark:text-light-900"
            />
          </div>

          {/* Location Select */}
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="h-14 w-full rounded-[10px] border-light-700 bg-light-800 px-4 text-base text-light-400 dark:border-dark-400 dark:bg-dark-300 dark:text-light-400 sm:w-[360px]">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-6 w-6" />
                <SelectValue placeholder="Select Location" />
              </div>
              <ChevronDown className="h-6 w-6" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="melbourne">Melbourne, AU</SelectItem>
              <SelectItem value="sydney">Sydney, AU</SelectItem>
              <SelectItem value="brisbane">Brisbane, AU</SelectItem>
              <SelectItem value="perth">Perth, AU</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Find Jobs Button */}
        <Button
          onClick={handleSearch}
          className="h-[54px] w-full rounded-lg bg-linear-to-r from-[#FF7000] to-[#E2985E] px-4 text-base font-semibold leading-[20.8px] text-light-900 hover:opacity-90 sm:w-[173px]"
        >
          Find Jobs
        </Button>
      </div>

      {/* Job Cards */}
      <div className="mb-5 flex flex-col gap-8">
        {mockJobs.map((job) => (
          <Card
            key={job.id}
            className="flex flex-col gap-6 rounded-lg border-light-border-color bg-light-900 p-[30px] shadow-light-job-card dark:border-dark-400 dark:bg-dark-300 dark:shadow-none sm:flex-row"
          >
            {/* Company Logo */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[10px] bg-light-800 dark:bg-dark-400">
              <Image
                src={job.companyLogo || "/logo-company-default.png"}
                alt="company logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-5">
              {/* Text and Supporting Text */}
              <div className="flex flex-col gap-2">
                {/* Text and Badge Group */}
                <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                  {/* Text and Badge */}
                  <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                    <h3 className="text-lg font-semibold leading-[25.2px] text-dark-200 dark:text-light-900">
                      {job.title}
                    </h3>
                    <Badge className="rounded-md bg-light-800 px-3.5 py-1.5 text-[10px] font-medium uppercase leading-[13px] text-light-500 hover:bg-light-800 dark:bg-dark-400 dark:text-light-500">
                      {job.category}
                    </Badge>
                  </div>

                  {/* Location Badge */}
                  <div className="flex items-center gap-1.5 rounded-2xl bg-light-800 px-2.5 py-0.5 dark:bg-dark-400">
                    <Image
                      src="/assets/icons/flag-au.svg"
                      alt="location"
                      width={16}
                      height={16}
                      className="h-4 w-4"
                    />
                    <span className="text-sm font-medium leading-[18.2px] text-dark-400 dark:text-light-700">
                      {job.location}
                    </span>
                  </div>
                </div>

                {/* Supporting Text */}
                <p className="max-w-[543px] text-sm leading-[19.6px] text-dark-500 dark:text-light-500">
                  {job.description}
                </p>
              </div>

              {/* Details and Button */}
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                {/* Details */}
                <div className="flex items-center gap-6">
                  {/* Type of Work */}
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-light-500" />
                    <span className="text-sm font-medium leading-[18.2px] text-light-500">
                      {job.employmentType}
                    </span>
                  </div>

                  {/* Salary */}
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-light-500" />
                    <span className="text-sm font-medium leading-[18.2px] text-light-500">
                      {job.salary}
                    </span>
                  </div>
                </div>

                {/* View Job Button */}
                <Link
                  href={`/jobs/${job.id}`}
                  className="flex items-center gap-2"
                >
                  <span className="bg-linear-to-r from-[#FF7000] to-[#E2995F] bg-clip-text text-sm font-semibold leading-[18.2px] text-transparent">
                    View job
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-primary-500" />
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-5 border-t border-light-800 pt-5 dark:border-dark-400">
        {/* Prev Button */}
        <Button
          variant="outline"
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="h-10 rounded-lg border-light-700 bg-light-800 px-3.5 py-2 text-sm font-medium leading-[18.2px] text-dark-400 shadow-xs hover:bg-light-700 disabled:opacity-50 dark:border-dark-400 dark:bg-dark-400 dark:text-light-700 dark:hover:bg-dark-500"
        >
          Prev
        </Button>

        {/* Page Numbers */}
        <div className="flex gap-0.5">
          <Button
            onClick={() => setCurrentPage(1)}
            className={`h-10 w-10 rounded-lg p-3 text-sm font-semibold leading-[18.2px] ${
              currentPage === 1
                ? "bg-linear-to-r from-[#FF7000] to-[#E2985E] text-light-900"
                : "bg-light-800 text-dark-400 hover:bg-light-700 dark:bg-dark-400 dark:text-light-700"
            }`}
          >
            1
          </Button>
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="h-10 rounded-lg border-light-700 bg-light-800 px-3.5 py-2 text-sm font-medium leading-[18.2px] text-dark-400 shadow-xs hover:bg-light-700 dark:border-dark-400 dark:bg-dark-400 dark:text-light-700 dark:hover:bg-dark-500"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
