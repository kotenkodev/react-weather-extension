import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import { fetchOpenWeatherData } from "../api/weather";

const App: React.FC<{}> = () => {
  useEffect(() => {
    fetchOpenWeatherData("Toronto")
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return <div></div>;
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
