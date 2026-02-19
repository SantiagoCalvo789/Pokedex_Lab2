import { useEffect, useState } from "react";
import "./App.css";

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

export default function App() {
  const [id, setId] = useState<number>(1);
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => res.json())
      .then((data) => setCharacter(data));
  }, [id]);

  return (
    <main className="app">
      <h2>Rick & Morty Characters</h2>

      <div className="controls">
        <button onClick={() => id > 1 && setId(id - 1)}>⬅ Anterior</button>
        <button onClick={() => setId(id + 1)}>Siguiente ➡</button>
      </div>

      {character && (
        <div className="character-card">
          <h3>
            #{character.id} {character.name}
          </h3>

          <img
            src={character.image}
            alt={character.name}
            width={180}
            style={{ borderRadius: 10 }}
          />

          <p>
            <strong>Status:</strong> {character.status}
          </p>

          <p>
            <strong>Species:</strong> {character.species}
          </p>
        </div>
      )}
    </main>
  );
}
