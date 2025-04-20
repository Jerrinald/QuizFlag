import React from "react";

function ConfirmModal({ user, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center text-red-600">
          Supprimer l'utilisateur ?
        </h2>
        <p className="text-center mb-4">Êtes-vous sûr de vouloir supprimer <strong>{user.username}</strong> ?</p>
        
        <div className="flex justify-center gap-3">
          <button className="bg-gray-400 px-3 py-1 rounded" onClick={onCancel}>
            Annuler
          </button>
          <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => onConfirm(user.id)}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
