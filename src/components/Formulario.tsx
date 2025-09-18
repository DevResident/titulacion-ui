import React, { useState } from "react";
import { Box, Step, StepLabel, Stepper, Button } from "@mui/material";
import CampoNumeroCuenta from "./CampoNumeroCuenta.tsx";
import CampoFechaNacimiento from "./CampoFechaNacimiento.tsx";
import FormularioDatosPersonales from "./FormularioDatosPersonales.tsx";
import CampoUniversidad from "./CampoUniversidad.tsx";
import CampoLicenciatura from "./CampoLicenciatura.tsx";
import CampoSistema from "./CampoSistema.tsx";
import CampoAnioIngreso from "./CampoAnioIngreso.tsx";
import CampoPromedio from "./CampoPromedio.tsx";
import FormularioTelefono from "./FormularioTelefono.tsx";
import CampoCorreoElectronico from "./CampoCorreoElectronico.tsx";
import CampoFotografia from "./CampoFotografia.tsx";

const steps = [
    "Cuenta y nacimiento",
    "Datos personales",
    "Escolaridad",
    "Ingreso y promedio",
    "Contacto",
];

const Formulario: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Box display="flex" flexDirection="column" gap={2}>
                        <CampoNumeroCuenta />
                        <CampoFechaNacimiento />
                    </Box>
                );
            case 1:
                return (
                    <Box display="flex" flexDirection="column" gap={2}>
                        <FormularioDatosPersonales />
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
                {activeStep === steps.length - 1 ? (
                    <Button variant="contained" onClick={() => alert("Formulario enviado")}>
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
