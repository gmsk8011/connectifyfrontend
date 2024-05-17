import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-5/6 w-5/6 bg-gray-400 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 flex flex-col items-center justify-center text-white gap-4 font-mono">
      <div className="text-4xl">Welcome to Connectify</div>
      <div className="text-3xl">Login to continue</div>
      <div className="mt-4">
        <Link
          className="py-2 px-4 border-2 m-2 rounded-full hover:border-cyan-300 hover:text-cyan-400"
          to="/login"
        >
          Login
        </Link>
        <Link
          className="py-2 px-4 border-2 m-2 rounded-full hover:border-cyan-300 hover:text-cyan-400"
          to="/signup"
        >
          SignUp
        </Link>
      </div>
    </div>
  );
};

export default Home;
