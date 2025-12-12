"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

interface ProfileFormData {
  fullName: string;
  username: string;
  portfolioLink: string;
  location: string;
  bio: string;
}

export default function ProfileEditPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: "Adrian Hajdin",
    username: "jsmasterypro",
    portfolioLink: "https://jsmastery.pro",
    location: "Croatia, Europe",
    bio: "Launch your development career with project-based coaching - showcase your skills with practical development experience and land the coding career of your dreams. Check out jsmastery.pro to learn more.",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement API call to update profile
      console.log("Submitting profile data:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.push(`/profiles/${userId}`);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-6 max-w-3xl">
      {/* Page Title */}
      <h1 className="mb-10 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Edit Profile
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-9">
        {/* Full Name */}
        <div className="space-y-3.5">
          <Label
            htmlFor="fullName"
            className="text-base font-semibold text-gray-700 dark:text-gray-300"
          >
            Full Name <span className="text-primary">*</span>
          </Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="h-14 rounded-md border-gray-200 bg-gray-50 px-6 text-base font-semibold text-gray-800 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200"
            placeholder="Enter your full name"
          />
        </div>

        {/* Username */}
        <div className="space-y-3.5">
          <Label
            htmlFor="username"
            className="text-base font-semibold text-gray-700 dark:text-gray-300"
          >
            Username <span className="text-primary">*</span>
          </Label>
          <Input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
            className="h-14 rounded-md border-gray-200 bg-gray-50 px-6 text-base font-semibold text-gray-800 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200"
            placeholder="Enter your username"
          />
        </div>

        {/* Portfolio Link */}
        <div className="space-y-3.5">
          <Label
            htmlFor="portfolioLink"
            className="text-base font-semibold text-gray-700 dark:text-gray-300"
          >
            Portfolio Link
          </Label>
          <Input
            id="portfolioLink"
            name="portfolioLink"
            type="url"
            value={formData.portfolioLink}
            onChange={handleChange}
            className="h-14 rounded-md border-gray-200 bg-gray-50 px-6 text-base font-semibold text-blue-500 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800/50"
            placeholder="https://your-portfolio.com"
          />
        </div>

        {/* Location */}
        <div className="space-y-3.5">
          <Label
            htmlFor="location"
            className="text-base font-semibold text-gray-700 dark:text-gray-300"
          >
            Location <span className="text-primary">*</span>
          </Label>
          <Input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            required
            className="h-14 rounded-md border-gray-200 bg-gray-50 px-6 text-base font-semibold text-gray-800 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200"
            placeholder="City, Country"
          />
        </div>

        {/* Bio */}
        <div className="space-y-3.5">
          <Label
            htmlFor="bio"
            className="text-base font-semibold text-gray-700 dark:text-gray-300"
          >
            Bio <span className="text-primary">*</span>
          </Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            required
            rows={4}
            className="min-h-[100px] rounded-md border-gray-200 bg-gray-50 px-6 py-4 text-base font-semibold text-gray-800 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200"
            placeholder="Tell us about yourself..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-linear-to-r from-[#FF7000] to-[#E2995F]  px-6 py-3 text-base font-semibold text-white shadow-md transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
