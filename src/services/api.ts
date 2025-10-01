import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8082',
    timeout: 15000,
});

// Lee el token desde localStorage (o donde prefieras)
function getToken() {
    return localStorage.getItem('auth_token');
}

api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        // Agrega Authorization automáticamente
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;