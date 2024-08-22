// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchPokemonList } from '../redux/actions';
// import { Link } from 'react-router-dom';
// import '../PokemonList.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { usePokemonContext } from '../App';

function PokemonList() {
  const { pokemons } = usePokemonContext();

  return (
    <div className="row">
      {pokemons.map(pokemon => (
        <div key={pokemon.name} className="col-md-4">
          <div className="card mb-4">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} className="card-img-top" alt={pokemon.name} />
            <div className="card-body">
              <h5 className="card-title">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h5>
              <Link to={`/pokemon/${pokemon.name}`} className="btn btn-primary">View Details</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PokemonList;

