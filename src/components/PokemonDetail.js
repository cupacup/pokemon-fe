import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { usePokemonContext } from '../App';
import '../PokemonDetail.css';

function PokemonDetail() {
  const { name } = useParams();
  const { catchPokemon } = usePokemonContext();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => {
        setPokemon(response.data);
      });
  }, [name]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div className="card">
      <img src={pokemon.sprites.front_default} className="card-img-top poke-image" alt={pokemon.name} />
      <div className="card-body">
        <h5 className="card-title">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h5>
        <p className="card-text">Type: {pokemon.types.map(type => type.type.name).join(', ')}</p>
        <p className="card-text">Moves: {pokemon.moves.slice(0, 5).map(move => move.move.name).join(', ')}</p>
        <button onClick={() => catchPokemon(pokemon.name, prompt("Enter a nickname:"))} className="btn btn-success">Catch</button>
      </div>
    </div>
  );
}

export default PokemonDetail;

