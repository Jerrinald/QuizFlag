export const flagQuiz = {
  id: 'flag',
  name: 'Quiz Drapeaux',
  description: 'Trouvez le pays à partir du drapeau',
  skipLabel: 'Drapeau suivant',
  title: 'Trouvez le plus de pays possible',
  loadingLabel: 'Chargement des drapeaux...',
  path: '/quiz/flag',

  filterCountry: () => true,

  renderQuestion: (country) => (
    <img
      className="lg:w-3/4 aspect-[4/3] object-contain border-4 border-gray-300 rounded-lg shadow-lg p-4 bg-gray-100"
      src={country.flags?.svg}
      alt="Drapeau du pays à deviner"
    />
  ),
};
