import { useEffect } from 'react';
import { ReactComponent as LogoSvg } from "./PDFTemplates/logo.svg";

function ModelSelect({data, modelData, setModelData, handleChange}) {

  const modelos = Object.keys(data);

  useEffect(() => {
    if (modelData.modelo && modelData.matricula) {
    setModelData(prevState => ({
      ...prevState,
      bag1: data[modelData.modelo].MBDATA.bag1,
      bag2: data[modelData.modelo].MBDATA.bag2,
      bag3: data[modelData.modelo].MBDATA.bag3,
      bag4: data[modelData.modelo].MBDATA.bag4,
      fob: data[modelData.modelo].MBDATA.fob,
      fpax: data[modelData.modelo].MBDATA.fpax,
      oilna: data[modelData.modelo].MBDATA.oilna,
      rpax1: data[modelData.modelo].MBDATA.rpax1,
      rpax2: data[modelData.modelo].MBDATA.rpax2,
      cg: data[modelData.modelo].MATRICULAS[modelData.matricula].CG,
      tipo: data[modelData.modelo].MATRICULAS[modelData.matricula].TIPO,
      momento: data[modelData.modelo].MATRICULAS[modelData.matricula].MOMENTO,
      peso: data[modelData.modelo].MATRICULAS[modelData.matricula].PESO,
    }));
  };
  }, [modelData.matricula, setModelData, modelData.modelo, data]);

  return (
    <div className="header">
      <div className="logo__container">
        <LogoSvg className="logo" />
      </div>
      <div className='selector'>
      <label htmlFor="modelo">Elije el modelo: </label>
      <select
        id="modelo"
        name="modelo"
        onChange={handleChange}
        value={modelData.modelo}
      >
        <option value="">---</option>
        {modelos.map((val) => (
          <option value={val} key={val}>
            {val}
          </option>
        ))}
      </select>
      {modelData.modelo && (
        <div>
          <label htmlFor="matricula">Elije la matricula: </label>
          <select
            id="matricula"
            name="matricula"
            onChange={handleChange}
            value={modelData.matricula}
          >
            <option value="">---</option>
            {Object.keys(
              data[modelos[modelos.indexOf(modelData.modelo)]]["MATRICULAS"]
            ).map((val) => (
              <option value={val} key={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
      )}
      </div>
    </div>
  );
      
}

export default ModelSelect;
