import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const CampoFechaNacimiento: React.FC = () => {
    const [fechaNacimiento, setFechaNacimiento] = useState<string>('');

    // Calcular la fecha máxima permitida (hoy - 18 años)
    const hoy = new Date();
    const fechaMaxima = new Date(
        hoy.getFullYear() - 18,
        hoy.getMonth(),
        hoy.getDate()
    )
        .toISOString()
        .split('T')[0]; // formato yyyy-MM-dd

    return (
        <TextField
            id="fecha-nacimiento"
            label="Fecha de nacimiento"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            value={fechaNacimiento}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFechaNacimiento(e.target.value)
            }
            InputLabelProps={{
                shrink: true,
            }}
            inputProps={{
                max: fechaMaxima,
            }}
        />
    );
};

export default CampoFechaNacimiento;
