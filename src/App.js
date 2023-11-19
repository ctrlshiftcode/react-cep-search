import { useState } from "react";
import "./App.css";
import { FiSearch } from "react-icons/fi";
import api from './services/api'

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});

 async function handleSearch(){
    console.log(input)

    if (input === ''){
      console.log('Dados em branco')
      setCep({});
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      console.log(response.data);
      setCep(response.data);
      setInput('');
    } catch (error) {
      console.log('Erro na conexão ou dados inconsistentes');
      setInput('');
    }


  }


  return (
    <div className="App">
      {/* <div className="title">Consultar CEP</div> */}

      <div className="containerInput">
        <input type="text" placeholder="01001-000" value={input} onChange={(e) => setInput(e.target.value) }/>
        <button className="searchButton" onClick={handleSearch}><FiSearch /></button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main"> 
        <span> {cep.logradouro}, {cep.bairro} - {cep.localidade}, {cep.uf}</span>
        </main>
      ) }
    </div>
  );
}

export default App;
