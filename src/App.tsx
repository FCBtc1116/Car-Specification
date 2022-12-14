import React, { useState, useCallback } from "react";
import "./App.css";
import SpecificationForm from "./Components/SpecificationForm";
import SpecificationList from "./Components/SpecificationList";

function App() {
  const [savedCheckboxList, setSavedCheckboxList] = useState([
    "Air Suspension",
  ]);
  const [specificationData, setSpecificationData] = useState<Array<object>>([
    {
      name: "Sport",
      engine: "V6 3.5 L",
      material: "Leather",
      color: "Red",
      wheel_inchi: "20 inches",
      wheel_type: "BBS",
      checkbox_0: false,
      signature: "Fast and furious",
    },
    {
      name: "Prestige",
      engine: "V7 3.8 M",
      material: "Iron",
      color: "Yellow",
      wheel_inchi: "25 inches",
      wheel_type: "BTS",
      checkbox_0: false,
      signature: "Fast and Safe",
    },
    {
      name: "Standart",
      engine: "V5 3.1 L",
      material: "Coal",
      color: "Green",
      wheel_inchi: "18 inches",
      wheel_type: "TSB",
      checkbox_0: true,
      signature: "Furious and Safe",
    },
  ]);

  const addSecificationData = useCallback(
    (item: object) => {
      setSpecificationData((t) => [...t, item]);
    },
    [specificationData]
  );

  return (
    <div className="App">
      <div className="flex flex-wrap">
        <SpecificationList
          savedCheckboxList={savedCheckboxList}
          specificationData={specificationData}
        />
        <SpecificationForm
          savedCheckboxList={savedCheckboxList}
          specificationData={specificationData}
          setSavedCheckboxList={setSavedCheckboxList}
          addSecificationData={addSecificationData}
        />
      </div>
    </div>
  );
}

export default App;
