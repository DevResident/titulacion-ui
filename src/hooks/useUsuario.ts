import { useCallback, useState } from "react";
import api from "../services/api";
import { getErrMsg } from "../utils/errors";

export interface DatosAlumno {
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

export function useUsuario() {
    const [datos, setDatos] = useState<DatosAlumno | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const cargarAlumno = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await api.post<DatosAlumno>("/alumno/buscar");
            setDatos(data);
            return data;
        } catch (e) {
            const msg = getErrMsg(e, "No se pudieron cargar tus datos");
            setError(msg);
            throw e;
        } finally {
            setLoading(false);
        }
    }, []);

    return { datos, setDatos, loading, error, cargarAlumno };
}
