"use client";

import { useSearchParams } from "next/navigation";
import { ForgotPasswordConfirmation } from "@/features/auth/components/forgot-password-confirmation";

export default function ForgotPasswordConfirmationPage() {
  const params = useSearchParams();
  const email = params.get("email") || "";

  return <ForgotPasswordConfirmation email={email} />;
}
