import { generateID } from '../utils.js';
import Observable from '../framework/observable.js';

export default class MovieModel extends Observable {
  #movies = [];

  constructor(initialMovies = []) {
    super();
    this.#movies = [...initialMovies];
  }

  getMovies() {
    return this.#movies;
  }

  getMoviesByStatus(isWatched) {
    return this.#movies.filter((movie) => movie.isWatched === isWatched);
  }

  addMovie(title, isWatched = false) {
    const newMovie = {
      id: generateID(),
      title,
      isWatched,
    };
    this.#movies.push(newMovie);
    this._notifyObservers('add', newMovie);
  }

  updateMovie(id, updatedData) {
    const idx = this.#movies.findIndex((movie) => movie.id === id);
    if (idx !== -1) {
      this.#movies[idx] = { ...this.#movies[idx], ...updatedData };
      this._notifyObservers('update', this.#movies[idx]);
    }
  }

  deleteMovie(id) {
    this.#movies = this.#movies.filter((movie) => movie.id !== id);
    this._notifyObservers('delete', { id });
  }
}