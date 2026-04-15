import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const initialFilms = [
    { title: 'Inception', genre: 'Fantascienza' },
    { title: 'Il Padrino', genre: 'Thriller' },
    { title: 'Titanic', genre: 'Romantico' },
    { title: 'Batman', genre: 'Azione' },
    { title: 'Interstellar', genre: 'Fantascienza' },
    { title: 'Pulp Fiction', genre: 'Thriller' },
  ]

  const [films, setFilms] = useState(initialFilms);
  const [searchedFilms, setSearchedFilms] = useState(films);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tutti i generi")
  const [newFilm, setNewFilm] = useState("");

  useEffect(() => {
    setSearchedFilms(
      films.filter(film =>
        film.title.toLowerCase().includes(search.toLowerCase()) &&
        (filter === "Tutti i generi" || film.genre === filter)
      )
    )
  }, [search, films, filter]);

  return (
    <div className="container">
      <h1>Films</h1>
      <div className='mb-3 row'>
        <div className="col-6">
          <input type="text"
            className='form-control'
            placeholder='Cerca film'
            value={search}
            onChange={e => setSearch(e.target.value)} />
        </div>

        <div className="col-6">
          <select className="form-select" aria-label="Default select example" onChange={e => setFilter(e.target.value)}>
            <option selected>Tutti i generi</option>
            <option value="Fantascienza">Fantascienza</option>
            <option value="Thriller">Thriller</option>
            <option value="Romantico">Romantico</option>
            <option value="Azione">Azione</option>
          </select>
        </div>

      </div>

      <hr />

      <ul className='list-group'>
        {
          searchedFilms.map((film, i) => (
            <li key={i} className='list-group-item'>
              {film.title} - {film.genre}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default App
