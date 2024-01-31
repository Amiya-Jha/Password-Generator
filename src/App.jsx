import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "`~!@#$%^&*()_+-={}?:;.|[]<>";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const handleCopyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
    setCopied(true);

    // Disable the button for a few seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  useEffect(() => {
    // Add class to body for dark mode
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div
        className={`w-full max-w-md p-6 bg-white rounded-md shadow-md ${
          darkMode ? "dark-mode" : ""
        }`}
      >
        <h1
          className={`text-2xl font-semibold text-center mb-4 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Password Generator
        </h1>
        <div className="flex flex-col mb-6">
          <input
            type="text"
            value={password}
            className={`w-full py-2 px-4 mb-2 text-center ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800"
            } border border-gray-300 rounded-lg`}
            placeholder="Generated Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={handleCopyToClipboard}
            className={`w-full ${
              darkMode
                ? "bg-blue-700 hover:bg-blue-800"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white py-2 rounded-lg transition-opacity ${
              copied ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={copied}
          >
            {copied ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>
        <div className="items-center gap-x-4">
          <div className="flex items-center gap-x-2">
            <label className="text-lg">Length: {length}</label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-x-2">
            <label htmlFor="numberInput" className="text-lg">
              Numbers
            </label>
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
          </div>
          <div className="flex items-center gap-x-2">
            <label htmlFor="characterInput" className="text-lg">
              Characters
            </label>
            <input
              type="checkbox"
              checked={charAllowed}
              id="characterInput"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
          </div>
        </div>
        <div className="flex items-center justify-end mt-4">
          <label className="text-lg mr-2">Dark Mode</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode((prev) => !prev)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
