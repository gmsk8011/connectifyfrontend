import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MessageArea from "./MessageArea";

const Connectify = () => {
  const [auth, setauth] = useState(false);
  const [friends, setfriends] = useState([]);
  const [selected, setselected] = useState({});

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length !== 0;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setauth(true);
    }
    const fetchData = async () => {
      const response = await fetch("https://connectifybackend-82js.onrender.com/users");
      const { users } = await response.json();
      setfriends(users);
    };
    fetchData();
    const intervalId = setInterval(fetchData, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  console.log({ selected });

  return (
    <>
      {auth ? (
        <div className="h-5/6 w-5/6 bg-gray-400 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 flex font-mono text-white border-2 border-white border-opacity-50">
          <div className="h-full w-2/6 border-r-2 border-white border-opacity-50 overflow-y-scroll scrollbar-thin scrollbar-none">
            {friends
              .filter((i) => i.name !== localStorage.getItem("name"))
              .map((i, index) => (
                <div
                  key={index}
                  className={`${
                    i.name == selected.name
                      ? `bg-white bg-opacity-30 border-b-2 border-white border-opacity-50 h-20 p-4 text-xl font-bold flex items-center`
                      : `border-b-2 border-white border-opacity-50 h-20 p-4 text-xl font-bold flex items-center`
                  }`}
                  onClick={() => setselected(i)}
                >
                  {i.name}
                </div>
              ))}
          </div>
          {isEmptyObject(selected) ? (
            <MessageArea
              selected={selected}
              setselected={setselected}
              setauth={setauth}
            ></MessageArea>
          ) : (
            <div className="flex items-center w-4/6 justify-center text-4xl">
              Click user to chat
            </div>
          )}
        </div>
      ) : (
        <div className="h-5/6 w-5/6 bg-gray-400 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 flex font-mono text-white border-2 border-white border-opacity-50 items-center justify-center flex-col gap-4">
          <Link to="/" className="text-4xl mb-2">
            Connectify
          </Link>
          <div className="text-4xl">Login to access</div>
          <Link
            className="py-2 px-4 border-2 rounded-full hover:border-cyan-300 hover:text-cyan-400"
            to="/login"
          >
            Login
          </Link>
        </div>
      )}
    </>
  );
};

export default Connectify;
