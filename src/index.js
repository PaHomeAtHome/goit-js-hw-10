import './css/styles.css';
import debounce from "lodash.debounce"
import FetchCountries from './js/fetchCountries.js'
import { Notify } from "notiflix";

const fetchCountries = FetchCountries;

const DEBOUNCE_DELAY = 300;
const SEARCH_NAME_URL = `https://restcountries.com/v3.1/name/`;

const refs = {
    searchBox: document.querySelector(`#search-box`),
    countryList: document.querySelector(`.country-list`),
}

refs.searchBox.addEventListener(`input`, debounce(onSearchBoxInput, DEBOUNCE_DELAY))

function onSearchBoxInput(event) {

    event.preventDefault();
    const name = event.target.value.trim();

    if (name === ``) {
        return;
    }

    fetchCountries(name, SEARCH_NAME_URL).then(countryMarkup)
}

function countryMarkup(countries) {
    refs.countryList.innerHTML = "";

    if (countries.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.")
        return;
    }

       if (countries.length === 1) {
        countries.map(country => {
            const nameEl = country.name.official;
            const flag = country.flags.svg;
            const language = Object.values(country.languages).join(`, `);
            const capital = country.capital;
            const population = country.population;

            refs.countryList.insertAdjacentHTML(`beforeend`, 
            `<li class="${country.name.common}">
            <h2 class="country__name"><span class="country__flag"><img src="${flag}" alt="country flag" height = "40"/></span>${nameEl}</h2>
            <p><b>Capital:</b> ${capital}</p>
            <p><b>Population:</b> ${population}</p>
            <p><b>Language:</b> ${language}</p>
           </li>`)
        })
           return;
    }

    if (countries.length <= 10 && countries.length > 1) {
        countries.map(country => {
            const nameEl = country.name.common;
            const flag = country.flags.svg;

            refs.countryList.insertAdjacentHTML(`beforeend`, 
            `<li>
            <h2 class="country__name--small"><span class="country__flag--small"><img src="${flag}" alt="country flag" height = "20"/></span>${nameEl}</h2>
           </li>`)
        })
        return;
    }
    Notify.failure("Oops, there is no country with that name")
    return;
}
