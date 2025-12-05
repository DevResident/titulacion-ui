import api from './api';
import type {AxiosResponse} from "axios";

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

export type AltaUsuarioPayload = {
    numeroCuenta: string;  // (antes “usuario”)
    curp: string;          // (antes “contrasenia”, renómbralo en BE cuando puedas)
    correo: string;
    codigo: string;        // OTP
};

// alta de usuario
export async function altaUsuarioYToken(payload: AltaUsuarioPayload) {

    const { data } = await api.post('/usuario/alta', payload);
    return data;
}

// recepción del token
export async function loginConCredenciales(usuario: string, contrasenia: string) {
    // /auth/login devuelve { token } si credenciales correctas
    const { data } = await api.post('/auth/login', { usuario, contrasenia });
    return data; // { token }
}

// enviar OTP al correo
export async function solicitarCodigo(correo: string) {
    return api.post('/usuario/solicitar-codigo', { correo });
}

// auth login
export async function loginUsuario(Datos: Datos) {
    return api.post('/alumno/buscar', { tok });
}
