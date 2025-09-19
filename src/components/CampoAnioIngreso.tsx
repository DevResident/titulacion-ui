import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

interface IngresoProp {
    ingreso: string;
}

const CampoAnioIngreso: React.FC<IngresoProp> = ({ingreso}) => {
    const [valor, setValor] = useState<string>(ingreso);

    const anioActual = new Date().getFullYear();
    const anioMaximo = anioActual - 4;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Validar que sea numérico y menor o igual al año máximo
        if (/^\d{0,4}$/.test(value)) {
            if (value === '' || parseInt(value) <= anioMaximo) {
                setValor(value);
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
            value={valor}
            disabled={true}
            onChange={handleChange}
        />
    );
};

export default CampoAnioIngreso;
