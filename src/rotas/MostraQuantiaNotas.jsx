import AppContext from "../AppContext";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MostraQuantiaNotas() {
    const { valorProximo } = useParams();

    const { context } = useContext(AppContext);

    const navigate = useNavigate();

    const zeraNotas = () => {
        context.setR$200(0);
        context.setR$100(0);
        context.setR$50(0);
        context.setR$20(0);
        context.setR$10(0);
        context.setR$5(0);
        context.setR$2(0);
    }

    const goToNextRoute = () => {
        zeraNotas()
        navigate(`/`);
    };

    function renderConteudo() {
        return (
            <div>
                <h1>Notas impressas! Quantia da cada uma delas:</h1>
                <div>R$200: {context.r$200}</div>
                <div>R$100: {context.r$100}</div>
                <div>R$50: {context.r$50}</div>
                <div>R$20: {context.r$20}</div>
                <div>R$10: {context.r$10}</div>
                <div>R$5: {context.r$5}</div>
                <div>R$2: {context.r$2}</div>
                <h2>Soma total: R${valorProximo}</h2>
                <button onClick={goToNextRoute}>Finalizar</button>
            </div>
        );
    }

    function renderMensagemDeErro() {
        return (
            <div>
                <h1>Erro</h1>
                <h2>Não foi possível retirar o valor solicitado, estamos com falta de cédulas</h2>
            </div>
        );
    }

    if (valorProximo < context.valorARetirar) {
        return renderMensagemDeErro();
    } else {
        return renderConteudo();
    }
}

export default MostraQuantiaNotas;