export const fetchCountries = name => {
  return fetch(
    `https://restcountries.com/v3.1/name/${name.trim()}?fields=name,capital,population,flags,languages`
  ).then(res => {
    if (!res.ok) {
      throw new Error(response.status);
    } else {
      return res.json();
    }
  });
};
