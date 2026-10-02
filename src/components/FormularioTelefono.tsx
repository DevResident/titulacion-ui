import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { Box, TextField } from '@mui/material';

// Ajusta esta regex si tus teléfonos no son de 10 dígitos
const PHONE_REGEX = /^\d{10}$/;

export default function FormularioTelefono() {
    const [principal, setPrincipal] = useState('');
    const [secundario, setSecundario] = useState('');

    const [errorPrincipal, setErrorPrincipal] = useState(false);
    const [errorSecundario, setErrorSecundario] = useState(false);

    const handleChangePrincipal = (e: ChangeEvent<HTMLInputElement>) => {
        // Solo números, máximo 10
        const v = e.target.value.replace(/\D/g, '').slice(0, 10);
        setPrincipal(v);
        setErrorPrincipal(!PHONE_REGEX.test(v)); // requerido + formato
    };

    const handleChangeSecundario = (e: ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value.replace(/\D/g, '').slice(0, 10);
        setSecundario(v);
        setErrorSecundario(!PHONE_REGEX.test(v));
    };

    return (
        <Box>
            <TextField
                fullWidth
                margin="normal"
                label="Teléfono principal"
                name="telefonoPrincipal"
                value={principal}
                onChange={handleChangePrincipal}
                error={errorPrincipal}
                helperText={errorPrincipal ? 'Debe ser un número de 10 dígitos' : ' '}
                type="tel"
                required
                inputProps={{
                    maxLength: 10,
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                }}
            />

            <TextField
                fullWidth
                margin="normal"
                label="Teléfono secundario"
                name="telefonoSecundario"
                value={secundario}
                onChange={handleChangeSecundario}
                error={errorSecundario}
                helperText={errorSecundario ? 'Debe ser un número de 10 dígitos' : ' '}
                type="tel"
                required
                inputProps={{
                    maxLength: 10,
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                }}
            />
        </Box>
    );
}
