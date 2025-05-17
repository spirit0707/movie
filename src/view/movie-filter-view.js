import { AbstractComponent } from '../framework/abstract-component.js';

export default class MovieFilterView extends AbstractComponent {
  constructor({ currentFilter = 'all', onFilterChange }) {
    super();
    this.currentFilter = currentFilter;
    this.onFilterChange = onFilterChange;

    this.element.querySelectorAll('input[name="status-filter"]').forEach((input) => {
      input.addEventListener('change', (e) => {
        this.onFilterChange(e.target.value);
      });
    });
  }

  get template() {
    return `
    <section class="movie-filter">
      <h2>Фильтры</h2>
      <fieldset>
        <legend>Статус:</legend>
        <label>
          <input type="radio" name="status-filter" value="all" ${this.currentFilter === 'all' ? 'checked' : ''}>
          Все
        </label>
        <label>
          <input type="radio" name="status-filter" value="watched" ${this.currentFilter === 'watched' ? 'checked' : ''}>
          Просмотренные
        </label>
        <label>
          <input type="radio" name="status-filter" value="unwatched" ${this.currentFilter === 'unwatched' ? 'checked' : ''}>
          Непросмотренные
        </label>
      </fieldset>
      <!-- <label><input type="checkbox" id="favorite-filter" /> Показывать только избранное</label> -->
    </section>
    `;
  }
}