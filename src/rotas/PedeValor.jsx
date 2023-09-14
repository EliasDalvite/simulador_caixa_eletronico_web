import AppContext from "../AppContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cedula from "../objetos/Cedulas"

function PedeValor() {
    const { context } = useContext(AppContext);

    const addNota = (indice) => {
        switch (indice) {
            case 0:
                context.setR$200(context.r$200 += 1);
                break;
            case 1:
                context.setR$100(context.r$100 += 1);
                break;
            case 2:
                context.setR$50(context.r$50 += 1);
                break;
            case 3:
                context.setR$20(context.r$20 += 1);
                break;
            case 4:
                context.setR$10(context.r$10 += 1);
                break;
            case 5:
                context.setR$5(context.r$5 += 1);
                break;
            case 6:
                context.setR$2(context.r$2 += 1);
                break;
            default:
                break;
        }
    };

    // para testes
    const zeraNotas = () => {
        context.setR$200(0);
        context.setR$100(0);
        context.setR$50(0);
        context.setR$20(0);
        context.setR$10(0);
        context.setR$5(0);
        context.setR$2(0);
    }

    const atualizaBanco = (cedulasObjetos) => {
        const apiUrl = "http://localhost:3002/cedulas";
        const dadosParaEnviar = []

        const cedula200 = cedulasObjetos.find((cedula) => cedula.id === 0);
        let x = {
            "nome": "R$200",
            "quantia": cedula200.quantia - context.r$200
        }
        dadosParaEnviar.push(x)
        const cedula100 = cedulasObjetos.find((cedula) => cedula.id === 1);
        x = {
            "nome": "R$100",
            "quantia": cedula100.quantia - context.r$100
        }
        dadosParaEnviar.push(x)
        const cedula50 = cedulasObjetos.find((cedula) => cedula.id === 2);
        x = {
            "nome": "R$50",
            "quantia": cedula50.quantia - context.r$50
        }
        dadosParaEnviar.push(x)
        const cedula20 = cedulasObjetos.find((cedula) => cedula.id === 3);
        x = {
            "nome": "R$20",
            "quantia": cedula20.quantia - context.r$20
        }
        dadosParaEnviar.push(x)
        const cedula10 = cedulasObjetos.find((cedula) => cedula.id === 4);
        x = {
            "nome": "R$10",
            "quantia": cedula10.quantia - context.r$10
        }
        dadosParaEnviar.push(x)
        const cedula5 = cedulasObjetos.find((cedula) => cedula.id === 5);
        x = {
            "nome": "R$5",
            "quantia": cedula5.quantia - context.r$5
        }
        dadosParaEnviar.push(x)
        const cedula2 = cedulasObjetos.find((cedula) => cedula.id === 6);
        x = {
            "nome": "R$2",
            "quantia": cedula2.quantia - context.r$2
        }
        dadosParaEnviar.push(x)

        console.log(dadosParaEnviar)
        axios.put(apiUrl, dadosParaEnviar)
            .then((response) => {
                console.log('Solicitação PUT bem-sucedida', response.data);
            })
            .catch((error) => {
                console.error('Erro na solicitação PUT', error);
            });
    }


    function verificaUltimoDigito(valorProximo, cedulasObjetos) {
        const ultimoDigito = context.valorARetirar % 10;
        const cedulas5RS = cedulasObjetos.find((cedula) => cedula.id === 5);
        const cedulas2RS = cedulasObjetos.find((cedula) => cedula.id === 6);
        let x = 0
        switch (ultimoDigito) {
            case 6:
                if (cedulas2RS.quantia > 2) {
                    addNota(6)
                    addNota(6)
                    addNota(6)
                    return 6
                }
                break;
            case 8:
                if (cedulas2RS.quantia > 3) {
                    addNota(6)
                    addNota(6)
                    addNota(6)
                    addNota(6)
                    return 8
                }
                break;
            case 3:
                x = 0
                if (context.valorARetirar > 10) {
                    if (cedulas5RS.quantia > 0) {
                        addNota(5)
                        x += 5
                    }
                    if (cedulas2RS.quantia > 3) {
                        addNota(6)
                        addNota(6)
                        addNota(6)
                        addNota(6)
                        x += 8
                    }
                }
                return x
            case 1:
                x = 0
                if (context.valorARetirar > 10) {
                    if (cedulas5RS.quantia > 0) {
                        addNota(5)
                        x += 5
                    }
                    if (cedulas2RS.quantia > 2) {
                        addNota(6)
                        addNota(6)
                        addNota(6)
                        x += 6
                    }
                }
                return x
            default:
                return valorProximo
        }
    }

    const navigate = useNavigate();

    const [jaSomou, setJaSomou] = useState(false);

    const getCedulas = () => {
        setJaSomou(true)

        const baseURL = "http://localhost:3002/cedulas";

        axios.get(baseURL).then((response) => {
            const cedulasData = response.data;

            const cedulasObjetos = cedulasData.map((cedula, index) => {
                return new Cedula(index, cedula.nome, cedula.quantia);
            });

            context.setCedulas(cedulasObjetos);

            let soma = 0;
            cedulasObjetos.forEach((cedula) => {
                soma += parseInt(cedula.nome.replace("R$", ""), 10) * cedula.quantia;
            });


            let valorProximo = 0;
            valorProximo = verificaUltimoDigito(valorProximo, cedulasObjetos)
            for (let i = 0; i <= 6; i++) {
                const cedulaEncontrada = cedulasObjetos.find((cedula) => cedula.id === i);
                for (let j = 1; j <= cedulaEncontrada.quantia; j++) {
                    if (valorProximo + parseInt(cedulaEncontrada.nome.replace("R$", ""), 10) <= context.valorARetirar) {
                        if (cedulaEncontrada.id === 5) {

                        }
                        valorProximo += parseInt(cedulaEncontrada.nome.replace("R$", ""), 10)
                        addNota(cedulaEncontrada.id)
                    } else {
                        break
                    }
                }
            }
            console.log(`200: ${context.r$200}`)
            console.log(`100: ${context.r$100}`)
            console.log(`50: ${context.r$50}`)
            console.log(`20: ${context.r$20}`)
            console.log(`10: ${context.r$10}`)
            console.log(`5: ${context.r$5}`)
            console.log(`2: ${context.r$2}`)
            console.log(`valor total: ${valorProximo}`)
            // descomentar aqui para testar melhor
            // zeraNotas()

            const valorARetirar = parseInt(context.valorARetirar, 10);
            if (!isNaN(valorARetirar)) {
                if (soma > context.valorARetirar && context.valorARetirar > 0) {
                    goToNextRoute(true, valorProximo, cedulasObjetos);
                } else {
                    goToNextRoute(false);
                }
            }

        });
    }


    const mostraCalculo = () => {
        let soma = 0
        context.cedulas.forEach((cedula) => {
            soma += parseInt(cedula.nome.replace("R$", ""), 10) * cedula.quantia;
        });

        const valorARetirar = parseInt(context.valorARetirar, 10);

        if (jaSomou) {
            if (context.valorARetirar <= 0 || isNaN(valorARetirar) || context.valorARetirar.includes(',')) {
                return (
                    <h3>
                        Insira um valor válido para ser retirado
                    </h3>
                )
            } else if (soma < context.valorARetirar) {
                return (
                    <h3>
                        O caixa não tem o valor necessário para o saque no momento, tente mais tarde
                    </h3>
                )
            } else if (soma > context.valorARetirar || soma === 0) {
                return <></>
            }

        }
    }

    const goToNextRoute = (podeAvancar, valorProximo, cedulasObjetos) => {
        if (podeAvancar) {
            // if((valorProximo > context.valorARetirar)){
                atualizaBanco(cedulasObjetos)
            // }
            navigate(`/mostraQuantiaNotas/${valorProximo}`);
        }
    };

    return (
        <div>
            <h1>Qual o valor que será retirado?</h1>
            <h3>
            </h3>
            <h3>
                <label>R$:   </label>
                <input
                    type="text"
                    value={context.valorARetirar}
                    onChange={e => { context.setValorARetirar(e.target.value) }}
                />
            </h3>
            {mostraCalculo()}
            <button onClick={getCedulas}>Continuar</button>
        </div>
    )
}

export default PedeValor;