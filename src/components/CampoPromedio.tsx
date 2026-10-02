import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

interface PropPromedio{
    promedio: number;
}

const CampoPromedio: React.FC<PropPromedio> = ({promedio}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;


        // Validar formato: número con hasta 2 decimales, y menor o igual a 10
        const regex = /^(?:\d{0,2}(?:\.\d{0,2})?)?$/;



        if (regex.test(value)) {
            const floatVal = parseFloat(value);
            if (value === '' || (!isNaN(floatVal) && floatVal <= 10)) {
                setValor(value);
            }
        }
    };

    const [valor, setValor] = useState<number>(promedio);

    return (
        <TextField
            id="promedio"
            label="Promedio"
            variant="outlined"
            fullWidth
            margin="normal"
            value={valor}
            disabled = {true}
            onChange={handleChange} />
    );
};

export default CampoPromedio;
