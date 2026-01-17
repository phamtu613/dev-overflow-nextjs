import js from "@eslint/js";
import tseslint from "typescript-eslint";
import unicorn from "eslint-plugin-unicorn";
import boundaries from "eslint-plugin-boundaries";

export default [
    /* ================= BASE ================= */
    js.configs.recommended,
    ...tseslint.configs.recommended,

    /* ================= GLOBAL IGNORE ================= */
    {
        ignores: [
            "**/*.cjs",
            "**/*.js",
            "scripts/**",
            ".next/**",
            "node_modules/**",
        ],
    },

    /* ================= TYPESCRIPT ================= */
    {
        files: ["**/*.{ts,tsx}"],
        plugins: {
            unicorn,
            boundaries,
        },
        settings: {
            "boundaries/elements": [
                { type: "app", pattern: "apps/web/app/**" },
                { type: "features", pattern: "apps/web/features/**" },
                { type: "components", pattern: "apps/web/components/**" },
                { type: "lib", pattern: "apps/web/lib/**" },
                { type: "hooks", pattern: "apps/web/hooks/**" },
            ],
        },
        rules: {
            /* ================= CODE ================= */
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    selector: "variable",
                    format: ["camelCase", "UPPER_CASE"],
                },
                {
                    selector: "function",
                    format: ["camelCase", "PascalCase"],
                },
                {
                    selector: "variable",
                    modifiers: ["const"],
                    format: ["camelCase", "PascalCase", "UPPER_CASE"],
                },
                {
                    selector: "parameter",
                    format: ["camelCase", "PascalCase"],
                    leadingUnderscore: "allow",
                },
                {
                    selector: "typeLike",
                    format: ["PascalCase"],
                },
            ],

            /* ================= FILE NAME ================= */
            "unicorn/filename-case": [
                "error",
                {
                    case: "kebabCase",
                },
            ],

            /* ================= ARCHITECTURE ================= */
            "boundaries/element-types": [
                "error",
                {
                    default: "disallow",
                    rules: [
                        /* app = composition layer */
                        {
                            from: "app",
                            allow: ["features", "components", "lib", "hooks"],
                        },

                        /* features = domain logic */
                        {
                            from: "features",
                            allow: ["features", "components", "lib", "hooks"],
                        },

                        /* components = dumb UI */
                        {
                            from: "components",
                            allow: ["components", "lib"],
                        },

                        /* hooks = shared logic */
                        {
                            from: "hooks",
                            allow: ["hooks", "lib"],
                        },

                        /* lib = pure infra / utils */
                        {
                            from: "lib",
                            allow: ["lib"],
                        },
                    ],
                },
            ],
        },
    },
];
