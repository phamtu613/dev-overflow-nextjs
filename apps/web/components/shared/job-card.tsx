import { Job } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  job: Job;
}

export const JobCard = ({ job }: Props) => {
  return (
    <div className="card-wrapper rounded-[10px] p-6 bg-white dark:bg-dark-200 shadow-sm border border-light-800 dark:border-dark-300 flex flex-col sm:flex-row gap-4 items-start">
      <div className="flex-center size-16 bg-light-800 dark:bg-dark-400 rounded-xl p-2">
        <Image
          src={job.employer_logo || "/assets/icons/briefcase.svg"}
          alt="company logo"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>

      <div className="flex-1 w-full">
        <div className="flex-between w-full">
          <h3 className="h3-semibold text-dark200_light900 line-clamp-1">
            {job.job_title}
          </h3>
          <div className="hidden sm:flex bg-light-800 dark:bg-dark-400 rounded-full px-3 py-1">
            <p className="subtle-medium text-dark400_light700">
              {job.job_employment_type}
            </p>
          </div>
        </div>

        <p className="body-regular text-dark500_light700 mt-2 line-clamp-2">
          {job.employer_name} • {job.job_city}, {job.job_country}
        </p>

        <div className="flex-between mt-6 w-full flex-wrap gap-3">
          <div className="flex gap-2 items-center text-primary-500">
            <Image
              src="/assets/icons/clock.svg"
              width={16}
              height={16}
              alt="clock"
            />
            <p className="small-medium uppercase">Full-time</p>{" "}
            {/* Dynamic if needed */}
          </div>

          <div className="flex gap-2 items-center text-dark400_light700">
            <Image
              src="/assets/icons/currency-dollar.svg"
              width={16}
              height={16}
              alt="dollar"
            />
            <p className="small-medium">
              {job.job_min_salary && job.job_max_salary
                ? `${job.job_min_salary / 1000}k - ${job.job_max_salary / 1000}k`
                : "Not disclosed"}
            </p>
          </div>

          <Link
            href={job.job_apply_link}
            target="_blank"
            className="flex items-center gap-1 text-primary-500 hover:underline"
          >
            View Job
            <Image
              src="/assets/icons/arrow-up-right.svg"
              width={16}
              height={16}
              alt="arrow"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
