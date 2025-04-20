import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";

function ProfileMenu({username}) {
const { setUsername, setRole } = useAuth();
const navigate = useNavigate();
const [isOpen, setIsOpen] = useState(false);

const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("bestScore");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("id");
    setUsername("");
    setRole([]);
    navigate("/");
};

return (
    <div 
    className="relative w-44"
    onMouseEnter={() => setIsOpen(true)}
    onMouseLeave={() => setIsOpen(false)}
    >
    <button className="w-full text-white text-lg font-semibold px-5 py-2 bg-slate-700 rounded-lg flex items-center justify-center
    hover:scale-105 hover:bg-slate-800">
        {username}
    </button>

    {isOpen && (
        <ul className="absolute right-0 w-48 mt-1 bg-white shadow-lg rounded-lg py-2 z-50">
        <MenuItem name="Mon Profil" link="/my-profile" />
        <MenuItem name="Déconnexion" onClick={handleLogout} />
        </ul>
    )}
    </div>
);
}

export default ProfileMenu;
