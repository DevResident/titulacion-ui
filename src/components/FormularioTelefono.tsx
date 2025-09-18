import React, { useState } from 'react';
import {Box, Button, Typography} from '@mui/material';

const FormularioTelefono: React.FC = () => {
    const [archivo, setArchivo] = useState({
        nombre: 'Foto',
        descripcion: '',
        extension: 'JPG',
    });


    return (
        <Box>
            <Typography>{archivo.nombre}</Typography>
            <Button>Cargar archivo</Button>
            <Typography>
                {archivo.extension ? `El archivo debe ser ${archivo.extension}` : null}
            </Typography>

            <Typography>{archivo.descripcion}</Typography>


        </Box>
    );
};

export default FormularioTelefono;
