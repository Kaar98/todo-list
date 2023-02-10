import React, { useEffect, useState } from "react";
const getLocalData=()=>{
  const lists=localStorage.getItem("items");
  if(lists){
    return JSON.parse(lists);
  }else{
    return [];
  }
}
const App = () => {
  const [inputData, setInputData] = useState("");
  const [flag, setFlag] = useState(false);
  const [idStore, setIdstore] = useState("");
  const [arrayOfInputs, setArrayOfInputs] = useState(getLocalData());
  
  const handleInput = (e) => {
    setInputData(e.target.value);
  };
  const storeItems = () => {
    if (!inputData) {
      alert("Please input the data");
    } else if (flag) {
      const nr = arrayOfInputs.map((ce) => {
        if (ce.id === idStore) {
          ce.data = inputData;
          return ce;
        } else {
          return ce;
        }
      });
      setInputData("");
      setFlag(false);
      setArrayOfInputs(nr);
    } else {
      const newItem = {
        data: inputData,
        id: new Date().getTime().toString(),
      };
      setArrayOfInputs([...arrayOfInputs, newItem]);
      setInputData("");
    }
  };
  const handleEdit = (id) => {
    const record = arrayOfInputs.find((e) => {
      return e.id === id;
    });
    setIdstore(id);
    setInputData(record.data);
    setFlag(true);
  };
  const handleDelete = (id) => {
    const newRecords = arrayOfInputs.filter((e) => {
      return e.id !== id;
    });
    setArrayOfInputs(newRecords);
  };
  const img = {
    width: "5%",
    margin: "auto",
    padding: "auto",
  };
  const con = {
    paddingTop: "30px",
    paddingBottom: "30px",
  };
  const pointer = {
    cursor: "pointer",
  };
  const height = {
    height: "40px",
    cursor: "pointer",
  };
  useEffect(()=>{
    localStorage.setItem("items",JSON.stringify(arrayOfInputs));
  },[arrayOfInputs]);
  return (
    <>
      <div
        className="container bg-dark rounded text-center text-white"
        style={con}
      >
        <img
          src="/images/to-do-7214069__340.webp"
          className="img-thumbnail d-block"
          style={img}
          alt="todoimage"
        />
        <h6 className="cover-heading d-block mt-2">
          Add Your List Here{" "}
          <span className="glyphicon glyphicon-search" aria-hidden="true">
            <i className="fa-solid fa-hand-peace"></i>
          </span>
        </h6>
        <div className="input-group mb-3 w-50 m-auto mt-3">
          <span className="input-group-text">
            <i className="fa-solid fa-pen-nib"></i>
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Amount (to the nearest dollar)"
            placeholder="Add Task..."
            value={inputData}
            onChange={handleInput}
          />
          <span
            className="input-group-text "
            style={pointer}
            onClick={storeItems}
          >
            <i className="fa-regular fa-plus"></i>
          </span>
        </div>
        <div>
          {arrayOfInputs.map((currEle) => {
            return (
              <div className="input-group mx-auto mt-3 w-50" key={currEle.id}>
                <p className="form-control " style={height}>
                  <em>{currEle.data}</em>
                </p>
                <span className="input-group-text" style={height}>
                  <i
                    class="fa-solid fa-pen"
                    onClick={() => {
                      handleEdit(currEle.id);
                    }}
                  ></i>
                </span>
                <span className="input-group-text" style={height}>
                  <i
                    class="fa-solid fa-trash"
                    onClick={() => {
                      handleDelete(currEle.id);
                    }}
                  ></i>
                </span>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary d-block m-auto"
        >
          CHECK LIST
        </button>
      </div>
    </>
  );
};

export default App;
