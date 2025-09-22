import { useEffect, useRef, useState } from 'react';
import type { ChangeEventHandler } from 'react';
import {
    Box,
    Button,
    Typography,
    IconButton,
    Dialog,
    DialogContent,
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { HELP_FRAGMENTS, fileMatchesAccept } from '../utils/Constantes';


// @ts-ignore
export default function CampoArchivo(props) {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState('');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
        if (!fileMatchesAccept(f, props.CFG.accept)) {
            setError('Formato inválido. Solo JPG.');
            setFile(null);
            return;
        }
        setError('');
        setFile(f);
    };

    const openPicker = () => inputRef.current?.click();
    const openPreview = () => file && setPreviewOpen(true);

    return (
        <Box display="grid" gridTemplateColumns="1fr auto auto 1fr" alignItems="left" gap={2}>
            {/* Izquierda: etiqueta */}
            <Typography variant="body1" textAlign="left">
                {props.CFG.label}
            </Typography>

            {/* Centro: botón y acciones */}
            <Box display="flex" alignItems="left" gap={1}>
                <input
                    ref={inputRef}
                    id="subir-foto"
                    type="file"
                    accept={props.CFG.accept}
                    style={{ display: 'none' }}
                    onChange={onChange}
                />

                {/* Botón: clickeable si NO hay archivo; bloqueado si SÍ hay archivo */}
                <Button
                    variant="outlined"
                    onClick={!file ? openPicker : undefined}
                    disabled={!!file}
                    startIcon={!file ? <UploadIcon /> : undefined} // ícono dentro del botón solo cuando no hay archivo
                    sx={{
                        width: 260,                  // ancho fijo
                        justifyContent: 'center',    // texto centrado como en tu captura
                        gap: 1,
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

                {/* Lápiz y ojo solo se muestra cuando ya hay archivo */}
                {file && (
                    <>
                        <IconButton aria-label="Cambiar archivo" onClick={openPicker}>
                            <EditIcon />
                        </IconButton>

                        <IconButton aria-label="Vista previa" onClick={openPreview} disabled={!previewUrl}>
                            <VisibilityIcon />
                        </IconButton>
                    </>
                )}

                {error && (
                    <Typography variant="caption" color="error" sx={{ display: 'block', ml: 1 }}>
                        {error}
                    </Typography>
                )}
            </Box>

            {/* Derecha: ayuda por fragmentos */}
            <Box>
                {props.CFG.help.map((k: keyof typeof HELP_FRAGMENTS) => (
                    <Typography
                        key={k}
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontStyle: 'italic', display: 'block' }}
                    >
                        {HELP_FRAGMENTS[k]}
                    </Typography>
                ))}
            </Box>

            {/* Dialog de vista previa */}
            <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="sm" fullWidth>
                <DialogContent>
                    {previewUrl && (
                        <img src={previewUrl} alt="Vista previa" style={{ width: '100%', display: 'block' }} />
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
}