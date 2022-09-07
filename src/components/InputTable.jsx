function InputTable({inputData, handleChange, modelData}) {

  return (
    <form className="form">
      <table>
        <thead>
          <tr>
            <th colSpan="2">MASA Y COMBUSTIBLE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <label htmlFor="p1">¿Cuánto pesas? [kg]</label>
              <input
                id="p1"
                name="p1"
                type="number"
                placeholder="70"
                min="0"
                value={inputData.p1 ? inputData.p1 : ""}
                onChange={handleChange}
              ></input>
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="p2">¿Y tu instructor? [kg]</label>
              <input
                id="p2"
                name="p2"
                type="number"
                placeholder="70"
                min="0"
                value={inputData.p2 ? inputData.p2 : ""}
                onChange={handleChange}
              ></input>
            </td>
          </tr>

          {!!modelData.rpax1 && (
            <tr>
              <td>
                <label htmlFor="rpax1">¿Y los pasajeros? [kg]</label>
                <input
                  id="rpax1"
                  name="rpax1"
                  type="number"
                  placeholder="70"
                  min="0"
                  value={inputData.rpax1 ? inputData.rpax1 : ""}
                  onChange={handleChange}
                ></input>
              </td>
            </tr>
          )}

          {!!modelData.rpax2 && (
            <tr>
              <td>
                <label htmlFor="rpax2">¿Y los pasajeros de atrás? [kg]</label>
                <input
                  id="rpax2"
                  name="rpax2"
                  type="number"
                  placeholder="70"
                  min="0"
                  value={inputData.rpax2 ? inputData.rpax2 : ""}
                  onChange={handleChange}
                ></input>
              </td>
            </tr>
          )}

          <tr>
            <td>
              <label htmlFor="bag1">¿Y el equipaje en area 1? [kg]</label>
              <input
                id="bag1"
                name="bag1"
                type="number"
                placeholder="7"
                min="0"
                value={inputData.bag1 ? inputData.bag1 : ""}
                onChange={handleChange}
              ></input>
            </td>
          </tr>

          {!!modelData.modelo.includes("172") && (
            <tr>
              <td>
                <label htmlFor="bag2">¿Y el equipaje en area 2? [kg]</label>
                <input
                  id="bag2"
                  name="bag2"
                  type="number"
                  placeholder="7"
                  min="0"
                  value={inputData.bag2 ? inputData.bag2 : ""}
                  onChange={handleChange}
                ></input>
              </td>
            </tr>
          )}

          <tr>
            <td>
              <label htmlFor="fob">¿Cuánto combustible llevas? [USG]</label>
              <input
                id="fob"
                name="fob"
                type="number"
                placeholder="30"
                min="0"
                value={inputData.fob ? inputData.fob : ""}
                onChange={handleChange}
              ></input>
            </td>
          </tr>

          {!!modelData.modelo.includes("172") && (
            <tr>
              <td>
                <label htmlFor="tf">¿Cuál es tu Trip Fuel? [USG]</label>
                <input
                  id="tf"
                  name="tf"
                  type="number"
                  placeholder="11"
                  min="0"
                  value={inputData.tf ? inputData.tf : ""}
                  onChange={handleChange}
                ></input>
              </td>
            </tr>
          )}
          {!!modelData.modelo.includes("172") && (
            <tr>
              <td>
                <label htmlFor="DEPElev">
                  ¿Elevación del aeródromo de origen? [ft]
                </label>
                <input
                  id="DEPElev"
                  name="DEPElev"
                  type="number"
                  min="0"
                  placeholder="2269"
                  value={inputData.DEPElev ? inputData.DEPElev : ""}
                  onChange={handleChange}
                ></input>
              </td>
            </tr>
          )}
          {!!modelData.modelo.includes("172") && (
            <tr>
              <td>
                <label htmlFor="ARRElev">¿Y la de destino? [ft]</label>
                <input
                  id="ARRElev"
                  name="ARRElev"
                  type="number"
                  placeholder="2269"
                  value={inputData.ARRElev ? inputData.ARRElev : ""}
                  onChange={handleChange}
                ></input>
              </td>
            </tr>
          )}
          {!!modelData.modelo.includes("172") && (
            <tr>
              <td>
                <label htmlFor="DEPTemp">
                  ¿Temperatura esperada en el aeródromo de origen? [ºC]
                </label>
                <input
                  id="DEPTemp"
                  name="DEPTemp"
                  type="number"
                  placeholder="15"
                  value={inputData.DEPTemp ? inputData.DEPTemp : ""}
                  onChange={handleChange}
                ></input>
              </td>
            </tr>
          )}
          {!!modelData.modelo.includes("172") && (
            <tr>
              <td>
                <label htmlFor="ARRTemp">¿Y en el de destino? [ºC]</label>
                <input
                  id="ARRTemp"
                  name="ARRTemp"
                  type="number"
                  placeholder="15"
                  value={inputData.ARRTemp ? inputData.ARRTemp : ""}
                  onChange={handleChange}
                ></input>
              </td>
            </tr>
          )}
          {!!modelData.modelo.includes("172") && (
            <tr>
              <td>
                <label htmlFor="DEPQNH">
                  ¿QNH en el aeródromo de origen? [hPa]
                </label>
                <input
                  id="DEPQNH"
                  name="DEPQNH"
                  type="number"
                  placeholder="1013"
                  value={inputData.DEPQNH ? inputData.DEPQNH : ""}
                  onChange={handleChange}
                ></input>
              </td>
            </tr>
          )}
          {!!modelData.modelo.includes("172") && (
            <tr>
              <td>
                <label htmlFor="ARRQNH">¿Y en el de destino? [hPa]</label>
                <input
                  id="ARRQNH"
                  name="ARRQNH"
                  type="number"
                  placeholder="1013"
                  value={inputData.ARRQNH ? inputData.ARRQNH : ""}
                  onChange={handleChange}
                ></input>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </form>
  );

};

export default InputTable;