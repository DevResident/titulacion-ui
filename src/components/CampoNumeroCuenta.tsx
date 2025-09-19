import React, { useState } from 'react';
import TextField from '@mui/material/TextField';


const CampoNumeroCuenta: React.FC = () => {
    const [numeroCuenta, setNumeroCuenta] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Solo permitir números y máximo 11 caracteres
        if (/^\d{0,11}$/.test(value)) {
            setNumeroCuenta(value);
        }
    };

    return (
            <TextField
                id="numero-cuenta"
                label="Número de cuenta"
                variant="outlined"
                fullWidth
                margin="normal"
                type="tel"
                value={numeroCuenta}
                onChange={handleChange}
                inputProps={{
                    maxLength: 9,
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                }}
            />
    );
};

export default CampoNumeroCuenta;
