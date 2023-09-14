// import AppContext from "../AppContext";
// import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Personalizado() {
    const [val200, setVal200] = useState(0);
    const [val100, setVal100] = useState(0);
    const [val50, setVal50] = useState(0);
    const [val20, setVal20] = useState(0);
    const [val10, setVal10] = useState(0);
    const [val5, setVal5] = useState(0);
    const [val2, setVal2] = useState(0);

    const navigate = useNavigate();

    const goToNextRoute = () => {
        navigate(`/`);
    };

    return (
        <div>
        <h1>Aqui você pode escolher, de forma personalizada, como vai querer a divisão das notas</h1>
        <h2>Utilize das opções abaixo como desejar, de forma a que não exceda seu valo de saque</h2>

            <div><label>Quantidade de notas de R$200:  </label>
                <input
                    type="text"
                    value={val200}
                    onChange={e => setVal200(e.target.value)}
                /></div>
        
        <div><label>Quantidade de notas de R$100:  </label>
                <input
                    type="text"
                    value={val100}
                    onChange={e => setVal100(e.target.value)}
                /></div><div><label>Quantidade de notas de R$50:   </label>
                <input
                    type="text"
                    value={val50}
                    onChange={e => setVal50(e.target.value)}
                /></div>
                <div><label>Quantidade de notas de R$20:   </label>
                <input
                    type="text"
                    value={val20}
                    onChange={e => setVal20(e.target.value)}
                /></div><div><label>Quantidade de notas de R$10:   </label>
                <input
                    type="text"
                    value={val10}
                    onChange={e => setVal10(e.target.value)}
                /></div><div><label>Quantidade de notas de R$5:   </label>
                <input
                    type="text"
                    value={val5}
                    onChange={e => setVal5(e.target.value)}
                /></div><div><label>Quantidade de notas de R$2:  </label>
                <input
                    type="text"
                    value={val2}
                    onChange={e => setVal2(e.target.value)}
                /></div>
        <button onClick={goToNextRoute}>Voltar</button>
        <button onClick={goToNextRoute}>Realizar saque</button>
    </div>
    )
}

export default Personalizado;