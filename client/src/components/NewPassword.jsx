import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function NewPassword() {
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);  

    const token = queryParams.get("token");
    const email = queryParams.get("email");

    console.log(email);
    

    const [formValues, setFormValues] = useState({
        token : token,
        email : email,
        plainPassword: '',
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reset-pass`, {
        method: "POST",
        headers: {
          "Content-Type": "application/ld+json",
        },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur s'est produite.");
      } else {
        setMessage("Votre mot de passe a été mis à jour avec succès !");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 text-white">
      <div className="bg-white text-gray-900 shadow-lg mt-28 mb-60 rounded-2xl p-10 max-w-lg w-full">
        <h1 className="text-2xl font-semibold text-center mb-4">
          Réinitialisation du mot de passe
        </h1>
        {!message && (
        <>
          <p className="text-center text-gray-600 mb-4">
            Entrez votre nouveau mot de passe ci-dessous.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              className="border-2 p-2 rounded mb-4"
              type="password"
              name="plainPassword"
              id="plainPassword"
              placeholder="Nouveau mot de passe"
              value={formValues.plainPassword}
              onChange={handleInputChange}
              required
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? "Mise à jour..." : "Mettre à jour"}
            </button>
          </form>
        </>
      )}
        {message && <p className="mt-4 text-center text-blue-500">{message}</p>}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>
    </main>
  );
}

export default NewPassword;
