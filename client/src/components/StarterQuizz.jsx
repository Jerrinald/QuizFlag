import React, { useEffect, useState } from 'react';
import CardQuizz from './CardQuizz';
import { fetchCountries } from '../CountryApi/countryApi';
import arrayShuffle from 'array-shuffle';
import QuizContainer from './QuizzContainer';
import { Outlet, useNavigate } from "react-router-dom";

function StarterQuizz() {
    const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <button className='text-2xl bg-green-500 rounded py-4 px-6 hover:bg-green-600 cursor-pointer transition-colors duration-300'>Commencer le quizz</button>  
  );
}

export default StarterQuizz;
