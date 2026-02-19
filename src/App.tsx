import { useEffect, useState } from "react";
import "./App.css";

type Pokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: { name: string };
  }[];
};

export default function App() {
  const [id, setId] = useState<number>(1);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, [id]);

  return (
    <div className="app">
      <h2>Pokédex</h2>

      <div className="controls">
        <button onClick={() => id > 1 && setId(id - 1)}>⬅ Anterior</button>
        <button onClick={() => setId(id + 1)}>Siguiente ➡</button>
      </div>

      {pokemon && (
        <div className="pokemon-card">
          <h3>
            #{pokemon.id} {pokemon.name}
          </h3>

          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={150}
          />

          <p>Tipos: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
        </div>
      )}
    </div>
  );
}
