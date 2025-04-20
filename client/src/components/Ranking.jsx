import React, { useEffect, useState } from "react";

function Ranking() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("jwtToken"); // ✅ Ensure token is retrieved

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://10.50.0.101:8080/api/usersRank", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des utilisateurs");
      }

      const data = await response.json();
      if (data["member"]) {
        setUsers(data["member"]);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Les meilleurs scores</h1>

      {loading ? (
        <div className="flex justify-center my-20">
          <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden mb-48">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4 border">Classement</th>
              <th className="py-2 px-4 border">Nom d'utilisateur</th>
              <th className="py-2 px-4 border">Score</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.username} className="border-b text-center">
                <td className="py-2 px-4 font-bold">#{index + 1}</td>
                <td className="py-2 px-4">{user.username}</td>
                <td className="py-2 px-4">{user.bestScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default Ranking;
