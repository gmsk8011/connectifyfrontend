import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      const response = await fetch("https://connectifybackend-82js.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      window.alert(data.message);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="h-5/6 w-5/6 bg-gray-400 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 flex items-center justify-center font-mono flex-col gap-2 text-white">
      <Link to="/" className="text-4xl mb-2">
        Connectify
      </Link>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center gap-4"
      >
        <div className="flex justify-center text-2xl">Sign Up to chat</div>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 rounded-xl outline-none bg-white bg-opacity-15"
        />
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
          type="submit"
          className="py-2 px-4 w-fit self-center border-2 m-2 rounded-full hover:border-cyan-300 hover:text-cyan-400"
        >
          Sign Up
        </button>
      </form>
      <Link
        className="py-2 px-4 border-2 m-2 rounded-full hover:border-cyan-300 hover:text-cyan-400"
        to="/login"
      >
        Log in
      </Link>
    </div>
  );
};

export default Signup;
