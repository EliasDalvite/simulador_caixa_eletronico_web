// import AppContext from "../AppContext";
// import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function MenorNumeroNotas() {
    // const { context } = useContext(AppContext);

    const navigate = useNavigate();

    const goToNextRoute = () => {
        navigate(`/`);
    };

    return (
        <div>
        <h1>Menor número de notas</h1>
        <h2>Nesta opção serão separadas primeiro as notas de maior valor disponíveis</h2>
        <h2>Na sequência serão separadas as notas de menor valor, a fim de fechar o valor do saque</h2>
        <button onClick={goToNextRoute}>Voltar</button>
        <button onClick={goToNextRoute}>Realizar saque</button>
    </div>
    )
}

export default MenorNumeroNotas;