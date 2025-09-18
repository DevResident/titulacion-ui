import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const CampoAnioIngreso: React.FC = () => {
    const [anioIngreso, setAnioIngreso] = useState<string>('');

    const anioActual = new Date().getFullYear();
    const anioMaximo = anioActual - 4;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Validar que sea numérico y menor o igual al año máximo
        if (/^\d{0,4}$/.test(value)) {
            if (value === '' || parseInt(value) <= anioMaximo) {
                setAnioIngreso(value);
            }
        }
    };

    return (
        <TextField
            id="anio-ingreso"
            label="Año de ingreso"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={anioIngreso}
            onChange={handleChange}
            inputProps={{
                max: anioMaximo,
                min: 1910,
                inputMode: 'numeric',
            }}
            helperText={`Debe ser menor o igual a ${anioMaximo}`}
        />
    );
};

export default CampoAnioIngreso;
