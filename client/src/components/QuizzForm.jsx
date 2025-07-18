
import React, { useState } from 'react';

export default function QuizzForm({ iso, onAnswerCheck }) {
    const [waiting, setWaiting] = useState(false);
    const [isInput, setIsInput] = useState(false);

    const handleSubmit = async (event, isSkipped) => {
        event.preventDefault();
        if (waiting) return;

        setWaiting(true);
        let name = "";

        console.log(iso);
        
        if (isSkipped === false) {
            setIsInput(true);
            const formData = new FormData(event.target);
            formData.append('iso', iso);
            name = formData.get('name');
            
            
        }

        try {
            const response = await fetch('http://10.50.0.101:8080/api/country-check', {
            method: 'POST',
            body: JSON.stringify({
                iso: iso,
                countryResponse: name
            }),
            headers: {
                'Content-Type': 'application/ld+json'
            }
            });

            const jsonCountry = await response.json();
            console.log(jsonCountry);
            
            onAnswerCheck(jsonCountry.isCorrect, jsonCountry.correctName, isSkipped);
        } catch (error) {
            console.error("Error submitting form", error);
        } finally {
            setWaiting(false);
            setIsInput(false);
        }
    };

    return (
        <div className="flex flex-col items-center w-2/3">
            <form onSubmit={(event) => handleSubmit(event, false)} className="flex flex-row gap-4 items-center w-5/6">
                <input 
                    type="text" 
                    name='name' 
                    className='border-2 border-gray-400 rounded-lg py-2 px-4 text-center text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
                    placeholder="Entrez le nom d'un pays"
                />
                <input
                    type="submit"
                    value={waiting && isInput ? "⏳ Vérification..." : "✔️ Valider"}
                    disabled={waiting}
                    className={`w-1/2 font-bold py-2 px-4 rounded-lg text-white cursor-pointer transition-all duration-300 ${
                        waiting || isInput
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-700"
                    }`}
                    />
            </form>
            <button
                className={`mt-4 font-bold py-2 px-4 rounded-lg transition-transform transform ${
                    waiting
                        ? "bg-gray-500 text-white cursor-not-allowed"
                        : "bg-gray-900 text-white hover:bg-gray-700 hover:scale-105"
                    }`}
                    onClick={(event) => handleSubmit(event, true)}
                    disabled={waiting}
                >
                ⏭️ Drapeau suivant
            </button>
        </div>
    );
}
