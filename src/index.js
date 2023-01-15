import './css/styles.css';
import _ from 'lodash';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const searchField = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const details = document.querySelector('.country-info');
const body = document.querySelector('body');
const DEBOUNCE_DELAY = 300;

const searchCountry = _.debounce(() => {
  list.innerHTML = '';
  details.innerHTML = '';
  let name = searchField.value;

  fetchCountries(name)
    .then(res => {
      countryCreator(res);
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}, DEBOUNCE_DELAY);

const countryCreator = res => {
  if (res.length === 1) {
    res.map(country => {
      let countryName = country.name.official;
      let countryFlag = country.flags.png;
      let languages = Object.values(country.languages).join(', ');

      let newCountry = `<li><img src="${countryFlag}" width="48"> ${countryName}</li>`;
      let info = `<p><span>Capital:</span> ${country.capital}</p>
        <p><span>Population:</span> ${country.population}</p>
        <p><span>Languages:</span> ${languages}</p>`;
      list.innerHTML = newCountry;
      details.innerHTML = info;
    });
  } else if (res.length < 10) {
    const crx = res
      .map(country => {
        let countryName = country.name.official;
        let countryFlag = country.flags.png;

        let newCountry = `<li><img src="${countryFlag}" width="48"> ${countryName}</li>`;
        return newCountry;
      })
      .join('');
    list.innerHTML = crx;
  } else {
    Notiflix.Notify.failure(
      'Too many matches found. Please enter a more specific name.'
    );
  }
};

searchField.addEventListener('input', searchCountry);
