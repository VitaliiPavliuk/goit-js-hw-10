import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';

var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const inputField = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const onInput = event => {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';

  const country = event.target.value.trim();

  if (country !== '') {
    fetchCountries(country)
      .then(data => {
        if (data.length > 10) {
          alert('Too many matches found. Please enter a more specific name.');
        }

        if (data.length >= 2 && data.length <= 10) {
          const markup = data
            .map(
              country => `<li>
              <img src="${country.flags.svg}" class="flag"/><b>${country.name.official}</b></li>`
            )
            .join('');
          countryList.innerHTML = markup;
        }

        if (data.length === 1) {
          const languages = Object.values(data[0].languages).join(', ');
          const markup = `<div class="wrapper"><img src="${data[0].flags.svg}" class="flag"/><h1>${data[0].name.official}</h1></div><ul><li><b>Capital:</b>${data[0].capital}</li><li><b>Population:</b>${data[0].population}</li><li><b>Languages:</b>${languages}</li></ul>`;
          countryInfo.innerHTML = markup;
        }
      })
      .catch(err => {
        if (err.message === '404') {
          alert('Oops, there is no country with that name');
        }
      });
  }
};

inputField.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
