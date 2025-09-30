import React, { useState } from "react";
import {Box, Step, StepLabel, Stepper, Button, Modal, Typography} from "@mui/material";
import axios from "axios";

import FormularioDatosPersonales from "./FormularioDatosPersonales.tsx";
import CampoProcedencia from "./CampoProcedencia.tsx";
import CampoLicenciatura from "./CampoLicenciatura.tsx";
import CampoSistema from "./CampoSistema.tsx";
import CampoAnioIngreso from "./CampoAnioIngreso.tsx";
import CampoPromedio from "./CampoPromedio.tsx";
import FormularioTelefono from "./FormularioTelefono.tsx";
import CampoCorreoElectronico from "./CampoCorreoElectronico.tsx";
import CampoCodigoVerificacion from "./CampoCodigoVerificacion.tsx";
import CampoArchivo from "./CampoArchivo.tsx";
import CampoNumeroCuenta from "./CampoNumeroCuenta.tsx";
import { REQUISITOS } from "../utils/Constantes.ts";

const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

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

const Formulario: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [open, setOpen] = useState(false);

    const [datos, setDatos] = useState<Datos>({
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
    const [otp, setOtp] = useState("");
    const [token, setToken] = useState<string | null>(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const login = async (): Promise<string | null> => {
        try {
            const response = await axios.post<{ token: string }>(
                "/api/auth/login",
                {
                    usuario: alumno.numeroCuenta,
                    contrasenia: alumno.curp,
                }
            );
            const tokenObtenido = response.data.token;
            setToken(tokenObtenido);
            return tokenObtenido;
        } catch (error) {
            console.error("Error en login:", error);
            return null;
        }
    };

    const handleValidarCorreo = async () => {
        try {
            handleOpen();
        } catch (error) {
            console.error("Error al abrir verificación:", error);
        }
    };

    const validarNumeroCuenta = () => {
        const permitidos = ["1", "306", "307", "308", "309", "310", "311"];
        return permitidos.some((prefijo) =>
            alumno.numeroCuenta.startsWith(prefijo)
        );
    };

    const handleValidarCodigo = async () => {
        try {
            // aquí podrías verificar OTP en backend si aplica
            handleClose();
            handleNext();
        } catch (error) {
            console.error("Error al validar código:", error);
        }
    };

    const handleSubmit = async () => {
        try {
            const tokenObtenido = await login();
            if (!tokenObtenido) return;

            await loadData(tokenObtenido);
            alert(`Formulario en el primer paso
            ${alumno.curp}`);
            handleNext();
        } catch (error) {
            console.error("Error en el flujo de login y carga:", error);
        }
    };

    const loadData = async (tokenOverride?: string) => {
        const authToken = tokenOverride ?? token;
        if (!authToken) {
            console.error("No hay token, primero haz login");
            return;
        }
        const response = await axios.post<Datos>(
            "/api/alumno/buscar",
            {
                numeroCuenta: alumno.numeroCuenta,
                curp: alumno.curp,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        setDatos(response.data);
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
                    <Button variant="contained" onClick={handleValidarCorreo}>
                        Validar correo
                    </Button>
                ) : (
                    <Button variant="contained" onClick={handleNext}>
                        Siguiente
                    </Button>
                )}
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Ingresa el código que enviamos a tu correo:
                    </Typography>
                    <CampoCodigoVerificacion
                        value={otp}
                        onChange={setOtp}
                        onComplete={setOtp}
                    />
                    <Button
                        sx={{ mt: 2 }}
                        onClick={handleValidarCodigo}
                        disabled={otp.length < 6}
                    >
                        Validar
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default Formulario;
