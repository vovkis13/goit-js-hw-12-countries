import refs from './refs.js';
import FetchCountries from './fetchCountries';
import markupCountriesList from '../countries.hbs';
import markupCountryCard from '../country.hbs';

import { notice } from '../../node_modules/@pnotify/core/';
import '../../node_modules/@pnotify/core/dist/PNotify.css';
import '../../node_modules/@pnotify/core/dist/BrightTheme.css';
const noticeOptions = {
  title: 'More than 10 matches!',
  delay: 2000,
};
const debounce = require('lodash.debounce');
const DELAY = 500;
const { inputRef, resultsRef } = refs;
const fetchCountries = new FetchCountries();

inputRef.addEventListener('input', debounce(onInputText, DELAY));

function onInputText(e) {
  e.preventDefault();
  if (!e.target.value.trim()) {
    clearResults();
    return;
  }
  fetchCountries.goFetch(e.target.value).then(handleResults).catch(alert);
}

function handleResults(countries) {
  if (countries.length > 10) {
    notice(noticeOptions);
    clearResults();
  } else if (countries.length > 1) {
    renderResults(markupCountriesList({ countries }));
  } else if (countries.length === 1) {
    renderResults(markupCountryCard(...countries));
  }
}

function renderResults(markup) {
  resultsRef.innerHTML = markup;
}

function clearResults() {
  resultsRef.innerHTML = '';
}