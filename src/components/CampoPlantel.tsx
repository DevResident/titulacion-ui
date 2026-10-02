import React, {useState} from 'react';
import TextField from '@mui/material/TextField';

interface PlantelProps{
    plantel: string
}

const plantelesMap: Record<string, string> = {
    FCA: "Facultad de Contaduría y Administración",
};

const CampoPlantel: React.FC<PlantelProps> = ({ plantel }) => {
    const [valor, setValor] = useState<string>(plantel);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValor(e.target.value);
    };

    const displayValue = plantelesMap[valor] || valor;

    return (
        <TextField
            id="plantel"
            label="Plantel"
            variant="outlined"
            fullWidth
            margin="normal"
            value={displayValue}
            disabled = {true}
            onChange={handleChange}
            SelectProps={{ native: true }}
            InputLabelProps={{ shrink: true }}
        >
        </TextField>
    );
};

export default CampoPlantel;