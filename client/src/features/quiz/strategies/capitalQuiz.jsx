import { fetchCountries } from '../api/countryApi';

export const capitalQuiz = {
  id: 'capital',
  name: 'Quiz Capitales',
  description: 'Trouvez le pays à partir de sa capitale',
  skipLabel: 'Capitale suivante',
  title: 'Trouvez le pays correspondant à la capitale',
  loadingLabel: 'Chargement des capitales...',
  path: '/quiz/capital',

  filterCountry: (country) => country.capital?.length > 0,

  loadData: async () => {
    const data = await fetchCountries();
    return data.filter((country) => country.capital?.length > 0);
  },

  renderQuestion: (country) => (
    <div className="flex items-center justify-center border-4 border-gray-300 rounded-lg shadow-lg p-8 bg-gray-100 lg:w-3/4">
      <span className="text-3xl sm:text-4xl font-bold text-gray-800">
        {country.capital?.[0]}
      </span>
    </div>
  ),
};
