import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8082',
    timeout: 15000,
});

function getToken() {
    return localStorage.getItem('auth_token');
}

api.interceptors.request.use((config) => {
    const token = getToken();

    // Lista de rutas públicas que NO requieren token
    const publicRoutes = [
        '/usuario/alta',
        '/usuario/solicitar-codigo',
        '/auth/login'
    ];

    const isPublicRoute = publicRoutes.some(route =>
        config.url?.includes(route)
    );

    // Solo agregar token si existe y NO es una ruta pública
    if (token && !isPublicRoute) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Opcional: Interceptor de respuesta para manejar errores de autenticación
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Token inválido o expirado - limpiar y redirigir
            localStorage.removeItem('auth_token');
            window.location.href = '/registro';
        }
        return Promise.reject(error);
    }
);

export default api;