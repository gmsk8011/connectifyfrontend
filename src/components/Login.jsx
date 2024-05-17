import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const { currUser, token } = await response.json();
      console.log(currUser);
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("name", currUser.name);
        localStorage.setItem("id", currUser._id);
        window.alert("Login Success");
        navigate("/app");
      } else {
        window.alert("Login success");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-5/6 w-5/6 bg-gray-400 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 flex items-center justify-center font-mono text-white flex-col">
      <Link to="/" className="text-4xl mb-2">
        Connectify
      </Link>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-6 justify-center gap-4"
      >
        <div className="flex justify-center text-2xl">Login to chat</div>
        <input
          type="email"
          placeholder="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="p-2 rounded-xl outline-none bg-white bg-opacity-15"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="p-2 rounded-xl outline-none bg-white bg-opacity-15"
        />
        <button
          className="py-2 px-4 w-fit self-center border-2 rounded-full hover:border-cyan-300 hover:text-cyan-400"
          type="submit"
        >
          Log in
        </button>
      </form>
      <Link
        className="py-2 px-4 border-2 rounded-full hover:border-cyan-300 hover:text-cyan-400"
        to="/signup"
      >
        Sign Up
      </Link>
    </div>
  );
};

export default Login;
