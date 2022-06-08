export default function fetchCountries(name, path) {
    const url = `${path}${name}?fields=name,capital,population,flags,languages`

    return fetch(url).then(response => response.json())
        .then(countries => {return countries})
}