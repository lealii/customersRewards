import "./styles.css";
import React from "react";
export default function App() {
  const [initialConf, setInitialConf] = React.useState([]);
  let solvedArray = [];
  for (let k = 0; k < 16; k++) {
    solvedArray[k] = k + 1;
  }
  solvedArray[solvedArray.length - 1] = 0;
  const onSolveCallBack = () => {
    if (initialConf.every((value, index) => value === solvedArray[index])) {
      setTimeout(() => {
        alert("Congrats");
      }, 100);
    }
  };
  let randomArray = new Array(16);
  for (let i = 0; i < randomArray.length; i++) {
    let randomNumber = Math.floor(Math.random() * randomArray.length);
    if (randomArray.includes(randomNumber)) {
      i--;
    } else {
      randomArray[i] = randomNumber;
    }
  }
  React.useEffect(() => {
    setInitialConf(randomArray);
  }, []);
  // TEST ARRAY
  // React.useEffect(() => {
  //   setInitialConf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 11, 13, 14, 0, 12]);
  //   onSolveCallBack();
  // }, []);
  const handleClick = (e) => {
    let blank = initialConf.indexOf(0);
    let click = initialConf.indexOf(parseInt(e.target.value, 10));
    if (
      click + 4 === blank ||
      click - 4 === blank ||
      click + 1 === blank ||
      click - 1 === blank
    ) {
      initialConf[blank] = parseInt(e.target.value, 10);
      initialConf[click] = 0;
      setInitialConf([...initialConf]);
      onSolveCallBack();
    }
  };
  return (
    <div className="App">
      <div className="board">
        {initialConf.map((number) => {
          if (number > 0) {
            return (
              <div key={number}>
                <button
                  className="number"
                  value={number}
                  onClick={(e) => handleClick(e)}
                >
                  {number}
                </button>
              </div>
            );
          } else {
            return <div key={number}> </div>;
          }
        })}
      </div>
    </div>
  );
}
