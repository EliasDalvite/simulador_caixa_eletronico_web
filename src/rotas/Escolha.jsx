import AppContext from "../AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Esolha() {
    const { context } = useContext(AppContext);

    const navigate = useNavigate();

    const goToNextRoute = () => {
        navigate(`/${context.fluxoEscolhido}`);
    };


    return (
        <div>
            <div>
                <input
                    type="radio"
                    checked={context.fluxoEscolhido === 'menorNumeroNotas'}
                    onChange={() => context.setFluxoEscolhido('menorNumeroNotas')}
                />
                <label>Menor numero de notas</label>
                <input
                    type="radio"
                    checked={context.fluxoEscolhido === 'sortidas'}
                    onChange={() => context.setFluxoEscolhido('sortidas')}
                />
                <label>Sortidas</label>
                <input
                    type="radio"
                    checked={context.fluxoEscolhido === 'personalizado'}
                    onChange={() => context.setFluxoEscolhido('personalizado')}
                />
                <label>Personalizado</label>
            </div>
            <button onClick={goToNextRoute}>Continuar</button>

        </div>
    )
}

export default Esolha;