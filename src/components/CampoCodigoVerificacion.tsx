import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';

const CampoCodigoVerificacion: React.FC = () => {
    const [codigo, setCodigo] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCodigo(value);

    };

    return (
        <Box>
            <TextField
                fullWidth
                margin="normal"
                label="Código de Verificación"
                name="codigo"
                value={codigo}
                onChange={handleChange}
                type="email"
                required
                inputProps={{
                    maxLength: 75
                }}
            />
        </Box>
    );
};

export default CampoCodigoVerificacion;
