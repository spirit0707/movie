import { render } from '../framework/render.js';
import MovieItemView from '../view/movie-item-view.js';
import MovieListView from '../view/movie-list-view.js';
import MovieFormView from '../view/movie-form-view.js';
import EditMovieFormView from '../view/edit-movie-form-view.js';
import MovieFilterView from '../view/movie-filter-view.js';

export default class MoviePresenter {
  #container = null;
  #model = null;
  #listView = new MovieListView();
  #form = null;
  #editForm = null;
  #currentFilter = 'all';
  #editingMovieId = null; 

  constructor({ container, model }) {
    this.#container = container;
    this.#model = model;
    this.#model.addObserver(this.#renderMovies.bind(this));
  }

  init() {
    this.#renderForm();
    this.#renderFilter();
    render(this.#listView, this.#container);
    this.#renderMovies();
  }

  #renderForm() {
    const formContainer = this.#container.querySelector('.movie-form');
    formContainer.innerHTML = '';
    this.#form = new MovieFormView({ 
      onSubmit: this.#handleFormSubmit.bind(this)
    });
    formContainer.append(this.#form.element);
  }

  #handleFormSubmit(title, watched) {
    this.#model.addMovie(title, watched);
    this.#renderForm();
  }

  #handleEditFormSubmit(updatedMovie) {
    this.#model.updateMovie(updatedMovie.id, { title: updatedMovie.title, isWatched: updatedMovie.isWatched });
    this.#editingMovieId = null; 
    this.#renderMovies();
  }

  #handleEditMovie(movie) {
    this.#editingMovieId = movie.id; 
    this.#renderMovies();
  }

  #handleDeleteMovie(id) {
    this.#model.deleteMovie(id);
  }

  #handleToggleWatched(id, isWatched) {
    this.#model.updateMovie(id, { isWatched });
  }

  #renderFilter() {
  const filterContainer = document.querySelector('.movie-filter');
  filterContainer.innerHTML = '';
  const filterView = new MovieFilterView({
    currentFilter: this.#currentFilter,
    onFilterChange: (filter) => {
      this.#currentFilter = filter;
      this.#renderMovies();
      this.#renderFilter(); 
    }
  });
  filterContainer.append(filterView.element);
}

  #renderMovies() {
    const movieListEl = this.#listView.element;
    movieListEl.innerHTML = '';

    let movies = this.#model.getMovies();
    if (this.#currentFilter === 'watched') {
      movies = movies.filter((m) => m.isWatched);
    } else if (this.#currentFilter === 'unwatched') {
      movies = movies.filter((m) => !m.isWatched);
    }

    movies.forEach((movie) => {
      let item;
      if (this.#editingMovieId === movie.id) {
        item = new EditMovieFormView({
          movie,
          onSubmit: this.#handleEditFormSubmit.bind(this)
        });
      } else {
        item = new MovieItemView({
          movie,
          onDelete: this.#handleDeleteMovie.bind(this),
          onEdit: this.#handleEditMovie.bind(this),
          onToggleWatched: this.#handleToggleWatched.bind(this),
        });
      }
      render(item, movieListEl);
    });
  }
}