import React, { useState } from 'react';
import {
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel,
    FormControl,
    Box
} from '@mui/material';

const FormularioDatosPersonales: React.FC = () => {
    const [datos, setDatos] = useState({
        nombre: 'MARTHA',
        apellidoPaterno: 'SANTIAGO',
        apellidoMaterno: 'GARCIA',
        sexo: 'femenino',
        nacionalidad: 'Mexicana',
        curp: 'SAGM750719MDFNRR03',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setDatos((prev) => ({
            ...prev,
            [name]: name === 'curp' ? value.toUpperCase() : value,
        }));
    };

    return (
        <Box>
            <TextField
                fullWidth
                margin="normal"
                label="Apellido paterno"
                name="apellidoPaterno"
                value={datos.apellidoPaterno}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                margin="normal"
                label="Apellido materno"
                name="apellidoMaterno"
                value={datos.apellidoMaterno}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                margin="normal"
                label="Nombre(s)"
                name="nombre"
                value={datos.nombre}
                onChange={handleChange}
            />

            <FormControl component="fieldset" margin="normal">
                <FormLabel component="legend">Sexo</FormLabel>
                <RadioGroup
                    row
                    name="sexo"
                    value={datos.sexo}
                    onChange={handleChange}
                >
                    <FormControlLabel
                        value="femenino"
                        control={<Radio />}
                        label="Femenino"
                    />
                    <FormControlLabel
                        value="masculino"
                        control={<Radio />}
                        label="Masculino"
                    />
                </RadioGroup>
            </FormControl>

            <TextField
                fullWidth
                margin="normal"
                label="Nacionalidad"
                name="nacionalidad"
                value={datos.nacionalidad}
                onChange={handleChange}
            />

            <TextField
                fullWidth
                margin="normal"
                label="CURP"
                name="curp"
                value={datos.curp}
                onChange={handleChange}
                inputProps={{
                    maxLength: 18,
                    pattern: '[A-Z]{4}\\d{6}[HM][A-Z]{5}\\d{2}',
                }}
                helperText="Debe tener 18 caracteres y estar en mayúsculas"
            />
        </Box>
    );
};

export default FormularioDatosPersonales;
