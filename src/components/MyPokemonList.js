import React from 'react';
import { usePokemonContext } from '../App';

function MyPokemonList() {
  const { caughtPokemons, releasePokemon, renamePokemon } = usePokemonContext();

  return (
    <div className="row">
      {caughtPokemons.map(pokemon => (
        <div key={pokemon.name} className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">{pokemon.nickname || pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h5>
              <button onClick={() => releasePokemon(pokemon.name)} className="btn btn-danger mr-2">Release</button>
              <button onClick={() => renamePokemon(pokemon.name, pokemon.nickname || pokemon.name)} className="btn btn-warning">Rename</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyPokemonList;
