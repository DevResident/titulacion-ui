import React from 'react';
import {
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel,
    FormControl,
    Box
} from '@mui/material';

interface DatosPersonalesProps {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    sexo: string;
    nacionalidad: string;
}

const FormularioDatosPersonales: React.FC<DatosPersonalesProps> = ({
   nombre,
   apellidoPaterno,
   apellidoMaterno,
   sexo,
   nacionalidad,
}) => {

    return (
        <Box>
            <TextField
                fullWidth
                margin="normal"
                label="Apellido paterno"
                name="apellidoPaterno"
                value={apellidoPaterno}
            />
            <TextField
                fullWidth
                margin="normal"
                label="Apellido materno"
                name="apellidoMaterno"
                value={apellidoMaterno}
            />
            <TextField
                fullWidth
                margin="normal"
                label="Nombre(s)"
                name="nombre"
                value={nombre}
            />

            <FormControl component="fieldset" margin="normal">
                <FormLabel component="legend">Sexo</FormLabel>
                <RadioGroup
                    row
                    name="sexo"
                    value={sexo}
                    >
                    <FormControlLabel
                        value="F"
                        control={<Radio />}
                        label="Femenino"
                    />
                    <FormControlLabel
                        value="M"
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
                value={nacionalidad}
            />


        </Box>
    );
};

export default FormularioDatosPersonales;
