import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CampoCodigoVerificacion from "../components/CampoCodigoVerificacion";
import { useOtp } from "../hooks/useOtp";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";
import type { AxiosResponse } from "axios";

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

type NavState = {
    numeroCuenta: string;
    correo: string;
    usuario: string; // sigue siendo
};

export default function Verificacion() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = (location.state || {}) as NavState;

    const [otp, setOtp] = useState("");
    const { verify, loadingValidar, msg } = useOtp();
    const { setToken } = useAuth();

    const handleValidar = async () => {
        const tok = await verify({
            numeroCuenta: state.numeroCuenta || "",
            correo: state.correo || "",
            codigo: otp,
        });

        setToken(tok);

        // opcional: precargar datos de alumno y dejarlos en history.state si quieres
        try {
            const { data }: AxiosResponse<Datos> = await api.post("/alumno/buscar");
            // regresa a registro y avanza
            navigate("/registro", { replace: true, state: { precargado: data } });
        } catch {
            navigate("/registro", { replace: true });
        }
    };

    // si alguien entra directo sin state, regresa registro
    if (!state?.numeroCuenta || !state?.correo) {
        navigate("/registro", { replace: true });
        return null;
    }

    return (
        <Box sx={{ width: "70%", margin: "40px auto" }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Verificación
            </Typography>
            <Typography sx={{ mb: 2 }}>
                Ingresa el código que enviamos a <strong>{state.correo}</strong>
            </Typography>

            <CampoCodigoVerificacion value={otp} onChange={setOtp} onComplete={setOtp} />

            <Button
                sx={{ mt: 2 }}
                variant="contained"
                onClick={handleValidar}
                disabled={otp.length < 6 || loadingValidar}
            >
                {loadingValidar ? "Validando…" : "Validar código"}
            </Button>

            {!!msg && (
                <Typography sx={{ mt: 1 }} color={msg.includes("envió") ? "success.main" : "error"}>
                    {msg}
                </Typography>
            )}
        </Box>
    );
}
