import React, { useState, memo } from "react";
import EachFloor from "./EachFloor";
import { addLiftRequest } from "./helper";

function Lift({ floorsCount, liftNum }) {
  const [liftPosition, setLiftPosition] = useState(1);       // default position of any lift
  const [liftState, setLiftState] = useState(true);          // whether it is active or not

  // console.log("Lift Position in the Component: ", liftPosition);

  const handle_Toggle_Switch = () => {
    setLiftState(!liftState);              // it triggers the re-rendering of the component once the state value changes
    if(liftState){
      console.log("Lift disabled");
      addLiftRequest(1, liftPosition, setLiftPosition, liftNum);
    }
  };

  return (
    <div>
      <h3 className="LiftNumber">Lift {liftNum}</h3>

      <div className="Lift">
        {floorsCount.map((FloorNum, indx) => (
          //   <Floor key={indx} />   : Main to deal with it later

          <EachFloor      // Eachfloor is responsible for displaying each lift floor   
            key={indx}
            setLiftPosition={setLiftPosition}
            FloorNum= {FloorNum}
            liftNum= {liftNum}
            myClass= {FloorNum === liftPosition ? true : false}
            liftPosition={liftPosition}
            floorsCount={floorsCount}
            liftState = {liftState}
          />

        ))
        }

        <span className="ToggleSwitch" onClick={handle_Toggle_Switch}>
          { 
            liftState ? (
            <i className="fa-solid fa-toggle-on"></i>
          ) : (
            <i className="fa-solid fa-toggle-off"></i>
          )}
        </span>

      </div>
    </div>
  );
}

export default memo(Lift);
