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

  const initialFilters = ['Fantascienza', 'Thriller', 'Romantico', 'Azione']

  const [films, setFilms] = useState(initialFilms);
  const [searchedFilms, setSearchedFilms] = useState(films);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tutti i generi")
  const [newFilm, setNewFilm] = useState({ title: "", genre: "" });
  const [filterList, setFilterList] = useState(initialFilters);

  useEffect(() => {
    setSearchedFilms(
      films.filter(film =>
        film.title.toLowerCase().includes(search.toLowerCase()) &&
        (filter === "Tutti i generi" || film.genre === filter)
      )
    )
  }, [search, films, filter]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewFilm({
      ...newFilm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!filterList.includes(newFilm.genre)) {
      setFilterList([...filterList, newFilm.genre]);
    }
    setFilms([...films, newFilm]);
    setNewFilm({
      title: "",
      genre: ""
    });
  };


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
            <option value="Tutti i generi">Tutti i generi</option>
            {
              filterList.map((filter, i) => (
                <option value={filter} key={i}>{filter}</option>
              ))
            }
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

      <hr />

      <h3>Aggiungi un film</h3>

      <form onSubmit={handleSubmit}>
        <div className='input-group mt-3 row'>
          <div className="col-5">
            <input type="text"
              className='form-control'
              name="title"
              placeholder='Che film vuoi aggiungere?'
              value={newFilm.title}
              required
              onChange={handleChange} />
          </div>

          <div className="col-5">
            <input type="text"
              className='form-control'
              name="genre"
              placeholder='Di che genere è?'
              value={newFilm.genre}
              required
              onChange={handleChange} />
          </div>

          <div className="col-2">
            <button className='btn btn-outline-secondary'> Aggiungi </button>
          </div>

        </div>
      </form>

    </div>
  )
}

export default App
