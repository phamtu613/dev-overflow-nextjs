"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import {
    registerAuthTokenGetter,
    setupApiInterceptors,
} from "@/lib/api";

let initialized = false;

export function ClerkAxiosBridge() {
    const { getToken } = useAuth();

    useEffect(() => {
        registerAuthTokenGetter(() =>
            getToken({ template: "internal" }),
        );

        if (!initialized) {
            setupApiInterceptors();
            initialized = true;
        }
    }, [getToken]);

    return null;
}
