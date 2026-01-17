import { Suspense } from "react";
import CheckEmailPage from "@/features/auth/components/check-email/page";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CheckEmailPage />
        </Suspense>
    );
}
