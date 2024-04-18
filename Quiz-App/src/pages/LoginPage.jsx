// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {
  const { loading, error, dispatch } = useContext(AuthContext)
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  
  const handleLogin = async (e) => {
    e.preventDefault(); //prevents page from refreshing
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        credentials
      );
      console.log(res.data)
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/"); // when succesufully login navigates to create room
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  }
  return (
    <div className="container mx-auto">
      <div className="mt-8 flex flex-col items-center">
        <div className="bg-blue-500 rounded-full p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 14l9-5-9-5-9 5 9 5z"
            />
          </svg>
        </div>
        <h1 className="mt-4 text-2xl p-4">Sign in</h1>
        <div className="max-w-md mx-auto border rounded-xl p-4">
          <input
            type="text"
            name="username"
            id="username"
            className="border rounded-md p-2 w-full"
            placeholder="Username"
            autoComplete="true"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            className="mt-2 border rounded-md p-2 w-full"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white rounded-md py-2"
              onClick={handleLogin}
            >
              Sign In
            </button>

            <button
              type="button"
              className="border border-blue-500 text-blue-500 rounded-md py-2"
              onClick={() => {navigate('/register')}}
            >
              Register Here!
            </button>
            {error && <span>{error.message}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
