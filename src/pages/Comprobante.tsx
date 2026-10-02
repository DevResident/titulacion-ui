import { useEffect, useRef, useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Stack,
    Typography,
    Alert,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import RefreshIcon from "@mui/icons-material/Refresh";
import PrintIcon from "@mui/icons-material/Print";
import { getComprobantePdf, getFilenameFromHeaders} from "../services/comprobante";

type ApiError = { response?: { data?: { message?: string } } };

export default function Comprobante() {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    const [filename, setFilename] = useState<string>('comprobante.pdf');
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const fetchPdf = async (): Promise<void> => {
        setErr(null);
        setLoading(true);
        try {
            // Modifica getComprobantePdf para que devuelva la respuesta completa
            const { blob, headers } = await getComprobantePdf();
            const extractedFilename = getFilenameFromHeaders(headers);
            setFilename(extractedFilename);

            const url = URL.createObjectURL(blob);
            setPdfUrl(prev => {
                if (prev) URL.revokeObjectURL(prev);
                return url;
            });
        } catch (e: unknown) {
            const message =
                (e as ApiError)?.response?.data?.message ||
                (e instanceof Error ? e.message : null) ||
                "No se pudo generar tu comprobante.";
            setPdfUrl(prev => {
                if (prev) URL.revokeObjectURL(prev);
                return null;
            });
            setErr(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchPdf(); // no ignore warning
        return () => {
            if (pdfUrl) URL.revokeObjectURL(pdfUrl);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDownload = (): void => {
        if (!pdfUrl) return;
        const a = document.createElement("a");
        a.href = pdfUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    const handlePrint = (): void => {
        if (!pdfUrl) return;
        const node = iframeRef.current;
        if (node?.contentWindow) {
            node.contentWindow.focus();
            node.contentWindow.print();
            return;
        }
        window.open(pdfUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <Box sx={{ width: "90%", maxWidth: 1100, mx: "auto", mt: 4 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <PictureAsPdfIcon />
                    <Typography variant="h5">Comprobante</Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={() => void fetchPdf()}
                        disabled={loading}
                    >
                        {loading ? "Actualizando…" : "Regenerar"}
                    </Button>
                    <Button variant="outlined" startIcon={<PrintIcon />} onClick={handlePrint} disabled={!pdfUrl}>
                        Imprimir
                    </Button>
                    <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleDownload} disabled={!pdfUrl}>
                        Descargar PDF
                    </Button>
                </Stack>
            </Stack>

            {err && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {err}
                </Alert>
            )}

            <Box
                sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                    minHeight: 400,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {loading && (
                    <Stack
                        sx={{ position: "absolute", inset: 0 }}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <CircularProgress />
                        <Typography sx={{ mt: 2 }}>Generando comprobante…</Typography>
                    </Stack>
                )}

                {!loading && pdfUrl && (
                    <iframe
                        ref={iframeRef}
                        src={pdfUrl}
                        title="Comprobante de titulación"
                        style={{ width: "100%", height: "80vh", border: "none" }}
                    />
                )}

                {!loading && !pdfUrl && !err && (
                    <Typography sx={{ p: 3 }}>
                        No hay comprobante disponible por el momento.
                    </Typography>
                )}

                {!loading && pdfUrl && (
                    <Typography sx={{ p: 1 }}>
                        Si no ves el PDF,{" "}
                        <a href={pdfUrl} target="_blank" rel="noreferrer">
                            Abrelo en una pestaña nueva
                        </a>
                        .
                    </Typography>
                )}
            </Box>
        </Box>
    );
}
