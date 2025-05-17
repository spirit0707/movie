import { AbstractComponent } from '../framework/abstract-component.js';

export default class MovieFormView extends AbstractComponent {
  #onSubmit = null;
  #editingMovie = null;

  constructor({ onSubmit, editingMovie = null }) {
    super();
    this.#onSubmit = onSubmit;
    this.#editingMovie = editingMovie;
    this.element.querySelector('form').addEventListener('submit', this.#handleSubmit.bind(this));
    if (editingMovie) {
      this.element.querySelector('#movie-title').value = editingMovie.title;
      this.element.querySelector('#movie-status').checked = editingMovie.isWatched;
    }
  }

  get template() {
    return `
      <div class="movie-form">
        <h2>${this.#editingMovie ? 'Редактировать Фильм' : 'Добавить Фильм'}</h2>
        <form>
          <label for="movie-title">Название фильма:</label>
          <input type="text" id="movie-title" placeholder="Например, Начало" required />
          <div class="watched-toggle">
            <label for="movie-status">Отметить как просмотренный:</label>
            <label class="switch">
              <input type="checkbox" id="movie-status">
              <span class="slider"></span>
            </label>
          </div>
          <button type="submit">${this.#editingMovie ? 'Сохранить' : 'Добавить Фильм'}</button>
        </form>
      </div>
    `;
  }

  #handleSubmit(evt) {
    evt.preventDefault();
    const title = this.element.querySelector('#movie-title').value.trim();
    const watched = this.element.querySelector('#movie-status').checked;
    if (title) {
      this.#onSubmit(title, watched, this.#editingMovie?.id);
      evt.target.reset();
    }
  }
}