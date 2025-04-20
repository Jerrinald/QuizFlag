import React from 'react';
import { useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  // Utilisez useState pour suivre les valeurs des champs d'entrée
  const [valueIdentifier, setValueIdentifier] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUsername, setRole } = useAuth();



  // Gérez les modifications des champs d'entrée
  const inputIdentifier = (e) => {
    setValueIdentifier(e.target.value);
  };

  const redirectRegister = () => {
    navigate("/register");
  };

  const inputPassword = (e) => {
    setValuePassword(e.target.value);
    setPasswordError(""); // Réinitialiser l'erreur lors de la modification
  };

  const BackHome = () => {
    navigate("/");
  };

  // Gérez la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Afficher le loader
    try {
      const response = await fetch("http://10.50.0.101:8080/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": 'application/ld+json',
        },
        body: JSON.stringify({
          identifier: valueIdentifier,
          password: valuePassword,
        }),
      });

      if (response.ok) {

        const { token } = await response.json();
        
        const decodedToken = decodeToken(token);

        if (decodedToken) {
          localStorage.setItem("username", decodedToken.username);
          localStorage.setItem("email", decodedToken.email);
          localStorage.setItem("bestScore", decodedToken.bestScore);
          localStorage.setItem('jwtToken', token);
          localStorage.setItem('id', decodedToken.id);
          setUsername(decodedToken.username); // Update the context -> refresh Header
          setRole(decodedToken.roles || []);
          navigate("/");
        }
      } else {
        setErrorMessage('Échec de la connexion. Identifiant incorrect'); // Utiliser le message d'erreur de l'API
      }
    } catch (error) {
      setErrorMessage(error || 'Une erreur est survenue.'); // Utiliser le message d'erreur de l'API
    } finally {
      setLoading(false); // Masquer le loader
    }
  };

  return (
      <div className="flex-center flex-column bg-gradient-to-r from-blue-400 to-purple-500">
        <section className="mt-20 mb-60 pt-5 pb-3 form-zone">
        <h1 className="title"> Connexion </h1>

        <form className='flex items-center justify-center flex-col' onSubmit={handleSubmit}>
          <input
            className="field mt-2 border-2"
            type="idenrifier"
            name="identifier"
            id="identifier"
            placeholder="Email ou pseudo"
            value={valueIdentifier}
            onChange={inputIdentifier}
          />
          <input
            className="field mt-2 border-2"
            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe"
            value={valuePassword}
            onChange={inputPassword}
          />
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <br />
          <button className="btn-submit bg-blue-500 hover:bg-blue-700 mb-3" type="submit">
            Se connecter
          </button>
          <Link className='underline' to="/forgot-pass">Mot de passe oublié ?</Link>
          <ul className="flex gap-1 flex-col flex-center mt-4">
            <li
              className="flex-center cursor-pointer hover:text-gray-300"
              onClick={redirectRegister}
            >
            S'inscrire</li>
            <li onClick={BackHome} className='flex flex-row cursor-pointer hover:text-gray-300'>
              <svg
                className="w-5 h-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
              <span>Accueil</span>
            </li>
          </ul>
        </form>
        {loading && (
          <div className="flex justify-center items-center my-4">
            <div className="w-10 h-10 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
            <span className="ml-3 text-blue-400 font-semibold text-2xl">Chargement...</span>
          </div>
        )}

      </section>
    </div>
  );

};

export default Login;