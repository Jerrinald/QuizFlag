import React, { useEffect, useState } from "react";
import EditProfileModal from "./EditProfileModal";

function Profile() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // To store API errors

    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("jwtToken");

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        const storedEmail = localStorage.getItem("email");

        if (storedUsername) setUsername(storedUsername);
        if (storedEmail) setEmail(storedEmail);
    }, []);

    const handleSaveUsername = async (formEdit) => {
        try {
            const response = await fetch(`http://10.50.0.101:8080/api/users/${userId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/merge-patch+json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ username: formEdit.username }),
            });

            if (!response.ok) {
                const errorBody = await response.json();
                setErrorMessage(`Erreur : ${errorBody.message}`);
                return;
            }

            console.log(formEdit);
            

            setUsername(formEdit.username); // Extract username from formEdit object
            localStorage.setItem("username", formEdit.username); // Store only the string
            setIsModalOpen(false);
        } catch (error) {
            setErrorMessage("Une erreur est survenue.");
            console.error(error);
        }
    };

    return (
        <main className="bg-gradient-to-r from-blue-400 to-purple-500 flex flex-col justify-center items-center">
            <div className="mt-32 mb-52 shadow-lg rounded-lg p-6 w-1/3 flex flex-col bg-slate-100">
                <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">
                    Mon Profil
                </h1>
                {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
                <p><strong>Nom d'utilisateur:</strong> {username}</p>
                <p><strong>Email:</strong> {email}</p>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="mt-4 bg-gray-900 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition-transform transform hover:scale-105"
                >
                    Editer mon profil
                </button>
            </div>

            {isModalOpen && (
                <EditProfileModal 
                    currentUsername={username} 
                    onSave={handleSaveUsername} 
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </main>
    );
}

export default Profile;
