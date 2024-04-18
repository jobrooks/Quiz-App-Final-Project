import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
    isAdmin: undefined,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // eslint-disable-next-line no-unused-vars
    const { username, email, password, confirmPassword } = credentials;

    const updatedCredentials = {
      ...credentials,
      isAdmin: false,
    };

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
    } else {
      try {
        // eslint-disable-next-line no-unused-vars
        const res = await axios.post(
          "http://localhost:8000/api/auth/register",
          updatedCredentials
        );
        //console.log(res.data)
        navigate("/login");
      } catch (error) {
        console.error(error);
      }
    }
  };

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
        <h1 className="mt-4 text-2xl p-4">Create Account</h1>
        <div className="max-w-md mx-auto border rounded-xl p-4">
          <input
            type="text"
            id="username"
            className="border rounded-md p-2 m-2 w-full"
            placeholder="Username"
            autoComplete="true"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            id="email"
            className="border rounded-md p-2 m-2 w-full"
            placeholder="Email"
            autoComplete="true"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            className="border rounded-md p-2 m-2 w-full"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="confirmPassword"
            className="border rounded-md p-2 m-2 w-full"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md py-2"
              onClick={handleClick}
              onChange={handleChange}
            >
              Create Account
            </button>
            <button
              type="submit"
              className="border border-blue-500 text-blue-500 rounded-md py-2"
              onClick={() => {
                navigate("/login");
              }}
            >
              Already have an account?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
