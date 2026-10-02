import React from 'react';
import TextField from '@mui/material/TextField';

const CampoUniversidad: React.FC = () => {
    return (
        <>
            <TextField
                id="universidad"
                label="Universidad"
                value="Universidad Nacional Autónoma de México"
                variant="outlined"
                fullWidth
                margin="normal"
                disabled
            />

            <TextField
                id="plantel"
                select
                label="Plantel"
                value="Facultad de Contaduría y Administración"
                variant="outlined"
                fullWidth
                margin="normal"
                disabled
                SelectProps={{ native: true }}
            >
                <option value="Facultad de Contaduría y Administración">
                    Facultad de Contaduría y Administración
                </option>
            </TextField>
        </>
    );
};

export default CampoUniversidad;