import React, { useState } from "react";

function EditProfileModal({ currentUsername, onSave, onClose }) {
    const [formValues, setFormValues] = useState({
        username: currentUsername || "",
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value, // Update the correct field dynamically
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formValues.username.trim()) {
            onSave(formValues); // Pass only username to the onSave function
        } else {
            setErrorMessage("Le nom d'utilisateur ne peut pas être vide.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Modifier le profil</h2>
                {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
                        Nom d'utilisateur:
                    </label>
                    <input
                        id="username"
                        name="username" // Make sure the name attribute is set
                        type="text"
                        value={formValues.username}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    />
                    <div className="flex justify-end gap-2">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded-md"
                        >
                            Annuler
                        </button>
                        <button 
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfileModal;
