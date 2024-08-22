import { FETCH_POKEMON_LIST, FETCH_POKEMON_DETAIL, CATCH_POKEMON, RELEASE_POKEMON, RENAME_POKEMON } from './actions';

const initialState = {
  pokemonList: [],
  selectedPokemon: null,
  myPokemonList: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POKEMON_LIST:
      return { ...state, pokemonList: action.payload };
    case FETCH_POKEMON_DETAIL:
      return { ...state, selectedPokemon: action.payload };
    case CATCH_POKEMON:
      return { ...state, myPokemonList: [...state.myPokemonList, action.payload] };
    case RELEASE_POKEMON:
      return { ...state, myPokemonList: state.myPokemonList.filter(p => p.nickname !== action.payload) };
    case RENAME_POKEMON:
      return {
        ...state,
        myPokemonList: state.myPokemonList.map(p => 
          p.nickname === action.payload.oldName ? { ...p, nickname: action.payload.newName } : p)
      };
    default:
      return state;
  }
};

export default rootReducer;
