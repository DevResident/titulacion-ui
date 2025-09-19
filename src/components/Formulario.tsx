import React, { useState } from "react";
import { Box, Step, StepLabel, Stepper, TextField,Button } from "@mui/material";
import FormularioDatosPersonales from "./FormularioDatosPersonales.tsx";
import CampoUniversidad from "./CampoUniversidad.tsx";
import CampoLicenciatura from "./CampoLicenciatura.tsx";
import CampoSistema from "./CampoSistema.tsx";
import CampoAnioIngreso from "./CampoAnioIngreso.tsx";
import CampoPromedio from "./CampoPromedio.tsx";
import FormularioTelefono from "./FormularioTelefono.tsx";
import CampoCorreoElectronico from "./CampoCorreoElectronico.tsx";
import CampoFotografia from "./CampoFotografia.tsx";
import axios from "axios";

const steps = [
    "Cuenta y nacimiento",
    "Datos personales",
    "Escolaridad",
    "Ingreso y promedio",
    "Contacto",
];

interface Datos {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    sexo: string;
    nacionalidad: string;
    curp?: string;
}


const Formulario: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);

    const [datos, setDatos] = useState<Datos>({
        nombre: "Diana",
        apellidoPaterno: "SANTIAGO",
        apellidoMaterno: "GARCIA",
        sexo: "femenino",
        nacionalidad: "Mexicana",
        curp: "SAGM750719MDFNRR03",
    });

    const [alumno, setAlumno] = useState({
        curp: '',
        numeroCuenta: ''
    });

    const [token, setToken] = useState<string | null>(null);

    const login= async (): Promise<string | null> => {
        try {
            const response = await axios.post<{ token: string }>(
                "http://localhost:8082/auth/login",
                {
                    usuario: alumno.numeroCuenta,
                    contrasenia: alumno.curp,
                }
            );

            const tokenObtenido = response.data.token;
            setToken(tokenObtenido);
            console.log("Token recibido:", tokenObtenido);

            return tokenObtenido;
        } catch (error) {
            console.error("Error en login:", error);
            return null;
        }
    };
    const handleSubmit = async () => {
        try {
            const tokenObtenido = await login();
            if (!tokenObtenido) return;

            await loadData(tokenObtenido); // se lo pasamos directamente
            alert(`Formulario en el primer paso 
${alumno.curp}`);
            handleNext();
        } catch (error) {
            console.error("Error en el flujo de login y carga:", error);
        }
    };


    const loadData = async (tokenOverride?: string) => {
        const authToken = tokenOverride ?? token; // si viene de login, úsalo
        if (!authToken) {
            console.error("No hay token, primero haz login");
            return;
        }
        const response = await axios.post<Datos>(
            "http://localhost:8082/alumno/buscar",
            {
                numeroCuenta: alumno.numeroCuenta, // string no vacío
                curp: alumno.curp,                 // string
                nombreFotografia: ""                // aunque sea vacío, debe estar presente
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

            // 4️⃣ Guardar datos en estado
            setDatos(response.data);

    };

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>
        setAlumno(prev => ({...prev, curp: e.target.value}));
    const handleChangeNumero = (e:React.ChangeEvent<HTMLInputElement>) =>
        setAlumno(prev => ({...prev, numeroCuenta: e.target.value}));

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            id="numero-cuenta"
                            label="Número de cuenta"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="tel"
                            value={alumno.numeroCuenta}
                            onChange={handleChangeNumero}
                            inputProps={{
                                maxLength: 9,
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                            }}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="CURP"
                            name="curp"
                            value={alumno.curp}
                            onChange={handleChange}
                            inputProps={{
                                maxLength: 18,
                                pattern: '[A-Z]{4}\\d{6}[HM][A-Z]{5}\\d{2}',
                            }}
                            helperText="Debe tener 18 caracteres y estar en mayúsculas"
                        />
                    </Box>
                );
            case 1:
                return (
                    <Box display="flex" flexDirection="column" gap={2}>
                        <FormularioDatosPersonales nombre={datos.nombre}
                                                   apellidoPaterno={datos.apellidoPaterno}
                                                   apellidoMaterno={datos.apellidoMaterno}
                                                   sexo={datos.sexo}
                                                   nacionalidad={datos.nacionalidad}
                                                   />
                    </Box>
                );
            case 2:
                return (
                    <Box display="flex" flexDirection="column" gap={2}>
                        <CampoUniversidad />
                        <CampoLicenciatura />
                        <CampoSistema />
                    </Box>
                );
            case 3:
                return (
                    <Box display="flex" flexDirection="column" gap={2}>
                        <CampoAnioIngreso />
                        <CampoPromedio />
                    </Box>
                );
            case 4:
                return (
                    <Box display="flex" flexDirection="column" gap={2}>
                        <CampoFotografia/>

                        <FormularioTelefono />

                        <FormularioTelefono />

                        <CampoCorreoElectronico />
                    </Box>
                );
            default:
                return <div>Formulario completo</div>;
        }
    };

    return (
        <Box sx={{ width: "70%", margin: "0 auto" }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Box sx={{ mt: 4 }}>{renderStepContent(activeStep)}</Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    variant="outlined"
                >
                    Atrás
                </Button>
                {activeStep === 0 ? (
                    <Button variant="contained" onClick={handleSubmit}>
                        Enviar
                    </Button>
                ) : (
                    <Button variant="contained" onClick={handleNext}>
                        Siguiente
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default Formulario;
