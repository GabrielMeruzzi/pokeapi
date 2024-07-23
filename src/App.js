import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Box, Container } from '@mui/system';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from "axios";
import './App.css';
import Header from './components/Header';
import PokemonCard from './components/PokemonCard';

function App() {
  const [PokemonList, setPokemonList] = useState([]);
  const [CopyPokemonList, setCopyPokemonList] = useState([]);

  useEffect(() => {
    getPokemons();
  }, [])

  const pokemonSearch = (name) => {
    if (name.trim() === '') {
      setPokemonList(CopyPokemonList);
    } else {
      const searchedPokemon = CopyPokemonList.filter(pokemon =>
        pokemon.name.includes(name.toLowerCase())
      );
      setPokemonList(searchedPokemon);
    }
  }

  const getPokemons = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${CopyPokemonList.length + 50}&offset=0`)
      const results = response.data.results
      const urls = results.map(result => result.url);
      const pokemonDataArray = await Promise.all(urls.map(url => axios.get(url)));
      const pokemonDetails = pokemonDataArray.map(res => res.data);
      setPokemonList(pokemonDetails)
      setCopyPokemonList(pokemonDetails);
    } catch (er) {
      console.error("Error fetch: ", er);
    }

  }

  return (
    <div className="App">
      <Header pokemonSearch={pokemonSearch} />
      <Container maxWidth='false' className='containerPoke'>
        <Grid container spacing={2} width={'100%'}>
          {PokemonList.map((pokemon) => (
            <Grid item xs={3} display={'flex'} justifyContent="center" >
              <PokemonCard name={pokemon.name} img={pokemon.sprites.front_default} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Stack spacing={2} direction="row" className='stackBtn'>
        <Button variant="contained" onClick={getPokemons}>Ver mais</Button>
      </Stack>

    </div>
  );
}

export default App;
