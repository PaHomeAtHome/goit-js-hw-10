import './css/styles.css';
import debounce from "lodash.debounce"

const DEBOUNCE_DELAY = 300;
const SEARCH_NAME_URL = `https://restcountries.com/v3.1/name/`;

const refs = {
    searchBox: document.querySelector(`#search-box`)
}

refs.searchBox.addEventListener(`input`, debounce(onSearchBoxSubmit, 300))

function onSearchBoxSubmit(event) {
    event.preventDefault();
    const name = event.target.value;

    fetchArticles(name);
}

function fetchArticles(name) {
    const url = `${SEARCH_NAME_URL}${name}`
    console.log(url )

    return fetch(url).then(response => response.json())
        .then((country) => {
            country[0].name.official
            country.map(state => console.log(state.name.official))
        })
}