import { playSound } from '@/utils/sounds';
import { FaCheck, FaForward } from 'react-icons/fa';
import { checkCountry } from '../utils/countryCheck';

export default function QuizForm({ iso, skipLabel, onAnswerCheck, disabled }) {
  const handleSubmit = (event, isSkipped) => {
    event.preventDefault();
    if (disabled) return;

    if (isSkipped) playSound('submit');

    let name = '';
    if (!isSkipped) {
      const formData = new FormData(event.target);
      name = formData.get('name');
    }

    const { isCorrect, correctName } = checkCountry(iso, name);
    onAnswerCheck(isCorrect, correctName, isSkipped);
  };

  return (
    <div className="flex flex-col items-center w-2/3">
      <form onSubmit={(event) => handleSubmit(event, false)} className="flex flex-col lg:flex-row gap-4 items-center w-5/6">
        <label htmlFor="quiz-answer" className="sr-only">Nom du pays</label>
        <input
          id="quiz-answer"
          type="text"
          name="name"
          className="w-full sm:w-3/4 lg:w-auto border-2 border-gray-400 rounded-lg py-2 px-4 text-center text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="Entrez le nom d'un pays"
        />
        <button
          type="submit"
          disabled={disabled}
          className={`w-5/6 sm:w-3/4 lg:w-auto lg-font-bold py-2 px-4 rounded-lg text-white cursor-pointer transition-all duration-300 lg:flex-1 ${
            disabled
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-700'
          }`}
        >
          {disabled ? 'En attente ...' : <><FaCheck className="inline mr-1" /> Valider</>}
        </button>
      </form>
      <button
        className={`mt-4 font-bold py-2 px-4 rounded-lg transition-transform transform ${
          disabled
            ? 'bg-gray-500 text-white cursor-not-allowed'
            : 'bg-gray-900 text-white hover:bg-gray-700 hover:scale-105'
        }`}
        onClick={(event) => handleSubmit(event, true)}
        disabled={disabled}
      >
        <FaForward className="inline mr-1" /> {skipLabel}
      </button>
    </div>
  );
}
