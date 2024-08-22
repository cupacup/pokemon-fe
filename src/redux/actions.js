import axios from 'axios';

export const FETCH_POKEMON_LIST = 'FETCH_POKEMON_LIST';
export const FETCH_POKEMON_DETAIL = 'FETCH_POKEMON_DETAIL';
export const CATCH_POKEMON = 'CATCH_POKEMON';
export const RELEASE_POKEMON = 'RELEASE_POKEMON';
export const RENAME_POKEMON = 'RENAME_POKEMON';

export const fetchPokemonList = () => async (dispatch) => {
  const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
  dispatch({ type: FETCH_POKEMON_LIST, payload: res.data.results });
};

export const fetchPokemonDetail = (pokemonName) => async (dispatch) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  dispatch({ type: FETCH_POKEMON_DETAIL, payload: res.data });
};

export const catchPokemon = (pokemon) => async (dispatch) => {
  const res = await axios.get('http://localhost:5000/api/pokemon/catch-probability');
  if (res.data.success) {
    const nickname = prompt('Success! Give your Pokemon a nickname:');
    dispatch({ type: CATCH_POKEMON, payload: { ...pokemon, nickname } });
  } else {
    alert('Failed to catch the Pokemon!');
  }
};

export const releasePokemon = (nickname) => async (dispatch) => {
  const res = await axios.post('http://localhost:5000/api/pokemon/release', { nickname });
  if (res.data.success) {
    dispatch({ type: RELEASE_POKEMON, payload: nickname });
  } else {
    alert(`Failed to release the Pokemon! Returned number: ${res.data.number}`);
  }
};

export const renamePokemon = (oldName, newName) => async (dispatch, getState) => {
  const renameCount = getState().myPokemonList.filter(p => p.nickname === oldName).length;
  const res = await axios.post('http://localhost:5000/api/pokemon/rename', { nickname: newName, renameCount });
  dispatch({ type: RENAME_POKEMON, payload: { oldName, newName: res.data.newName } });
};
