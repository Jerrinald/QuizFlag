import arrayShuffle from 'array-shuffle';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchCountries } from '../api/countryApi';
import CardQuizz from '../components/CardQuizz';
import { playSound } from '../../../utils/sounds';
import CounterStart from '../components/CounterStart';
import Timer from '../components/Timer';

function QuizzContainer() {
    const navigate = useNavigate();
    const [timer, setTimer] = useState(120);
    const [countries, setCountries] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quizOver, setQuizOver] = useState(false);
    const [quizStart, setQuizStart] = useState(true);
    const [score, setScore] = useState(0);
    const [newBestScore, setNewBestScore] = useState(false);
    const [loginMessage, setLoginMessage] = useState(false);


    const sectionRef = useRef(null);

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

    const handleTimeUp = () => {
        setQuizOver(true);
        playSound('finish');
        const bestScore = parseInt(localStorage.getItem("bestScore") || "0", 10);
        setNewBestScore(score > bestScore);
    };

    const getCountries = async () => {
        try {
            const data = await fetchCountries();
            if (data.length > 0) {
                setCountries(arrayShuffle(data));
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

    const currentCountry = countries[currentIndex] || null;

    return (
        <main ref={sectionRef} className="p-5 sm:p-0 flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-white">
            {quizStart ? (
                <section className="mb-40 p-8 text-center w-full max-w-2xl">
                    <CounterStart onFinish={() => setQuizStart(false)} />
                </section>
            ) : (
                <section className="mt-8 mb-40 p-8 bg-white shadow-lg rounded-2xl text-gray-900 text-center w-full max-w-4xl">
                    {quizOver ? (
                        <>
                            {newBestScore ? (
                                <h1 className="text-3xl font-bold mb-4">Nouveau meilleur score : {score}</h1>
                            ) : (
                                <h1 className="text-3xl font-bold mb-4">Score final: {score}</h1>
                            )}

                            <button
                                className="text-2xl bg-green-500 rounded-lg py-4 px-8 hover:bg-green-600 transition-transform transform hover:scale-105 font-semibold shadow-md mt-4"
                                onClick={redirecHome}>
                                Retour a l'accueil
                            </button>
                        </>
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold mb-4">Trouvez le plus de pays possible</h1>
                            <div className='flex flex-col sm:flex-row items-center justify-center sm:gap-4'>
                                <Timer initialTime={90} onTimeUp={handleTimeUp} />
                                <span className='text-xl'>Score : {score}</span>
                            </div>

                            {currentCountry ? (
                                <CardQuizz
                                    key={currentCountry.cca3}
                                    svgCountry={currentCountry.flags?.svg}
                                    iso={currentCountry.cca2}
                                    onCorrectAnswer={handleNext}
                                    onIncrementScore={incrementScore}
                                />
                            ) : (
                                <p className="text-lg text-gray-600">Chargement des drapeaux...</p>
                            )}
                        </>
                    )}
                </section>
            )}
        </main>
    );
}

export default QuizzContainer;
