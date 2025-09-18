import Formulario from "./components/Formulario.tsx";

export default function App() {

    return (
        <div style={{display: "flex", flexDirection: "column",
            gap:"20px", justifyContent: "center", alignItems: "center",
            minHeight: "40vh", minWidth: "200vh", padding: "20px"}}>
            <h1>Formato de Datos Generales</h1>
            <Formulario/>
        </div>
    );
}
