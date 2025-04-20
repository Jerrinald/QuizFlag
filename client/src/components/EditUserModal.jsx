import React, { useState } from "react";

function EditUserModal({ user, onClose, onSave }) {
  const isNew = !user;
  const [formValues, setFormValues] = useState({
    username: user?.username || "",
    email: user?.email || "",
    plainPassword: "",
    isAdmin: user?.roles?.includes("ROLE_ADMIN") || false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNew && !formValues.plainPassword) {
      alert("Le mot de passe est obligatoire pour un nouvel utilisateur.");
      return;
    }
    onSave(user?.id, formValues);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <form className="bg-white p-6 rounded-lg shadow-lg w-2/5" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">
          {isNew ? "Créer un utilisateur" : "Modifier l'utilisateur"}
        </h2>

        <input
          className="w-full p-2 border rounded mt-1"
          name="username"
          value={formValues.username}
          onChange={handleInputChange}
          placeholder="Nom d'utilisateur"
        />
        <input
          className="w-full p-2 border rounded mt-1"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <input
          className="w-full p-2 border rounded mt-1"
          type="password"
          name="plainPassword"
          value={formValues.plainPassword}
          onChange={handleInputChange}
          placeholder="Mot de passe"
        />

        <label className="flex items-center mt-2">
          <input
            type="checkbox"
            name="isAdmin"
            checked={formValues.isAdmin}
            onChange={handleInputChange}
            className="mr-2"
          />
          Administrateur
        </label>

        <div className="flex justify-end gap-3 mt-4">
          <button className="bg-gray-400 px-3 py-1 rounded hover:bg-gray-500" type="button" onClick={onClose}>
            Retour
          </button>
          <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" type="submit">
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUserModal;