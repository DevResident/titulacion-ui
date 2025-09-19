import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

interface LicenciaturaProps{
    licenciatura: string
}

const CampoLicenciatura: React.FC<LicenciaturaProps> = ({ licenciatura }) => {
    const [valor, setValor] = useState<string>(licenciatura);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValor(e.target.value);
    };

    return (
        <TextField
            id="licenciatura"
            label="Licenciatura"
            variant="outlined"
            fullWidth
            margin="normal"
            value={valor}
            onChange={handleChange}
            disabled={true}
            SelectProps={{ native: true }}
            InputLabelProps={{ shrink: true }} />

    );
};

export default CampoLicenciatura;
