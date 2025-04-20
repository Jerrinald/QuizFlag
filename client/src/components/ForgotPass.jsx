import React, { useState } from "react";

function ForgotPass() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // Track success state

  const [formValues, setFormValues] = useState({
    email: "",
  });

  const [formErrors, setFormErrors] = useState({
      email: '',
    });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!formValues.email || !/^\S+@\S+\.\S+$/.test(formValues.email)) {
      errors.email = 'Un email valide est requis';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setMessage("");
    setError("");

    if (validateForm()) {
      setLoading(true);

      try {
        const response = await fetch("http://localhost/api/forgot-pass", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Une erreur s'est produite.");
        }

        setMessage("Si un compte est associé à cet email, vous recevrez un lien de réinitialisation.");
        setSuccess(true); // Hide form on success
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 text-white">
      <div className="bg-white text-gray-900 shadow-lg mt-28 mb-60 rounded-2xl p-10 max-w-lg w-full">
        <h1 className="text-2xl font-semibold text-center mb-4">Mot de passe oublié</h1>

        {/* Show form only if success is false */}
        {!success ? (
          <>
            <p className="text-center text-gray-600 mb-4">
              Entrez votre email pour recevoir un lien de réinitialisation.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <input
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                type="email"
                name="email"
                placeholder="Entrez votre email"
                value={formValues.email}
                onChange={handleInputChange}
                required
              />
              {formErrors.email && (
                <span className="error text-red-500 mb-2">{formErrors.email}</span>
              )}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
                type="submit"
                disabled={loading}
              >
                {loading ? "Envoi en cours..." : "Envoyer"}
              </button>
            </form>
          </>
        ) : (
          // Show success message when form is hidden
          <p className="mt-4 text-center text-green-500">{message}</p>
        )}

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>
    </main>
  );
}

export default ForgotPass;
