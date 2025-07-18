const API_URL = 'https://restcountries.com/v3.1/all?fields=name,flags,cca2,cca3';

export const fetchCountries = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error: Received status code ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching countries", error);
    return [];
  }
};
