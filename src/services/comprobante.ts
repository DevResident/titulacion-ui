import api from "./api";

// Solicitar el PDF al back
export async function getComprobantePdf(): Promise<{
    blob: Blob;
    headers: Record<string, string>
}> {
    const resp = await api.get("/comprobante/pdf", { responseType: "blob" });
    return {
        blob: resp.data as Blob,
        headers: resp.headers as Record<string, string>
    };
}

export function getFilenameFromHeaders(headers: Record<string, string> | Headers): string {
    const fallback = 'comprobante.pdf';

    let cd: string | undefined;

    if (headers instanceof Headers) {
        cd = headers.get('content-disposition') || undefined;
    } else if (typeof headers === 'object') {
        cd = headers['content-disposition'] || headers['Content-Disposition'];
    }

    if (!cd) return fallback;

    const regex = /filename\*=UTF-8''([^;]+)|filename\*=([^;]+)|filename="([^"]+)"|filename=([^;]+)/i;
    const match = cd.match(regex);

    if (!match) return fallback;

    const encodedFilename = match[1] || match[2];
    const plainFilename = match[3] || match[4];

    try {
        if (encodedFilename) {
            return decodeURIComponent(encodedFilename);
        } else if (plainFilename) {
            return decodeURIComponent(plainFilename.replace(/^"|"$/g, ''));
        }
    } catch (error) {
        console.warn('Error decoding filename:', error);
    }

    return fallback;
}