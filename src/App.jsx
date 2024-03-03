import React, { useState, useEffect } from "react";
import desktopImage from "./assets/images/pattern-divider-desktop.svg";
import mobileImage from "./assets/images/pattern-divider-mobile.svg";
import dice from "./assets/images/icon-dice.svg";

const App = () => {
  const [randomNumber, setRandomNumber] = useState(117);
  const [advice, setAdvice] = useState(
    '"It is easy to sit up and take notice,what\'s difficult is getting up and taking action"'
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const imageUrl = windowWidth >= 375 ? desktopImage : mobileImage;
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const fetchAdvice = async () => {
    try {
      const randomNo = Math.floor(Math.random() * 244) + 1;
      setRandomNumber(randomNo);
      const response = await fetch(
        `https://api.adviceslip.com/advice/${randomNo}`
      );
      console.log(response);
      if (response.status === 200) {
        const data = await response.json();
        var adviceText = "";
        adviceText = data.slip ? data.slip.advice : data.message.text;
        setAdvice(`"${adviceText}"`);
        console.log(adviceText);
      } else if (response.status === 404) {
        setAdvice("Something went wrong");
      } else {
        setAdvice("Unidentified error");
      }
    } catch (e) {
      setAdvice("Failed to fetch");
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    fetchAdvice(); // Call fetchAdvice when the anchor button is clicked
  };

  return (
    <>
      <div className="flex flex-col relative gap-9 h-fit rounded-xl pt-[48px] pb-10 px-10 md:px-12 items-center  w-[90%] max-w-[540px] mb-8 bg-darkgrayishblue ">
        <section>
          <h1 className="font-normal  text-center text-neongreen tracking-[5px] text-xs ">
            ADVICE #{randomNumber}
          </h1>
          <p className="text-center text-wrap text-xl md:text-[26px] text-lightcyan font-semibold mt-6 md:leading-10 [word-spacing:2px]">
            {advice}
          </p>
        </section>
        <figure className="pb-9">
          <img src={imageUrl} alt="divider " />
        </figure>
        <a href="#" className="absolute -bottom-8" onClick={handleClick}>
          <div className="bg-neongreen w-16 h-16 rounded-[50%] flex items-center justify-center neoneffect">
            <img src={dice} alt="dice image" />
          </div>
        </a>
      </div>
    </>
  );
};

export default App;
