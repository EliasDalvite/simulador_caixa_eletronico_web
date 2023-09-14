import Inicial from './rotas/Inicial';
import NotFound from './rotas/NotFound';
import AppContext from './AppContext';
import Escolha from "./rotas/Escolha";
import MenorNumeroNotas from "./rotas/MenorNumeroNotas";
import PedeValor from "./rotas/PedeValor";
import Sortidas from "./rotas/Sortidas";
import Personalizado from "./rotas/Personalizado";
import MostraQuantiaNotas from "./rotas/MostraQuantiaNotas";
import { createBrowserRouter, RouterProvider  } from "react-router-dom";
import { useState } from "react";

const router = createBrowserRouter([
  {
    children: [
      {
        index : true,
        element: <Inicial />
      },
      {
        path : "pedeValor" ,
        element : <PedeValor/>,

      },
      {
        path : "mostraQuantiaNotas/:valorProximo" ,
        element : <MostraQuantiaNotas />
      },
      {
        path : "escolha" ,
        element : <Escolha/>
      },
      {
        path : "menorNumeroNotas" ,
        element : <MenorNumeroNotas/>
      },
      {
        path : "sortidas" ,
        element : <Sortidas/>
      },
      {
        path : "personalizado" ,
        element : <Personalizado/>
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
])



function App() {

  const [r$200, setR$200] = useState(0);
  const [r$100, setR$100] = useState(0);
  const [r$50, setR$50] = useState(0);
  const [r$20, setR$20] = useState(0);
  const [r$10, setR$10] = useState(0);
  const [r$5, setR$5] = useState(0);
  const [r$2, setR$2] = useState(0);
  const [fluxoEscolhido, setFluxoEscolhido] = useState("");
  const [valorARetirar, setValorARetirar] = useState(0);
  const [cedulas, setCedulas] = useState([]);

  const context = {
    r$200, setR$200,
    r$100, setR$100,
    r$50, setR$50,
    r$20, setR$20,
    r$10, setR$10,
    r$5, setR$5,
    r$2, setR$2,
    cedulas, setCedulas,
    fluxoEscolhido, setFluxoEscolhido,
    valorARetirar, setValorARetirar
  }

  return (
    <AppContext.Provider value={{
      context
    }}>
    <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
