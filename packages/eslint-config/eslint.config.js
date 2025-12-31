import js from "@eslint/js";
import tseslint from "typescript-eslint";
import unicorn from "eslint-plugin-unicorn";

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,

    // Global ignores
    {
        ignores: [
            "**/*.cjs",
            "**/*.js",
            "scripts/**",
            ".next/**",
            "node_modules/**",
        ],
    },

    {
        files: ["**/*.{ts,tsx}"],
        plugins: {
            unicorn,
        },
        rules: {
            // Enforce kebab-case for all files (Next.js App Router convention)
            "unicorn/filename-case": [
                "error",
                {
                    case: "kebabCase",
                },
            ],

            "@typescript-eslint/naming-convention": [
                "error",
                // Default for variables - camelCase
                {
                    selector: "variable",
                    format: ["camelCase", "UPPER_CASE"],
                },
                // Allow PascalCase for React components (functions)
                {
                    selector: "function",
                    format: ["camelCase", "PascalCase"],
                },
                // Allow PascalCase for const that could be React components
                {
                    selector: "variable",
                    modifiers: ["const"],
                    format: ["camelCase", "PascalCase", "UPPER_CASE"],
                },
                // Parameters - allow PascalCase for destructured React components (e.g., { icon: Icon })
                {
                    selector: "parameter",
                    format: ["camelCase", "PascalCase"],
                    leadingUnderscore: "allow",
                },
                // Types and interfaces should be PascalCase
                {
                    selector: "typeLike",
                    format: ["PascalCase"],
                },
            ],
        },
    },
];
