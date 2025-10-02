import React, { useState } from "react";
import {Box, Step, StepLabel, Stepper, Button, Typography} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import FormularioDatosPersonales from "../components/FormularioDatosPersonales.tsx";
import CampoProcedencia from "../components/CampoProcedencia.tsx";
import CampoLicenciatura from "../components/CampoLicenciatura.tsx";
import CampoSistema from "../components/CampoSistema.tsx";
import CampoAnioIngreso from "../components/CampoAnioIngreso.tsx";
import CampoPromedio from "../components/CampoPromedio.tsx";
import FormularioTelefono from "../components/FormularioTelefono.tsx";
import CampoCorreoElectronico from "../components/CampoCorreoElectronico.tsx";
import CampoArchivo from "../components/CampoArchivo.tsx";
import CampoNumeroCuenta from "../components/CampoNumeroCuenta.tsx";

import { REQUISITOS } from "../utils/constantes.ts";
import { useAuth } from '../hooks/useAuth.ts';
import { useOtp } from "../hooks/useOtp.ts";

const steps = [
    "Valida tu identidad",
    "Datos personales",
    "Datos académicos",
    "Año de ingreso y promedio",
    "Contacto",
    "Documentación",
];

interface Datos {
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
    sexo: string;
    nacionalidad: string;
    licenciatura: string;
    sistema: string;
    ingreso: string;
    promedio: number;
}

const Registro: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const { token } = useAuth();

    const [datos] = useState<Datos>({
        nombre: "Diana Karen",
        primerApellido: "Herrera",
        segundoApellido: "Carrillo",
        sexo: "F",
        nacionalidad: "Mexicana",
        licenciatura: "Informatica",
        sistema: "Escolarizado",
        ingreso: "2014",
        promedio: 9.46,
    });

    const [alumno, setAlumno] = useState({
        numeroCuenta: "311217995",
        curp: "",
    });

    const [correo, setCorreo] = useState("");
    const { msg, sendCode, loadingEnviar } = useOtp();

    const validarNumeroCuenta = () => {
        const permitidos = ["1", "306", "307", "308", "309", "310", "311"];
        return permitidos.some((prefijo) =>
            alumno.numeroCuenta.startsWith(prefijo)
        );
    };

    const handleValidarCorreo = async () => {
        const ok = await sendCode(correo.trim());
        if (ok) {
            navigate("/verificacion", {
                state: {
                    numeroCuenta: alumno.numeroCuenta,
                    correo,
                    curp: alumno.curp ?? "",
                    background: location,
                },
            });
        }
    };

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Box display="flex" flexDirection="column" gap={2}>
                        <CampoNumeroCuenta
                            value={alumno.numeroCuenta}
                            onChange={(v) => setAlumno((p) => ({ ...p, numeroCuenta: v }))}
                        />
                        <CampoCorreoElectronico value={correo} onChange={setCorreo} />
                        {!!msg && (
                            <Typography sx={{ mt: 1 }} color={msg.includes("envió") ? "success.main" : "error"}>
                                {msg}
                            </Typography>
                        )}
                    </Box>
                );
            case 1:
                return (
                    <Box display="flex" flexDirection="column" gap={2}>
                        <FormularioDatosPersonales
                            nombre={datos.nombre}
                            apellidoPaterno={datos.primerApellido}
                            apellidoMaterno={datos.segundoApellido}
                            sexo={datos.sexo}
                            nacionalidad={datos.nacionalidad}
                        />
                    </Box>
                );
            case 2:
                return (
                    <Box display="flex" flexDirection="column" gap={2}>
                        <CampoProcedencia />
                        <CampoLicenciatura licenciatura={datos.licenciatura} />
                        <CampoSistema sistema={datos.sistema} />
                    </Box>
                );
            case 3:
                return (
                    <Box display="flex" flexDirection="column" gap={2}>
                        <CampoAnioIngreso ingreso={datos.ingreso} />
                        <CampoPromedio promedio={datos.promedio} />
                    </Box>
                );
            case 4:
                return (
                    <Box display="flex" flexDirection="column" gap={2}>
                        <FormularioTelefono />
                    </Box>
                );
            case 5:
                return (
                    <Box display="flex" flexDirection="column" gap={2} sx={{margin: "0 auto"}}>
                        <CampoArchivo CFG={REQUISITOS.fotografiaAlumno} />
                        <CampoArchivo CFG={REQUISITOS.historiaAcademica} />
                        <CampoArchivo CFG={REQUISITOS.servicioSocial} />
                        <CampoArchivo CFG={REQUISITOS.actaNacimiento} />
                        <CampoArchivo CFG={REQUISITOS.protestaUniversitaria} />
                        {validarNumeroCuenta() && (
                            <CampoArchivo CFG={REQUISITOS.certificado} />
                        )}
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
                <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
                    Atrás
                </Button>

                {activeStep === 0 ? (

                    <Button variant="contained" onClick={handleValidarCorreo} disabled={!alumno.numeroCuenta || !correo || loadingEnviar}>
                        {loadingEnviar ? "Enviando…" : "Validar correo"}
                    </Button>
                ) : (
                    <Button variant="contained" onClick={handleNext} disabled={activeStep === 1 && !token}>
                        Siguiente
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default Registro;
