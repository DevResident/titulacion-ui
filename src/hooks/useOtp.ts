import { useState, useCallback } from "react";
import { solicitarCodigo, altaUsuarioYToken, loginConCredenciales } from "../services/auth";
import { getErrMsg } from "../utils/errors";

type VerifyParams = {
    numeroCuenta: string;
    curp: string;            // si no aplica, manda "" (el backend ignora)
    correo: string;
    codigo: string;          // OTP
};

/**
 * Encapsula toda la lógica de:
 * - enviar código (OTP) al correo
 * - validar OTP y obtener token (vía altaUsuarioYToken o fallback a loginConCredenciales)
 */
export function useOtp() {
    const [msg, setMsg] = useState<string | null>(null);
    const [loadingEnviar, setLoadingEnviar] = useState(false);
    const [loadingValidar, setLoadingValidar] = useState(false);

    const sendCode = useCallback(async (correo: string) => {
        try {
            setMsg(null);
            setLoadingEnviar(true);
            await solicitarCodigo(correo);
            setMsg("El código se envió a tu correo");
            return true;
        } catch (e) {
            setMsg(getErrMsg(e, "No se pudo enviar el código"));
            return false;
        } finally {
            setLoadingEnviar(false);
        }
    }, []);

    /**
     * Valida OTP y devuelve el token (string).
     * Lanza excepción si falla para que la página decida qué hacer.
     */
    const verify = useCallback(async (params: VerifyParams): Promise<string> => {
        try {
            setMsg(null);
            setLoadingValidar(true);

            const res = await altaUsuarioYToken({
                numeroCuenta: params.numeroCuenta.trim(),
                curp: params.curp.trim(),
                correo: params.correo.trim(),
                codigo: params.codigo.trim(),
            });

            if (res?.token) return res.token;

            // Fallback: login con credenciales (según tu flujo actual)
            const login = await loginConCredenciales(
                params.numeroCuenta.trim(),
                params.curp.trim()
            );
            return login.token;
        } catch (e) {
            const m = getErrMsg(e, "Código inválido o expirado");
            setMsg(m);
            throw e; // re-lanzamos para que la página pueda manejarlo si quiere
        } finally {
            setLoadingValidar(false);
        }
    }, []);

    return {
        // acciones
        sendCode,
        verify,
        // estado
        msg,
        setMsg,
        loadingEnviar,
        loadingValidar,
    };
}