import { movies } from './mock/movies.js';
import MovieModel from './model/movie-model.js';
import MoviePresenter from './presenter/movie-presenter.js';

const appContainer = document.querySelector('.container');
const model = new MovieModel(movies); 

const presenter = new MoviePresenter({ container: appContainer, model });
presenter.init();
