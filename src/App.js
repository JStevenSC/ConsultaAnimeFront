
import './App.css';
import  Axios from "axios";
import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  const [listaDeImagenes, setlistaDeImagenes]=useState([]);
  const [nameList, setNameList]=useState([]);
  const [scoreList, setScoreList]=useState([]);
  const [scoreStringList, setScoreStringList]=useState([]);
  const [parametro, setParametro] = useState("");
  console.log(scoreList);

  const getAnime = parametro => {
    Axios.get(`http://localhost:8090/steven/anime/buscar-anime?parametro=${parametro}`)
      .then(response => {
        if (response && response.data) {
          
          const data = response.data;
          const nameList = data.title;
          const imageList = data.imagenUrl;
          const scoreList = data.score;
          const scoreStringList = data.scoreString;          
    
          setlistaDeImagenes(imageList);
          setNameList(nameList);
          setScoreList(scoreList);
          setScoreStringList(scoreStringList);

        } else {
          console.error("Error: No se recibieron datos del servidor.");
        }
      })
      .catch(error => {
        console.error("Error al obtener datos:", error);
      });
  };
  

  const ListaDeImagenes = ({ imageList, nameList, scoreLists }) => {

    return (
      <div className="imagen-grid row mx-4">
        {imageList.map((imagen, index) => (
          <div key={index} className="col-md-3 mt-4">
            <div className="card h-100 d-flex flex-column justify-content-between">
              <div className="imagen-item">                
                <img
                  src={imagen}
                  alt={`Anime ${index}`}
                  className="img-fluid"
                  style={{ width: '100%', height: 'auto' }} // Tamaño de imagen
                />
              </div>
              <p style={{ fontWeight: 'bold', fontSize: '0.9 rem' }}> {nameList[index]}</p>
              <div>
                <p>Calificación: {scoreLists[index]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };


  return (
    <div className="App">   
 
      <header className="App-header">
      <h1>Buscador de Anime</h1> 
     
        <img src="https://blog.peraltas.com.br/wp-content/uploads/2017/10/animes-netflix-573x187.jpg" alt="logo" style={{ maxWidth: '40%', height: 'auto' }} />
      
        <div className=" m-2">
        <input 
          type="text" 
          value={parametro} 
          onChange={(e) => setParametro(e.target.value)} 
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              getAnime(parametro);
            }
          }}
          placeholder="Introduce el anime" 
        />
        <button className="btn btn-success m-2" onClick={() => getAnime(parametro)}>Buscar Anime</button>
        </div>
        <div className='mr-4 ml-4'>
          <ListaDeImagenes imageList={listaDeImagenes} nameList={nameList} scoreLists={scoreStringList}/>
        </div>
              
      </header> 
      <footer className="footer">
        <div className="container">
          <hr>
          </hr>
          
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <h4>Presentado</h4>
              <p>Juan Steven Sanchez Castro</p>
            </div>
            <div className="col-lg-4 col-md-6">
              <h4>Teléfono</h4>
              <p>+57 312 205 7069</p>
            </div>
            <div className="col-lg-4 col-md-12">
              <h4>Correo Electrónico</h4>
              <p>steven.jssc@gmail.com</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
