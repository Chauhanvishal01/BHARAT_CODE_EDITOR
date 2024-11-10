import React, { useState } from "react";
import io from "socket.io-client";
import Editor from "@monaco-editor/react";
const socket = io("http://localhost:4000");
const App = () => {
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const joinRoom = () => {
    if (roomId && userName) {
      socket.emit("join", roomId, userName);
      setJoined(true);
    }
  };

  const copyRoomId = () => {};
  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  if (!joined) {
    return (
      <div>
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-violet-400 via-indigo-400 to-green-400">
          <div className="bg-white p-8 rounded-3xl shadow-2xl text-center w-[400px] max-w-sm">
            <h1 className="mb-6 text-3xl font-semibold text-gray-800">
              Join Code Room
            </h1>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Room Id..."
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              <input
                type="text"
                placeholder="Your Name..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            <button
              onClick={joinRoom}
              className="w-full p-4 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-500 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors duration-300 ease-in-out mt-6"
            >
              Join Room
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-violet-700 via-indigo-800 to-yellow-500">
      <div className="w-1/4 bg-white p-6 shadow-xl rounded-r-lg flex flex-col space-y-6">
        {/* Room Info Section */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-xl font-semibold text-gray-900">
            Code Room: {roomId}
          </h2>
          <button
            onClick={copyRoomId}
            className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 ease-in-out"
          >
            Copy Id
          </button>
        </div>

        {/* Users List Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Users in Room:
          </h3>
          <ul className="space-y-2">
            <li className="text-gray-700">Vishal</li>
            <li className="text-gray-700">Chauhan</li>
          </ul>
        </div>

        {/* Typing Indicator */}
        <p className="text-sm text-gray-600 italic">User typing...</p>

        {/* Language Selector */}
        <div>
          <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
        </div>

        {/* Leave Room Button */}
        <button className="w-full py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300 ease-in-out">
          Leave Room
        </button>
      </div>

      {/* Editor Section */}
      <div className="flex-1 p-6">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full">
          <Editor
            height="100%"
            defaultLanguage={language}
            language={language}
            value={code}
            onChange={handleCodeChange}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
