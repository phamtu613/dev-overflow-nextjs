export type ClerkSignIn = {
    create: (params: {
        identifier: string;
        password: string;
    }) => Promise<any>;
};
