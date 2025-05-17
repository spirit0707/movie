import { AbstractComponent } from '../framework/abstract-component.js';

export default class MovieListView extends AbstractComponent {
  get template() {
    return `<div class="card-container" id="movie-list"></div>`;
  }
}
