import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const CampoPromedio: React.FC = () => {
    const [promedio, setPromedio] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Validar formato: número con hasta 2 decimales, y menor o igual a 10
        const regex = /^(?:\d{0,2}(?:\.\d{0,2})?)?$/;

        if (regex.test(value)) {
            const floatVal = parseFloat(value);
            if (value === '' || (!isNaN(floatVal) && floatVal <= 10)) {
                setPromedio(value);
            }
        }
    };

    return (
        <TextField
            id="promedio"
            label="Promedio"
            variant="outlined"
            fullWidth
            margin="normal"
            value={promedio}
            onChange={handleChange}
            inputProps={{
                inputMode: 'decimal',
                pattern: '^[0-9]+(\\.[0-9]{1,2})?$',
            }}
            helperText="Ingresa un número hasta con 2 decimales y máximo 10"
        />
    );
};

export default CampoPromedio;
