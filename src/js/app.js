import refs from './refs.js';
import FetchCountries from './fetchCountries';
import markupCountriesList from '../countries.hbs';
import markupCountryCard from '../country.hbs';

const { inputRef, listRef } = refs;

const fetchCountries = new FetchCountries();

inputRef.addEventListener('input', e => {
  if (!e.currentTarget.value.trim()) {
    listRef.innerHTML = '';
    return;
  }
  fetchCountries.goFetch(e.currentTarget.value).then(countries => {
    if (countries.length > 1) {
      listRef.innerHTML = markupCountriesList({ countries });
      return;
    } else if (countries.length === 1) {
      listRef.innerHTML = markupCountryCard(...countries);
    } else listRef.innerHTML = '';
  });
});
