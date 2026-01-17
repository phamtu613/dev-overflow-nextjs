// submit-button.view.tsx
import { Button } from "@repo/ui/button";
import type { SubmitButtonProps } from "./types";

export function SubmitButtonView({
    loading,
    text,
}: SubmitButtonProps) {
    return (
        <Button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-orange-500 hover:opacity-90 disabled:opacity-50"
        >
            {loading ? "PROCESSING..." : text}
        </Button>
    );
}
