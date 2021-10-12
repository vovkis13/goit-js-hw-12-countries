import refs from './refs.js';
import FetchCountries from './fetchCountries';
import markupCountriesList from '../countries.hbs';
import markupCountryCard from '../country.hbs';

import { notice } from '../../node_modules/@pnotify/core/';
import '../../node_modules/@pnotify/core/dist/PNotify.css';
import '../../node_modules/@pnotify/core/dist/BrightTheme.css';
const noticeOptions = {
  title: 'More than 10 matches!',
  text: 'More than 10 countries found',
  delay: 2000,
};

const debounce = require('lodash.debounce');
const { inputRef, resultsRef } = refs;
const fetchCountries = new FetchCountries();

inputRef.addEventListener('input', debounce(onInputText, 500));

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
    console.log('Too much!!!');
    clearResults();
  } else if (countries.length > 1) {
    renderResults(markupCountriesList({ countries }));
  } else if (countries.length === 1) {
    renderResults(markupCountryCard(...countries));
  } else clearResults();
}

function renderResults(markup) {
  resultsRef.innerHTML = markup;
}

function clearResults() {
  resultsRef.innerHTML = '';
}