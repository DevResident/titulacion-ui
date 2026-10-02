import type { AxiosError } from "axios";

export type ProblemLike = {
    title?: string;
    detail?: string;
    message?: string;
    error?: string;
    errors?: Record<string, string[] | string>;
};

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function isString(value: unknown): value is string {
    return typeof value === "string";
}

function isProblemLike(value: unknown): value is ProblemLike {
    if (!isObject(value)) return false;
    // Si alguno de estos campos existe y es string, lo consideramos ProblemLike
    return (
        (("title" in value && typeof value.title === "string") ||
            ("detail" in value && typeof value.detail === "string") ||
            ("message" in value && typeof value.message === "string") ||
            ("error" in value && typeof value.error === "string") ||
            ("errors" in value && isObject(value.errors))) ?? false
    );
}

function isAxiosErrorLike(e: unknown): e is AxiosError<unknown> {
    return isObject(e) && "isAxiosError" in e;
}

/* Mensaje de error para mostrar en UI */
export function getErrMsg(e: unknown, fallback = "Ocurrió un error"): string {
    if (!e) return fallback;

    const ax = isAxiosErrorLike(e) ? (e as AxiosError<unknown>) : undefined;
    const status = ax?.response?.status;
    const data = ax?.response?.data;

    // Respuesta como string del backend
    if (isString(data) && data.trim()) return data;

    // Problem details / payload común
    if (isProblemLike(data)) {
        const msg =
            data.message || data.detail || data.title || data.error || "";
        if (msg) return msg;
    }

    // Errores de red / timeout
    const code = isObject(e) && "code" in e ? (e as { code?: unknown }).code : undefined;
    if (code === "ECONNABORTED") {
        return "La solicitud tardó demasiado. Inténtalo de nuevo.";
    }
    if (isObject(ax) && typeof ax?.message === "string" && ax.message.includes("Network")) {
        return "No hay conexión con el servidor.";
    }

    // Fallbacks por status HTTP
    switch (status) {
        case 400: return "Solicitud inválida.";
        case 401: return "No autorizado. Inicia sesión de nuevo.";
        case 403: return "Acceso denegado.";
        case 404: return "Recurso no encontrado.";
        case 409: return "Conflicto de datos.";
        case 422: return "Datos inválidos. Revisa la información.";
        case 429: return "Demasiadas solicitudes. Intenta más tarde.";
        case 500:
        case 502:
        case 503:
        case 504:
            return "El servidor tuvo un problema. Intenta más tarde.";
        default:
            return fallback;
    }
}

/** Extrae el status HTTP si existe */
export function getHttpStatus(e: unknown): number | undefined {
    if (!isAxiosErrorLike(e)) return undefined;
    return e.response?.status ?? undefined;
}

/** Devuelve el payload del backend tal cual (útil para logs o validaciones por campo) */
export function getBackendPayload<T = unknown>(e: unknown): T | undefined {
    if (!isAxiosErrorLike(e)) return undefined;
    return e.response?.data as T | undefined;
}

/** Normaliza errores de validación por campo si el backend envía { errors: { campo: [msg] } } */
export function getFieldErrors(e: unknown): Record<string, string[]> | undefined {
    const data = getBackendPayload<unknown>(e);
    if (!isProblemLike(data)) return undefined;

    const src = data.errors;
    if (!src) return undefined;

    const out: Record<string, string[]> = {};
    for (const [k, v] of Object.entries(src)) {
        out[k] = Array.isArray(v) ? v.map(String) : [String(v)];
    }
    return out;
}

/** Atajo para detectar si es un error de Axios */
export function isAxiosError(e: unknown): e is AxiosError<unknown> {
    return isAxiosErrorLike(e);
}

/** Log centralizado (opcional) */
export function logApiError(e: unknown, context?: string) {
    // eslint-disable-next-line no-console
    console.error(context ? `[${context}]` : "[api]", e);
}
