import api from "./api";

// Solicitar el PDF al back
export async function getComprobantePdf(): Promise<Blob> {
    const resp = await api.get("/comprobante/pdf", { responseType: "blob" });
    return resp.data as Blob;
}