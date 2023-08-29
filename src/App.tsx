import { useEffect, useRef, useState } from "react";

function App() {
  const [language, setLanguage] = useState("ta");
  const [inputTxt, setInputTxt] = useState("");
  const [suggestionTxt, setSuggestionTxt] = useState([]);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      translateWords();
    } else {
      isMounted.current = true;
    }
  }, [inputTxt, language]);

  const translateWords = async () => {
    if (inputTxt != "") {
      const response = await fetch(
        `https://inputtools.google.com/request?text=${inputTxt}&itc=${language}-t-i0-und&num=5&cp=0&cs=0&ie=utf-8&oe=utf-8&app=demopage`
      );

      const resJson = await response.json();

      if (resJson[0] == "SUCCESS") {
        const mydata = resJson[1];
        const mydataWrap = mydata[0];
        const answers_array = mydataWrap[1];
        setSuggestionTxt(answers_array);

        console.log(answers_array);
      }
    }
  };

  return (
    <>
      <div className="bg-blue-600 min-h-screen p-5 sm:p-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            translateWords();
          }}
          className="bg-white max-w-xl m-auto p-5 rounded shadow"
        >
          <h3 className="font-semibold text-xl">Language Typing translator</h3>

          <div className="p-2 bg-orange-100 mt-5 flex items-center justify-between px-4 rounded">
            <label htmlFor="language">Language</label>
            <select
              name="language"
              id="language"
              className="px-3 py-1 rounded capitalize"
              onChange={(e) => setLanguage(e.target.value)}
              value={language}
            >
              <option value="am">AMHARIC</option>
              <option value="ar">ARABIC</option>
              <option value="bn">BENGALI</option>
              <option value="zh">CHINESE</option>
              <option value="el">GREEK</option>
              <option value="gu">GUJARATI</option>
              <option value="hi">HINDI</option>
              <option value="kn">KANNADA</option>
              <option value="ml">MALAYALAM</option>
              <option value="mr">MARATHI</option>
              <option value="ne">NEPALI</option>
              <option value="or">ORIYA</option>
              <option value="fa">PERSIAN</option>
              <option value="pa">PUNJABI</option>
              <option value="ru">RUSSIAN</option>
              <option value="sa">SANSKRIT</option>
              <option value="sr">SERBIAN</option>
              <option value="si">SINHALESE</option>
              <option value="ta" selected>
                TAMIL
              </option>
              <option value="te">TELUGU</option>
              <option value="ti">TIGRINYA</option>
              <option value="ur">URDU</option>
            </select>
          </div>

          <div className="py-2 space-y-4">
            <textarea
              className="px-4 py-2 bg-gray-100 outline-none w-full resize-y"
              placeholder="Hi, unga name ena?"
              rows={6}
              onChange={(e) => setInputTxt(e.target.value)}
              value={inputTxt}
              required
            ></textarea>
            <div className="flex items-end flex-wrap space-x-2 space-y-2 p-2">
              {suggestionTxt.map((suggestion) => (
                <div
                  className={
                    "border py-2 px-4 rounded hover:bg-blue-500 hover:text-white cursor-pointer flex items-center justify-between gap-x-4 " +
                    (language === "ta" ? "font-ta-noto" : "")
                  }
                  key={suggestion}
                  title="Copy this"
                  onClick={() => {
                    navigator.clipboard.writeText(suggestion);
                  }}
                >
                  <span>{suggestion}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    className="text-sm text-gray-300"
                  >
                    <path
                      fill="currentColor"
                      d="M19 21H8V7h11m0-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m-3-4H4a2 2 0 0 0-2 2v14h2V3h12V1Z"
                    />
                  </svg>
                </div>
              ))}
            </div>
          </div>
          <div>
            <button className="px-4 py-1 rounded bg-green-500 text-white uppercase font-semibold w-full">
              Convert
            </button>
            <p className="text-center my-2">
              <a
                href="https://github.com/anburocky3/language-typing-translator"
                className="underline"
                target="_blank"
              >
                Github
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
