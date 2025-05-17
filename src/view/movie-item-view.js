import { AbstractComponent } from '../framework/abstract-component.js';

export default class MovieItemView extends AbstractComponent {
  constructor({ movie, onDelete, onEdit, onToggleWatched }) {
    super();
    this.movie = movie;
    this.onDelete = onDelete;
    this.onEdit = onEdit;
    this.onToggleWatched = onToggleWatched;

    this.element.querySelector('.delete-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      this.onDelete(this.movie.id);
    });

    this.element.querySelector('.edit-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      this.onEdit(this.movie);
    });

    this.element.querySelector('.watched-checkbox').addEventListener('change', (e) => {
      e.stopPropagation();
      this.onToggleWatched(this.movie.id, e.target.checked);
    });

    this.element.addEventListener('click', () => {
      this.element.classList.toggle('expanded');
    });
  }

  get template() {
    return `
      <div class="card ${this.movie.isWatched ? 'watched' : ''}">
        <div class="card-title">${this.movie.title}</div>
        <div class="card-details">
          Просмотрен: 
          <input type="checkbox" class="watched-checkbox" ${this.movie.isWatched ? 'checked' : ''} />
        </div>
        <button class="edit-btn" style="margin-top: 10px;">Редактировать</button>
        <button class="delete-btn" style="margin-top: 10px;">Удалить</button>
      </div>
    `;
  }
}