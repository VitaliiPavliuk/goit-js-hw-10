import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';

var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const inputField = document.querySelector('input#search-box');

const onInput = event => {
  const country = event.target.value.trim();
  console.log(fetchCountries(country));
};

inputField.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
