import { fetchCountries } from '../api/countryApi';
import WorldMap from '../components/WorldMap';

export const mapQuiz = {
  id: 'map',
  name: 'Quiz Carte',
  description: 'Trouvez le pays coloré sur la carte du monde',
  skipLabel: 'Pays suivant',
  title: 'Quel est ce pays ?',
  loadingLabel: 'Chargement de la carte...',
  path: '/quiz/map',
  questionClassName: 'w-5/6 lg:w-5/6',

  loadData: async () => {
    const data = await fetchCountries();
    return data.filter((country) => country.ccn3);
  },

  renderQuestion: (country) => (
    <WorldMap highlightedNumericIso={country.ccn3} />
  ),
};
