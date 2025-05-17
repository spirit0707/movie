import { AbstractComponent } from '../framework/abstract-component.js';

export default class EditMovieFormView extends AbstractComponent {
  #onSubmit = null;
  #movie = null;

  constructor({ movie, onSubmit }) {
    super();
    this.#movie = movie;
    this.#onSubmit = onSubmit;
    this.element.querySelector('form').addEventListener('submit', this.#handleSubmit.bind(this));
  }

  get template() {
    return `
      <div class="movie-form">
        <h2>Редактировать фильм</h2>
        <form>
          <label for="edit-movie-title">Название фильма:</label>
          <input type="text" id="edit-movie-title" value="${this.#movie.title}" required />
          <div class="watched-toggle">
            <label for="edit-movie-status">Просмотрен:</label>
            <input type="checkbox" id="edit-movie-status" ${this.#movie.isWatched ? 'checked' : ''} />
          </div>
          <button type="submit">Сохранить</button>
        </form>
      </div>
    `;
  }

  #handleSubmit(evt) {
    evt.preventDefault();
    const title = this.element.querySelector('#edit-movie-title').value.trim();
    const isWatched = this.element.querySelector('#edit-movie-status').checked;
    if (title) {
      this.#onSubmit({ ...this.#movie, title, isWatched });
    }
  }
}