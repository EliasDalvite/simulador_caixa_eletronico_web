import AppContext from "../AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Inicial() {
    const { context } = useContext(AppContext);

    context.setFluxoEscolhido("/")
    context.setValorARetirar(0)
    
    const navigate = useNavigate();

    const goToNextRoute = () => {
        navigate("/pedeValor");
    };

    return (
        <div>
            <h1>
                <button onClick={goToNextRoute}>Iniciar atendimento</button>
            </h1>
        </div>
    )
}

export default Inicial;