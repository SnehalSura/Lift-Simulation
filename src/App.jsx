import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Building from "./myComponents/Building.jsx";
import Button from "./myComponents/Button.jsx";

function App() {
  const buildingCount = 5;
  const floorsCount = 5;
  const liftsCount = 2;

  const Number_Of_Buildings = Array.from(
    { length: buildingCount },
    (_, i) => i + 1
  );
  return (
    <>
      
      {
        Number_Of_Buildings.map((value, indx) => (
        <Building
          key={value}
          buildingNum={value}
          floorsCount={floorsCount}
          liftsCount={liftsCount}
        />
      ))
      
      }

    </>

  );
}

export default App;
