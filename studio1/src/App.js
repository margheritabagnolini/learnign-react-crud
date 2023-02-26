// import logo from "./logo.svg";
import "./App.css";

//GLI IMPORT COMMENTATI QUI SOTTO SONO QUELLI CHE CI SERVIVANO PER LA PARTE CHE ABBIAMO FATTO COL PROF A LEZIONE
// import Componente1 from "./components/Componente1";
// import Componente2 from "./components/Componente2";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmpListing from "./components/EmpListing";
import EmpCreate from "./components/EmpCreate";
import EmpDetail from "./components/EmpDetail";
import EmpEdit from "./components/EmpEdit";

function App() {
  return (
    <div>


      {/* LA PARTE QUI SOTTO COMMENTATA è QUELLO CHE ABBIAMO FATTO COL PROF A LEZIONE */}
      {/* <h1>La parola albicocca esiste?</h1>
      <h2>se si cosa significa?</h2>
      <br></br>
      <h2>scopriamolo</h2>
      <Componente1 />
      <br></br>
      <br></br>
      <h2>e pesca?</h2>
      <Componente2 />
      <br></br>
      <br></br> */}



      {/* QUI SOTTO è IMPLEMENTATA LA PARTE DEL VIDEO */}
      <h1>Esercizio CRUD</h1>
      <BrowserRouter>
        <Routes>
          {/* qui sono elencate le route */}
          <Route path="/" element={<EmpListing />}></Route> {/* lista degli impiegati */}
          <Route path="/employee/create" element={<EmpCreate />}></Route> {/* creazione impiegato */}
          <Route path="/employee/detail/:empid" element={<EmpDetail />}></Route> {/* visualizzazione dettaglio impiegato */}
          <Route path="/employee/edit/:empid" element={<EmpEdit />}></Route> {/* modifica impiegato */}


          {/* PARTE FATTA COL PROF */}
          {/* <Route path="/" element={<Componente1></Componente1>}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
