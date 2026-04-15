export const OAUTH_PROVIDERS = {
    github: {
        label: "GitHub",
        icon: "/social/github-mark.svg",
        strategy: "oauth_github",
    },
    google: {
        label: "Google",
        icon: "/social/google.svg",
        strategy: "oauth_google",
    },
    facebook: {
        label: "Facebook",
        icon: "/social/facebook.svg",
        strategy: "oauth_facebook",
    },
    twitter: {
        label: "Twitter",
        icon: "/social/twitter.svg",
        strategy: "oauth_x",
    },
} as const;

export type OAuthProvider = keyof typeof OAUTH_PROVIDERS;
