import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../assets/css/register.css';

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  // State variables for form values and errors
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    plainPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const [formErrors, setFormErrors] = useState({
    username: '',
    email: '',
    plainPassword: ''
  });

  const redirectRegister = () => {
    navigate("/login");
  };

  const BackHome = () => {
    navigate("/");
  };



  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!formValues.username) {
      errors.username = 'Username is required';
      isValid = false;
    }

    if (!formValues.email || !/^\S+@\S+\.\S+$/.test(formValues.email)) {
      errors.email = 'Valid email is required';
      isValid = false;
    }

    if (!formValues.plainPassword || formValues.plainPassword.length < 3) {
      errors.plainPassword = 'Password must be at least 8 characters long';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true); // Afficher le loader
      console.log(formValues);
      
      try {
        const response = fetch(`${import.meta.env.VITE_API_BASE_URL
}/api/users`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/ld+json',
          },
          body: JSON.stringify(formValues),
        });

        if (response.ok) {
          navigate("/");
        } else {
          const errorBody = await response.json(); // Parse l'erreur retournée par l'API
          console.log(formValues);
          setErrorMessage('Une erreur est survenue ', errorBody.message);
          // Handle errors (e.g., display error message)
        }
      } catch (error) {
        setErrorMessage('Erreur lors de la création', error);
      } finally {
        setLoading(false); // Masquer le loader
      }
    }
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <div className="flex-center flex-column bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="mt-20 mb-60 pt-5 pb-3 form-zone">

        <h1 className="title"> Créer un compte </h1>
        
        <form  className='flex items-center justify-center flex-col' onSubmit={handleSubmit}>
          <input
            className="field"
            type="text"
            name="username"
            id="username"
            placeholder="Pseudo"
            value={formValues.username}
            onChange={handleInputChange}
          />
          {formErrors.username && (
            <span className="error">{formErrors.username}</span>
          )}


          <input
            className="field"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleInputChange}
          />
          {formErrors.email && (
            <span className="error">{formErrors.email}</span>
          )}

          <input
            className="field"
            type="password"
            name="plainPassword"
            id="plainPassword"
            placeholder="Mot de passe"
            value={formValues.plainPassword}
            onChange={handleInputChange}
          />
          {formErrors.plainPassword && (
            <span className="error">{formErrors.plainPassword}</span>
          )}
          <br />
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}

          <button className="btn-submit bg-blue-500 hover:bg-blue-700 mb-3" type="submit">
            S'inscrire
          </button>
          <ul className="flex gap-1 flex-col flex-center">
            <li
              className="flex-center cursor-pointer hover:text-gray-300"
              onClick={redirectRegister}
            >
            Se connecter</li>
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
      </div>
    </div>
  );
}

export default Register;
