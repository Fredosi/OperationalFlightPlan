import InputTable from "./components/InputTable.jsx";
import ModelSelect from "./components/ModelSelect.jsx";
import { React, useState } from "react";
import PDFC172 from "./components/PDFC172.jsx";
import data from "./components/PerformanceData/AircraftData.js";
import PDFP2008JC from "./components/PDFP2008JC.jsx";
import PDFPA28ARROW from "./components/PDFPA28ARROW.jsx";
import PDFDA40 from "./components/PDFDA40.jsx";
import RouteSelect from "./components/RouteSelect.jsx";

function App() {

  const initialState = {
    p1: 0,
    p2: 0,
    bag1: 0,
    bag2: 0,
    bag3: 0,
    bag4: 0,
    fob: 0,
    oilna: 0,
    rpax1: 0,
    rpax2: 0,
    tf: 0,
    DEPElev: 0,
    ARRElev: 0,
    DEPTemp: 0,
    ARRTemp: 0,
    DEPQNH: 0,
    ARRQNH: 0,
  };

  const [modelData, setModelData] = useState({});
  const [inputData, setInputData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "modelo") {
      setModelData((prevState) => ({
        ...prevState,
        matricula: "",
        [name]: value,
      }));
      setInputData(initialState)
    } else if (name === "matricula") {
      setModelData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setInputData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <main>
      <div>
        <ModelSelect
          data={data}
          modelData={modelData}
          setModelData={setModelData}
          handleChange={handleChange}
        />
      </div>
      {modelData.modelo && modelData.matricula && (
        <div>
          <InputTable
            inputData={inputData}
            modelData={modelData}
            handleChange={handleChange}
          />
          {(() => {
            switch (modelData.modelo) {
              case "Cessna 172":
                return <PDFC172 modelData={modelData} inputData={inputData} />;

              case "Tecnam P2008JC":
                return (
                  <PDFP2008JC modelData={modelData} inputData={inputData} />
                );

              case "PA28 Arrow":
                return (
                  <PDFPA28ARROW inputData={inputData} modelData={modelData} />
                );

              case "Diamond 40":
                return <PDFDA40 inputData={inputData} modelData={modelData} />;

              default:
                return;
            }
          })()}
        </div>
      )}
      {/* <RouteSelect/> */}
    </main>
  );
}

export default App;
