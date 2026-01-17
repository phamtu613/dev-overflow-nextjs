// hooks/use-auth-email-form.ts
export function useAuthEmailForm(onSubmit: any) {
    const handleSubmit = async (values: any) => {
        await onSubmit(values);
    };

    return {
        handleSubmit,
    };
}
