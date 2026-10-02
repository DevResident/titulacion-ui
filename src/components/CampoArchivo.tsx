import { useEffect, useRef, useState } from 'react';
import type { ChangeEventHandler } from 'react';
import { Box, Button, Typography, IconButton, Dialog, DialogContent } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { HELP_FRAGMENTS, fileMatchesAccept } from '../utils/constantes.ts';

interface CampoArchivoProps{
    CFG: {
        label: string,
        accept: string,
        help: (keyof typeof HELP_FRAGMENTS)[];
    };
    onFileSelected: (file: File | null) => void;
}

// @ts-ignore
export default function CampoArchivo(props: CampoArchivoProps) {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState('');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [previewIsPdf, setPreviewIsPdf] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!file) { if (previewUrl) URL.revokeObjectURL(previewUrl); setPreviewUrl(null); return; }
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const f = e.target.files?.[0];
        if (!f) return;

        // valida formato
        if (!fileMatchesAccept(f, props.CFG.accept)) {
            setError('Formato inválido.');
            setFile(null);
            props.onFileSelected(null);
            return;
        }

        setError('');
        setFile(f);
        props.onFileSelected(f)
        // marca si es PDF (por tipo o extensión)
        setPreviewIsPdf(
            f.type === 'application/pdf' || /\.pdf$/i.test(f.name)
        );
    };

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const openPicker = () => inputRef.current?.click();
    const openPreview = () => {
        if (!file || !previewUrl) return;
        if (previewIsPdf) {

            // Visor nativo del navegador en una nueva pestaña
            window.open(previewUrl, '_blank', 'noopener,noreferrer');
        } else {
            setPreviewOpen(true); // Modal para foto
        }
    };

    return (
        <Box
            sx={{
                // centra el bloque en la página
                maxWidth: 1100,
                mx: 'auto',

                display: 'grid',
                // columnas: etiqueta | botón | acciones | requisitos
                gridTemplateColumns: {
                    xs: '1fr', // mobile apilado
                    sm: 'minmax(220px,1fr) 360px 80px minmax(300px,1fr)',
                },
                columnGap: 2,
                rowGap: 1.5,
                alignItems: 'center', // Afecta columnas 1 y 3
                width: '100%',
            }}
        >
            {/* Columna 1: etiqueta */}
            <Typography
                variant="body1"
                sx={{
                    justifySelf: { xs: 'start', sm: 'end' },
                    pr: { sm: 1 },
                    whiteSpace: 'nowrap',
                }}
            >
                {props.CFG.label}
            </Typography>

            {/* Columna 2: botón */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 360, maxWidth: '100%', height: 48 }}>
                <input
                    ref={inputRef}
                    type="file"
                    accept={props.CFG.accept}
                    onChange={onChange}
                    style={{ display: 'none' }}
                />

                <Button
                    variant="outlined"
                    onClick={!file ? openPicker : undefined}
                    disabled={!!file}
                    startIcon={!file ? <UploadIcon /> : undefined}
                    sx={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 2,
                        justifyContent: 'center',
                        textTransform: 'none',
                    }}
                >
                    <Box
                        component="span"
                        sx={{
                            maxWidth: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            display: 'inline-block',
                        }}
                        title={file ? file.name : 'Subir archivo'}
                    >
                        {file ? file.name : 'Subir archivo'}
                    </Box>
                </Button>
            </Box>

            {/* Columna 3: acciones */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 1, minWidth: 72 }}>
                {file ? (
                    <>
                        <IconButton aria-label="Cambiar archivo" onClick={openPicker}>
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="Vista previa" onClick={openPreview} disabled={!previewUrl}>
                            <VisibilityIcon />
                        </IconButton>
                    </>
                ) : (
                    <Box sx={{ width: 72, height: 40 }} />
                )}
            </Box>

            {/* Columna 4: requisito del archivo a subir */}
            <Box>
                {props.CFG.help.map((k: keyof typeof HELP_FRAGMENTS) => (
                    <Typography
                        key={k}
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontStyle: 'italic', display: 'block', lineHeight: 1.4 }}
                    >
                        {HELP_FRAGMENTS[k]}
                    </Typography>
                ))}
            </Box>

            {/* Error: fila extra para error bajo el campo */}
            {error && (
                <Typography
                    variant="caption"
                    color="error"
                    sx={{ gridColumn: { sm: '2 / 4' }, justifySelf: 'start' }}
                >
                    {error}
                </Typography>
            )}

            {/* vista previa de la foto */}
            <Dialog open={previewOpen && !previewIsPdf} onClose={() => setPreviewOpen(false)} maxWidth="sm" fullWidth>
                <DialogContent>
                    {previewUrl && !previewIsPdf && (
                        <img src={previewUrl} alt="Vista previa" style={{ width: '100%', display: 'block' }} />
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
}