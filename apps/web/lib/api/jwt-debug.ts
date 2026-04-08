"use client";

type JwtHeader = {
    alg?: string;
    cat?: string;
    kid?: string;
    typ?: string;
};

type JwtPayload = {
    azp?: string;
    exp?: number;
    iat?: number;
    iss?: string;
    nbf?: number;
    sid?: string;
    sts?: string;
    sub?: string;
    v?: number;
};

type JwtParts = {
    header: JwtHeader | null;
    payload: JwtPayload | null;
};

export function getJwtSegmentCount(token: string | null | undefined) {
    return token?.split(".").length ?? 0;
}

function decodeBase64Url(value: string) {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    const padding = "=".repeat((4 - (normalized.length % 4)) % 4);

    return atob(normalized + padding);
}

function parseJwtPart<T>(value: string | undefined): T | null {
    if (!value) {
        return null;
    }

    try {
        return JSON.parse(decodeBase64Url(value)) as T;
    } catch {
        return null;
    }
}

export function decodeJwt(token: string): JwtParts {
    const [header, payload] = token.split(".");

    return {
        header: parseJwtPart<JwtHeader>(header),
        payload: parseJwtPart<JwtPayload>(payload),
    };
}

function maskValue(value: string | undefined, visible = 6) {
    if (!value) {
        return undefined;
    }

    if (value.length <= visible * 2) {
        return value;
    }

    return `${value.slice(0, visible)}...${value.slice(-visible)}`;
}

export function logClerkToken(
    stage: string,
    token: string | null,
    extra?: Record<string, unknown>,
) {
    if (!token) {
        console.log(`[ClerkFE] ${stage}`, {
            hasToken: false,
            ...extra,
        });
        return;
    }

    const { header, payload } = decodeJwt(token);

    console.log(`[ClerkFE] ${stage}`, {
        hasToken: true,
        parts: getJwtSegmentCount(token),
        tokenPreview: `${token.slice(0, 16)}...${token.slice(-12)}`,
        kid: header?.kid,
        alg: header?.alg,
        typ: header?.typ,
        iss: payload?.iss,
        azp: payload?.azp,
        sub: maskValue(payload?.sub),
        sid: maskValue(payload?.sid),
        sts: payload?.sts,
        iat: payload?.iat,
        nbf: payload?.nbf,
        exp: payload?.exp,
        ...extra,
    });
}
