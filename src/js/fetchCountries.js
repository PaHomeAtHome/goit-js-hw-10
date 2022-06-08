import { Notify } from "notiflix";
export default function fetchCountries(name, path) {
    const url = `${path}${name}?fields=name,capital,population,flags,languages`

    return fetch(url).then(response =>
        response.json()).then(countries => {
            if (countries.status === 404) {
                Notify.failure("Oops, there is no country with that name")
            }
            return countries;
        })
}