import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useQuizStore from '../../../store/quizStore';
import { quizStrategies } from '../strategies';

const durations = [
  { value: 60, label: '1 min' },
  { value: 90, label: '1 min 30' },
  { value: 120, label: '2 min' },
];

function QuizHome() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { duration, setDuration } = useQuizStore();

  const openModal = (strategy) => {
    setSelectedQuiz(strategy);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const startQuiz = () => {
    if (!selectedQuiz) return;
    closeModal();
    navigate(selectedQuiz.path);
  };

  return (
    <main className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 text-white p-5 lg:p-0">
      <div className="bg-white text-gray-900 shadow-lg mt-32 mb-60 rounded-2xl p-10 max-w-lg w-full text-center m-3">
        <h1 className="text-4xl font-extrabold mb-4">GeoCountry Quiz</h1>
        <h2 className="text-lg font-medium mb-6">Choisissez votre mode de jeu</h2>

        <div className="flex flex-col gap-4">
          {quizStrategies.map((strategy) => (
            <div
              key={strategy.id}
              className="flex items-center justify-between rounded-xl border-2 border-gray-200 p-4 hover:border-gray-300 transition-all"
            >
              <div className="text-left">
                <span className="text-lg font-bold text-gray-900">{strategy.name}</span>
                <p className="text-sm text-gray-500">{strategy.description}</p>
              </div>
              <button
                className="ml-4 shrink-0 bg-green-500 rounded-lg py-2 px-5 hover:bg-green-600 transition-transform transform hover:scale-105 font-semibold shadow-md text-white"
                onClick={() => openModal(strategy)}
              >
                Jouer
              </button>
            </div>
          ))}
        </div>
      </div>

      <Transition show={showModal}>
        <Dialog onClose={closeModal} className="relative z-50">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
          </TransitionChild>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="relative bg-white text-gray-900 rounded-2xl p-8 max-w-md text-center">
                <button
                  className="absolute -top-1 right-2 text-gray-600 hover:text-gray-900 text-3xl font-bold"
                  onClick={closeModal}
                  aria-label="Fermer"
                >
                  &times;
                </button>
                <DialogTitle className="text-2xl font-bold mb-4">
                  {selectedQuiz?.name}
                </DialogTitle>
                <p className="text-gray-700 mb-3">
                  {selectedQuiz?.description}.
                  Vous devez deviner le maximum de pays possibles en un temps imparti.
                </p>
                <p className="text-gray-700 font-bold mb-3">
                  Il n'est pas nécessaire de mettre des accents (é, è, ê, ') et des espaces.
                </p>

                <div className="relative mb-6 mt-5">
                  <label className="block text-sm font-bold text-gray-700 mb-1 text-left">
                    Durée du quiz
                  </label>
                  <Listbox
                    value={durations.find((d) => d.value === duration)}
                    onChange={(opt) => setDuration(opt.value)}
                  >
                    <ListboxButton className="w-full flex items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400">
                      {durations.find((d) => d.value === duration)?.label}
                      <span className="ml-2 text-gray-400">▼</span>
                    </ListboxButton>
                    <ListboxOptions className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg focus:outline-none">
                      {durations.map((opt) => (
                        <ListboxOption
                          key={opt.value}
                          value={opt}
                          className={({ focus, selected }) =>
                            `cursor-pointer px-4 py-2 text-sm font-semibold transition-colors ${
                              selected
                                ? 'bg-green-500 text-white'
                                : focus
                                  ? 'bg-gray-100 text-gray-700'
                                  : 'text-gray-700'
                            }`
                          }
                        >
                          {opt.label}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Listbox>
                </div>

                <button
                  className="text-xl bg-green-500 rounded-lg py-4 px-8 hover:bg-green-600 transition-transform transform hover:scale-105 font-semibold shadow-md text-white"
                  onClick={startQuiz}
                >
                  Commencer
                </button>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </main>
  );
}

export default QuizHome;
