import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('jwtToken');

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeModalAndStart = () => {
    setShowModal(false);
    navigate("/quiz");
  };

  return (
    <main className='flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 text-white p-5 sm:p-0'>
      <div className="bg-white text-gray-900 shadow-lg mt-32 mb-60 rounded-2xl p-10 max-w-lg w-full text-center m-3">
        <h1 className='text-4xl font-extrabold mb-4'>Quiz sur les drapeaux</h1>
        <h2 className='text-lg font-medium mb-6'>Trouvez le maximum de pays associes aux drapeaux</h2>

        <button
          className='text-xl bg-green-500 rounded-lg py-4 px-8 hover:bg-green-600 transition-transform transform hover:scale-105 font-semibold shadow-md'
          onClick={openModal}>
          Commencer le Quizz
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white text-gray-900 rounded-2xl p-8 max-w-md w-full text-center">
            <button
              className="absolute -top-1 right-2 text-gray-600 hover:text-gray-900 text-3xl font-bold"
              onClick={closeModal}>
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Informations sur le Quiz</h2>
            <p className="text-gray-700 mb-3">
              Ce quiz contient des drapeaux de differents pays.
              Vous devez deviner le maximum de pays possibles en un temps imparti.
            </p>
            <p className="text-gray-700 font-bold mb-3">
              Il n'est pas necessaire de mettre des accents (e, e, e, ') et des espaces.
            </p>
            <button
              className='text-xl bg-green-500 rounded-lg py-4 px-8 hover:bg-green-600 transition-transform transform hover:scale-105 font-semibold shadow-md'
              onClick={closeModalAndStart}>
              Commencer
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
