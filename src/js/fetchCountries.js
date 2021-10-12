const URL = 'https://restcountries.com/v2/name/';

export default class {
  constructor() {}
  goFetch(name) {
    return fetch(URL + name)
      .then(r => r.json())
      .catch(alert);
  }
}
