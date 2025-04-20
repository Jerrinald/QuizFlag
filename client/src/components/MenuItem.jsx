import React from "react";
import { useNavigate } from "react-router-dom";

function MenuItem({ name, link, onClick }) {
const navigate = useNavigate();

const handleClick = () => {
    if (onClick) {
    onClick(); // Call the function (for logout)
    } else {
    navigate(link); // Navigate to the given link
    }
};

return (
    <li 
    className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
    onClick={handleClick}
    >
    {name}
    </li>
);
}

export default MenuItem;
