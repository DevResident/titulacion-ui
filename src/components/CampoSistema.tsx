import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

interface DatoSistema{
    sistema: string
}

const sistemasMap: Record<string, string> = {
    ESC: "Escolarizado",
    ED: "Educaci�n a Distancia",
    SUA: "Sistema de Universidad Abierta"
};

const CampoSistema: React.FC<DatoSistema> = ({sistema}) => {
    const [valor, setValor] = useState<string>(sistema);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValor(e.target.value);
    };

    const displayValue = sistemasMap[valor] || valor;

    return (
        <TextField
            id="sistema"
            label="Sistema"
            variant="outlined"
            fullWidth
            margin="normal"
            value={displayValue}
            disabled = {true}
            onChange={handleChange}
            SelectProps={{ native: true }}
            InputLabelProps={{ shrink: true }}
        />
    );
};

export default CampoSistema;
