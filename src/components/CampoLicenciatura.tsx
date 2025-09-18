import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const CampoLicenciatura: React.FC = () => {
    const [licenciatura, setLicenciatura] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLicenciatura(e.target.value);
    };

    return (
        <TextField
            id="licenciatura"
            select
            label="Licenciatura"
            variant="outlined"
            fullWidth
            margin="normal"
            value={licenciatura}
            onChange={handleChange}
            SelectProps={{ native: true }}
            InputLabelProps={{ shrink: true }}
        >
            <option value="">Selecciona una licenciatura</option>
            <option value="1">Administración</option>
            <option value="2">Contaduría</option>
            <option value="3">Informática</option>
            <option value="4">Negocios Internacionales</option>
        </TextField>
    );
};

export default CampoLicenciatura;
