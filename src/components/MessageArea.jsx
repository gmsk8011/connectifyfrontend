import React, { useState, useEffect } from "react";

const Msginput = ({ selected, setselected, setauth }) => {
  const [msg, setmsg] = useState("");
  const [texts, settexts] = useState([]);
  const message = {
    sender: localStorage.getItem("id"),
    receiver: selected._id,
    msg: msg,
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/messages");
      const { messages } = await response.json();
      settexts(messages);
    };
    fetchData();
  }, [msg]);

  const handleChange = (e) => {
    const text = e.target.value;
    setmsg(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      
      const chats = await response.json();
      console.log(chats);
      setmsg("");
    } catch (error) {
      console.error(error);
    }
  };
  const cleartoken = () => {
    localStorage.clear();
    setauth(false);
  };
  return (
    <div className="h-full w-4/6 flex flex-col">
      <div className="w-full h-16 bg-white bg-opacity-20 p-4 flex items-center font-bold justify-between">
        <div>{selected.name}</div>
        <button onClick={() => setselected({})}>Close chat</button>
        <button onClick={cleartoken}>Logout</button>
      </div>
      <div className="h-full w-full bg-transparent flex flex-col-reverse p-4 gap-2 overflow-y-scroll scrollbar-none">
        {texts
          .filter(
            (i) =>
              (i.sender == localStorage.getItem("id") &&
                i.receiver == selected._id) ||
              (i.receiver == localStorage.getItem("id") &&
                i.sender == selected._id)
          )
          .map((i, index) => (
            <div
              key={index}
              className={`bg-white bg-opacity-20 p-2 rounded-2xl w-fit ${
                localStorage.getItem("id") == i.sender ? `self-end` : ``
              }`}
            >
              {i.msg}
            </div>
          ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-full h-16 flex items-center gap-2 p-2">
          <input
            className="w-11/12 bg-transparent h-10 border-2 border-white border-opacity-50 p-2 outline-none rounded-2xl"
            type="text"
            value={msg}
            onChange={handleChange}
          />
          <button className="w-1/12 bg-white bg-opacity-30 rounded-2xl h-10 text-md flex items-center justify-center">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Msginput;
