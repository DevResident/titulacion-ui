import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const CampoSistema: React.FC = () => {
    const [sistema, setSistema] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSistema(e.target.value);
    };

    return (
        <TextField
            id="sistema"
            select
            label="Sistema"
            variant="outlined"
            fullWidth
            margin="normal"
            value={sistema}
            onChange={handleChange}
            SelectProps={{ native: true }}
            InputLabelProps={{ shrink: true }}
        >
            <option value="">Selecciona un sistema</option>
            <option value="escolarizado">Escolarizado</option>
            <option value="semiescolarizado">Semiescolarizado</option>
        </TextField>
    );
};

export default CampoSistema;
