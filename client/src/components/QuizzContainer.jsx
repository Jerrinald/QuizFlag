import React, { useEffect, useRef, useState } from 'react';
import CardQuizz from './CardQuizz';
import arrayShuffle from 'array-shuffle';
import { fetchCountries } from '../CountryApi/countryApi';
import { encryptBestScore } from '../utils/encryption';
import Timer from './Timer';
import { useNavigate } from "react-router-dom";
import CounterStart from './CounterStart';

function QuizzContainer() {
    const navigate = useNavigate();
    const [timer, setTimer] = useState(120);
    const [countries, setCountries] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quizOver, setQuizOver] = useState(false);
    const [quizStart, setQuizStart] = useState(true);
    const [score, setScore] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [newBestScore, setNewBestScore] = useState(false);
    const [loginMessage, setLoginMessage] = useState(false);

    const token = localStorage.getItem('jwtToken');    
    const id = localStorage.getItem('id'); 
    

    const sectionRef = useRef(null); // Create a reference to the quiz section

    // Scroll to the quiz section when quizStart becomes true
    useEffect(() => {
        if (quizStart && sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [quizStart]);


    const redirecHome = () => {
        navigate("/");
    };

    const handleNext = () => {
        if (timer > 0) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % countries.length);
        }
    };

    const incrementScore = () => {
        setScore((current) => current + 1);
    };

    const handleTimeUp = async () => {
        setQuizOver(true);        
        if (localStorage.getItem("email") !== null) {
            let bestScore = localStorage.getItem("bestScore");
            console.log(score);
            
            if (score > bestScore) {
                try {
                    const encryptedScore = await encryptBestScore(score);  // Use the imported function
                    console.log(encryptedScore);
                    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL
}/api/edit-best-score`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": 'application/merge-patch+json',
                            "Authorization": `Bearer ${token}`,
                            "accept" : 'application/ld+json'
                        },
                        body: JSON.stringify({
                            encryptedBestScore: encryptedScore,
                        }),
                    });
            
                    if (response.ok) {
                        localStorage.setItem("bestScore", parseInt(score));
                        setNewBestScore(true);
                    } else {
                        console.log(response);
                        
                        setErrorMessage('Échec lors de l\'update');
                    }
                } catch (error) {
                    console.log(error);
                    setErrorMessage(error || 'Une erreur est survenue.');
                }
            }
        } else {
            setLoginMessage(true); // User is not logged in
        }
    };

    const getCountries = async () => {
        try {
            const data = await fetchCountries();
            if (data.length > 0) {
                setCountries(arrayShuffle(data)); // Shuffle before setting state
            } else {
                console.error("No countries received from API");
            }
        } catch (error) {
            console.error("Error fetching countries:", error);
        }
    };

    useEffect(() => {
        getCountries();
    }, []);

    const currentCountry = countries[currentIndex] || null; // Ensure it's defined

    return (
        <main ref={sectionRef} className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-white">
            { quizStart ? ( 
                <section className="mb-40 p-8 text-center w-full max-w-2xl">
                    <CounterStart onFinish={() => setQuizStart(false)} />
                </section>
            ) : (
                <section className="mt-8 mb-40 p-8 bg-white shadow-lg rounded-2xl text-gray-900 text-center w-full max-w-4xl">
                    {quizOver ? (
                        <>
                            {newBestScore ? (
                                <h1 className="text-3xl font-bold mb-4">🎉 Nouveau meilleur score : {score}</h1>
                            ) : (
                                <h1 className="text-3xl font-bold mb-4">Score final: {score}</h1>
                            )}

                            {loginMessage && (
                                <p className="text-red-500 mt-3 text-xl"  onClick={() => navigate('/ranking')}>
                                    Connectes toi pour sauvegarder ton score  
                                </p>
                            )}

                            <button 
                                className="text-2xl bg-green-500 rounded-lg py-4 px-8 hover:bg-green-600 transition-transform transform hover:scale-105 font-semibold shadow-md mt-4"
                                onClick={redirecHome}>
                                🔄 Retour à l'accueil
                            </button> 
                        </>
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold mb-4">🌍 Trouvez le plus de pays possible</h1>
                            <div className='flex flex-row items-center justify-center gap-4'>
                                <Timer initialTime={90} onTimeUp={handleTimeUp} />
                                <span className='text-xl'>Score : {score}</span>
                            </div>

                            {/* Ensure country data is available before rendering CardQuizz */}
                            {currentCountry ? (
                                <CardQuizz
                                    key={currentCountry.cca3}
                                    svgCountry={currentCountry.flags?.svg}
                                    iso={currentCountry.cca2}
                                    onCorrectAnswer={handleNext}
                                    onIncrementScore={incrementScore}
                                    timer={timer}
                                />
                            ) : (
                                <p className="text-lg text-gray-600">Chargement des drapeaux... ⏳</p>
                            )}
                        </>
                    )}
                </section>
            )}
        </main>
    );
}

export default QuizzContainer;