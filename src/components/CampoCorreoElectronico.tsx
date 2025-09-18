import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';

const CampoCorreoElectronico: React.FC = () => {
    const [correo, setCorreo] = useState('');
    const [error, setError] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCorreo(value);

        // Validación simple de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setError(value !== '' && !emailRegex.test(value));
    };

    return (
        <Box>
            <TextField
                fullWidth
                margin="normal"
                label="Correo electrónico"
                name="correo"
                value={correo}
                onChange={handleChange}
                error={error}
                helperText={error ? 'Correo inválido' : ''}
                type="email"
            />
        </Box>
    );
};

export default CampoCorreoElectronico;
