// submit-button.container.tsx
"use client";

import { SubmitButtonView } from "./submit-button.view";
import { useSubmitButton } from "./hooks/use-submit-button";
import type { SubmitButtonProps } from "./types";

export function SubmitButton(props: SubmitButtonProps) {
    const state = useSubmitButton(props);
    return <SubmitButtonView {...state} />;
}
