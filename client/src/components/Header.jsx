import React, { useState, useEffect, useTransition } from "react";
import medecinImage from "../assets/medecin.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfileMenu from "./ProfileMenu";

function Header() {
  const { username, setUsername, role } = useAuth();  
  const navigate = useNavigate();

  console.log(role);
  
  

  return (
    <header className='h-20 w-full bg-slate-500 flex justify-between items-center px-6'>
      <div className="flex items-center justify-center gap-3">
        <h1 className='text-white text-2xl font-bold cursor-pointer hover:text-gray-100' onClick={() => navigate('/')}>FlagQuiz</h1>
        <button 
          className='ml-3 text-white font-semibold hover:text-gray-200 transition-colors duration-300'
          onClick={() => navigate('/ranking')}
        >
          Classement
        </button>
        {role.includes("ROLE_ADMIN") && (
          <button 
          className='text-white font-semibold hover:text-gray-200 transition-colors duration-300'
          onClick={() => navigate('/admin')}
        >
          Panel
        </button>
        )}
      </div>
      

      {username ? (
        <ProfileMenu username={username} />
        ) : (
      <button 
        className='bg-white text-slate-500 font-semibold py-2 px-4 rounded hover:bg-gray-200 transition-colors duration-300'
        onClick={() => navigate('/login')}
      >
        Connexion
      </button>
        )}
    </header>
  );
}

export default Header;