// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.setItem('user', 'null');
        navigate('/login')
    }

    const handleCreate = () =>{
        navigate('/create')
    }
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold">My Navbar</div>
        <div className="space-x-4">
          <button
            onClick={() => alert("Home")}
            className="text-white bg-transparent hover:bg-gray-600 py-2 px-4 border border-white rounded"
          >
            Home
          </button>
          <button onClick={handleCreate} className="text-white bg-transparent hover:bg-gray-600 py-2 px-4 border border-white rounded">
            Create
          </button>
          <button onClick={handleLogout} className="text-white bg-transparent hover:bg-gray-600 py-2 px-4 border border-white rounded">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
