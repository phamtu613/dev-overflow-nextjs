export function getMailProvider(email?: string | null) {
    if (!email) {
        return { label: "Open inbox", url: "https://mail.google.com" };
    }

    const domain = email.split("@")[1] as string;

    const map: Record<string, { label: string; url: string }> = {
        "gmail.com": {
            label: "Open Gmail",
            url: "https://mail.google.com",
        },
        "outlook.com": {
            label: "Open Outlook",
            url: "https://outlook.live.com/mail/",
        },
        "hotmail.com": {
            label: "Open Outlook",
            url: "https://outlook.live.com/mail/",
        },
        "yahoo.com": {
            label: "Open Yahoo Mail",
            url: "https://mail.yahoo.com",
        },
    };

    return (
        map[domain] || {
            label: `Open ${domain}`,
            url: `https://${domain}`,
        }
    );
}
