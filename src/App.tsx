import AppRoutes from "./routes/AppRoutes";
export default function App() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap:"20px",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "40vh",
            width: "100vw",
            padding: "20px",
            boxSizing: "border-box"
        }}>
            <h1>Formato de Datos Generales</h1>
            <AppRoutes />
        </div>
    );
}