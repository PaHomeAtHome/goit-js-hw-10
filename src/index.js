import './css/styles.css';
import debounce from "lodash.debounce"

const DEBOUNCE_DELAY = 300;
const SEARCH_NAME_URL = `https://restcountries.com/v3.1/name/`;

const refs = {
    searchBox: document.querySelector(`#search-box`),
    countryList: document.querySelector(`.country-list`),
}

const options = {
    headers: {
        fullText: true
    }
}

refs.searchBox.addEventListener(`input`, debounce(onSearchBoxSubmit, DEBOUNCE_DELAY))

function onSearchBoxSubmit(event) {
    event.preventDefault();
    const name = event.target.value.trim();
    console.log(name)

    fetchArticles(name);
}

function fetchArticles(name) {
    const url = `${SEARCH_NAME_URL}${name}?fields=name,capital,population,flags,languages`
    console.log(url )

    return fetch(url, options).then(response => response.json())
        .then(countryMarkup)
}

function countryMarkup(countries) {
    console.log(countries)

    if (countries.length === 1) {
        countries.map(country => {
            const nameEl = country.name.official;
            const flag = country.flags.svg;
            const language = Object.values(country.languages).join(`, `);
            console.log(language)
            const capital = country.capital;
            const population = country.population;

            refs.countryList.insertAdjacentHTML(`beforeend`, 
            `<li>
            <h2 class="country__name"><span class="country__flag"><img src="${flag}" alt="country flag" height = "40"/></span>${nameEl}</h2>
            <p><b>Capital:</b> ${capital}</p>
            <p><b>Population:</b> ${population}</p>
            <p><b>Language:</b> ${language}</p>
           </li>`)
        })
    }
}