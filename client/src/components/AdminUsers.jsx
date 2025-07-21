import React, { useEffect, useState } from "react";
import EditUserModal from "./EditUserModal";
import ConfirmModal from "./ConfirmModal";

function AdminUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); 
  const [userToDelete, setUserToDelete] = useState(null); 
  const [isCreating, setIsCreating] = useState(false); // Track create mode
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL
}/api/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      console.log(data);
      

      if (data["member"]) {
        setUsers(data["member"]);
      }
    } catch (error) {
      setErrorMessage("Erreur lors de la récupération des utilisateurs");
    } finally {
      setLoading(false);
    }
  };

  const saveUser = async (userId, updatedData) => {
    const newRoles = updatedData.isAdmin ? ["ROLE_ADMIN"] : ["ROLE_USER"];

    try {
      if (userId) {
        // Edit User (PATCH)
        const response = await fetch(`http://10.50.0.101:8080/api/users/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": 'application/merge-patch+json',
            "Authorization": `Bearer ${token}`,
            "accept" : 'application/ld+json'
          },
          body: JSON.stringify({
            username: updatedData.username,
            email: updatedData.email,
            plainPassword: updatedData.plainPassword || "",
            roles: newRoles,
          }),
        });
        
        if (!response.ok) {
          const errorBody = await response.json(); // Parse l'erreur retournée par l'API
          setErrorMessage('Une erreur est survenue ', errorBody.title);
          
          console.log(errorBody);
          console.log(JSON.stringify({
            username: updatedData.username,
            email: updatedData.email,
            plainPassword: updatedData.plainPassword || "",
            roles: newRoles,
          }),);
          
          
        } else {
          setUsers((prevUsers) =>
            prevUsers.map((u) =>
              u.id === userId ? { ...u, ...updatedData, roles: newRoles } : u
            )
          );
        }
        
      } else {
        // Create User (POST)
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL
}/api/create-user`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/ld+json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: updatedData.username,
            email: updatedData.email,
            plainPassword: updatedData.plainPassword,
            roles: newRoles,
          }),
        });

        if (!response.ok) {
          const errorBody = await response.json(); // Parse l'erreur retournée par l'API
          console.log(errorBody);
          
          setErrorMessage('Une erreur est survenue ', errorBody.message);
        } else {
          const newUser = await response.json();
          setUsers([...users, newUser]);
        }
        
      }

      setSelectedUser(null);
      setIsCreating(false);
    } catch (error) {
      console.log(error);
      
      setErrorMessage("Erreur lors de l'opération sur l'utilisateur");
    }
  };

  const deleteUser = async (userId) => {
    try {
      await fetch(`http://10.50.0.101:8080/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Accept": "*/*",  // Ensure the value is a string
          "Authorization": `Bearer ${token}`,
        },
      });

    } catch (error) {
      console.log(error);
      setErrorMessage('Une erreur est survenue ', error);
      
    } finally {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      setUserToDelete(null);
    }
  };

  return (
    <main className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Gestion des utilisateurs</h1>
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded"
        onClick={() => setIsCreating(true)}
      >
        + Nouveau
      </button>

      {loading ? (
        <div className="flex justify-center my-20">
          <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden mt-4 mb-48">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Nom d'utilisateur</th>
              <th className="py-2 px-4 border">Admin</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b text-center">
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.username}</td>
                <td className="py-2 px-4">
                  {user.roles.includes("ROLE_ADMIN") ? "OUI" : "NON"}
                </td>
                <td className="py-2 px-4 flex justify-center gap-2">
                  <button
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    onClick={() => setSelectedUser(user)}
                  >
                    ✏️
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => setUserToDelete(user)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {(selectedUser || isCreating) && (
        <EditUserModal
          user={selectedUser}
          onClose={() => {
            setSelectedUser(null);
            setIsCreating(false);
          }}
          onSave={saveUser}
        />
      )}

      {userToDelete && (
        <ConfirmModal
          user={userToDelete}
          onCancel={() => setUserToDelete(null)}
          onConfirm={deleteUser}
        />
      )}
    </main>
  );
}

export default AdminUser;