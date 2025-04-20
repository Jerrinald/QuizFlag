import React from 'react';
import medecinImage from "../assets/medecin.png";
import { useNavigate } from "react-router-dom";

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <h1 className="text-3xl font-bold text-blue-400">FlagQuiz</h1>
          <p className="mt-2 text-gray-400">
            Testes ta culture générale sur les drapeaux
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold">Liens rapides</h2>
          <ul className="mt-2 space-y-2">
            <li><a href="/about" className="hover:text-blue-400">À propos</a></li>
            <li><a href="/services" className="hover:text-blue-400">Services</a></li>
            <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
            <li><a href="/faq" className="hover:text-blue-400">FAQ</a></li>
          </ul>
        </div>

        {/* Social Media & Contact */}
        <div>
          <h2 className="text-lg font-semibold">Suivez-nous</h2>
          <ul className="flex space-x-4 mt-2 mb-2">
            <li><a href="#" className="text-blue-400 hover:text-blue-500"><FaLinkedin size={24} /></a></li>
          </ul>
          <p className="text-gray-400 text-xl">✉️ Email: k.jerrinald@gmail.com</p>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-16 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} FlagQuiz. Tous droits réservés.
      </div>
    </footer>
  );
}

export default Footer;