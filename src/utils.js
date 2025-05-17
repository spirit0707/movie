let currentID = 0;
export function generateID() {
  return `movie-${++currentID}`;
}
