import { nextJsConfig } from "@repo/eslint-config/next-js";
import boundaries from "eslint-plugin-boundaries";

/** @type {import("eslint").Linter.Config[]} */
export default [
    ...nextJsConfig,

    // ===============================
    // 🔒 Feature-driven Architecture Guard
    // ===============================
    {
        plugins: {
            boundaries,
        },

        settings: {
            "boundaries/elements": [
                {
                    type: "app",
                    pattern: "apps/web/app/**",
                },
                {
                    type: "feature",
                    pattern: "apps/web/features/*/**",
                    capture: ["featureName"],
                },
                {
                    type: "package",
                    pattern: "packages/*/**",
                    capture: ["packageName"],
                },
            ],
        },

        rules: {
            // ❌ Import không rõ nguồn gốc
            "boundaries/no-unknown": "error",

            // ❌ Phá tầng kiến trúc
            "boundaries/element-types": [
                "error",
                {
                    default: "disallow",
                    rules: [
                        // feature chỉ được xài packages
                        {
                            from: "feature",
                            allow: ["package"],
                        },

                        // app được xài feature + package
                        {
                            from: "app",
                            allow: ["feature", "package"],
                        },

                        // package chỉ được xài package
                        {
                            from: "package",
                            allow: ["package"],
                        },
                    ],
                },
            ],

            // ❌ Import feature phải đi qua index.ts
            "no-restricted-imports": [
                "error",
                {
                    patterns: [
                        {
                            group: ["apps/web/features/*/*/*"],
                            message:
                                "❌ Do not deep-import feature internals. Use feature public index.ts only.",
                        },
                    ],
                },
            ],
        },
    },
];
