import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

const CampoFotografia: React.FC = () => {
    const [archivo, setArchivo] = useState({
        nombre: 'Foto',
        descripcion: 'Foto estilo selfie',
        extension: 'JPG',
    });

    const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setArchivo(e.target.files[0]);
        }
    };

    return (
        <Box gap={1} >
            <Typography variant="body1">{archivo.nombre}:</Typography>

            <input
                accept="image/jpeg, image/jpg, image/png"
                style={{ display: 'none' }}
                id="subir-foto"
                type="file"
                onChange={manejarCambio}
            />

            <label htmlFor="subir-foto">
                <Button
                    variant="outlined"
                    component="span"
                    startIcon={<UploadIcon />}
                >
                    Subir archivo
                </Button>
            </label>

            <Typography variant="caption" color="text.secondary">
                {archivo.extension ? `El archivo debe ser ${archivo.extension}` : null}
            </Typography>

            <Typography variant="caption" color="text.secondary">
                {archivo.descripcion}
            </Typography>

        </Box>
    );
};

export default CampoFotografia;