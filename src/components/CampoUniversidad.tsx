import React, {useState} from 'react';
import TextField from '@mui/material/TextField';

interface UniversidadProps{
    universidad: string
}

const universidadesMap: Record<string, string> = {
    UNAM: "Universidad Nacional Autónoma de México",
};

const CampoUniversidad: React.FC<UniversidadProps> = ({ universidad }) => {
    const [valor, setValor] = useState<string>(universidad);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValor(e.target.value);
    };

    const displayValue = universidadesMap[valor] || valor;

    return (
        <TextField
            id="universidad"
            label="Universidad"
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

export default CampoUniversidad;