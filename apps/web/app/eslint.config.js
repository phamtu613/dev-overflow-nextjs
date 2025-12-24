import boundaries from "eslint-plugin-boundaries";

export default [
    {
        plugins: {
            boundaries,
        },
        settings: {
            "boundaries/elements": [
                { type: "app", pattern: "app/**" },
                { type: "feature", pattern: "features/*/**" },
                { type: "package", pattern: ["packages/*/**", "node_modules/**"] },
            ],
        },
        rules: {
            "boundaries/element-types": [
                "error",
                {
                    default: "disallow",
                    rules: [
                        { from: "app", allow: ["feature", "package"] },
                        { from: "feature", allow: ["package"] },
                        { from: "package", allow: ["package"] },
                    ],
                },
            ],
        },
    },
];
