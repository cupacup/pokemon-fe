import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import MyPokemonList from './components/MyPokemonList';

const PokemonContext = createContext();

export const usePokemonContext = () => useContext(PokemonContext);

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [caughtPokemons, setCaughtPokemons] = useState([]);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=10')
      .then(response => {
        setPokemons(response.data.results);
      });
  }, []);

  const catchPokemon = (name, nickname) => {
    axios.post('http://localhost:5000/catch', { name })
      .then(response => {
        if (response.data.success) {
          setCaughtPokemons([...caughtPokemons, { name, nickname }]);
        }
        alert(response.data.message);
      });
  };

  const releasePokemon = (name) => {
    axios.post('http://localhost:5000/release', { name })
      .then(response => {
        if (response.data.success) {
          setCaughtPokemons(caughtPokemons.filter(pokemon => pokemon.name !== name));
        }
        alert(response.data.message);
      });
  };

  const renamePokemon = (name, nickname) => {
    axios.post('http://localhost:5000/rename', { name, nickname })
      .then(response => {
        if (response.data.success) {
          setCaughtPokemons(caughtPokemons.map(pokemon => 
            pokemon.name === name ? { ...pokemon, nickname: response.data.nickname } : pokemon
          ));
        }
        alert(response.data.message);
      });
  };

  return (
    <PokemonContext.Provider value={{ pokemons, caughtPokemons, catchPokemon, releasePokemon, renamePokemon }}>
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Pokémon App</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Pokemon List</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-pokemon-list">My Pokemon List</Link>
                </li>
              </ul>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/pokemon/:name" element={<PokemonDetail />} />
            <Route path="/my-pokemon-list" element={<MyPokemonList />} />
          </Routes>
        </div>
      </Router>
    </PokemonContext.Provider>
  );
}

export default App;