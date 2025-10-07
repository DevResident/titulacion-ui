import api from './api';

export type AltaUsuarioPayload = {
    numeroCuenta: string;  // (antes “usuario”)
    curp: string;          // (antes “contrasenia”, renómbralo en BE cuando puedas)
    correo: string;
    codigo: string;        // OTP
};
export type Payload = {
    correo: string;
};

// enviar OTP al correo
export async function solicitarCodigo(correo: Payload) {
    return api.post('/usuario/solicitar-codigo', { correo });
}

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
