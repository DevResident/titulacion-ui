import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import type { Location } from "react-router-dom";

import Registro from "../pages/Registro";
import Comprobante from "../pages/Comprobante";
import Verificacion from "../pages/Verificacion";
import { Dialog } from "@mui/material";

type BgState = { background?: Location };

function AppRoutesInner() {
    const location = useLocation();
    const state = location.state as BgState | null;
    const background = state?.background;

    return (
        <>
            {/* 1) Pinta las rutas normales. Si hay background, usamos ese para “congelar” el fondo */}
            <Routes location={background || location}>
                <Route path="/" element={<Navigate to="/registro" replace />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/verificacion" element={<Verificacion />} /> {/* fallback si entras directo */}
                <Route
                    path="/comprobante"
                    element={
                        <Comprobante />
                    }
                />
                <Route path="*" element={<Navigate to="/registro" replace />} />
            </Routes>

            {/* 2) Si hay background, además renderiza la verificación como modal encima */}
            {background && (
                <Routes>
                    <Route
                        path="/verificacion"
                        element={
                            <Dialog
                                open
                                fullWidth
                                maxWidth="xs"
                                onClose={() => window.history.back()} // cerrar = volver
                            >
                                {/* El mismo componente, reutilizado, solo que ahora dentro del Dialog */}
                                <Verificacion />
                            </Dialog>
                        }
                    />
                </Routes>
            )}
        </>
    );
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <AppRoutesInner />
        </BrowserRouter>
    );
}
