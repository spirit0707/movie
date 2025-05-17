export default class Observable {

    #observers = new Set;

    addObserver(observer) {
        this.#observers.add(observer);
    }

    removeObserver(observer) {
        this.#observers.delete(observer);
    }

    _notifyObservers(event = null, payload = null) {
        this.#observers.forEach((observer) => observer(event, payload));
      }
}