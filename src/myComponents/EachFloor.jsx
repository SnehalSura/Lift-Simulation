import React, { memo } from "react";
import LiftButtons from "./LiftButtons";
import "./Styles/EachFloor.css";
import { addLiftRequest } from "./helper";

function EachFloor({
  FloorNum,
  setLiftPosition,
  liftNum,
  myClass,    // tells us whether it is a lift floor or Not
  liftPosition,
  floorsCount,
  liftState
}) {

  const commonRequest = (floorNumRequested) => {
    if (liftState) {
      addLiftRequest(floorNumRequested, liftPosition, setLiftPosition, liftNum);
    }
  }
  const checkFloorRequest = (event) => {
    if (event.target.classList[2]) {
      // means checking for up-button Or down-button above
      commonRequest(FloorNum);
    }
  };

  const handleButtonRequest = (floor_req) => {
    commonRequest(floor_req);
  };

  const textStyle = {
    color: "lightgreen",
    fontSize: "1.1rem",
    fontWeight: "bold",
    paddingLeft: "0.4rem",
  };

  return (
    <div className={myClass ? "each-floor elevator" : "each-floor"}>
      {!(!liftState && liftPosition === 1 && FloorNum === 1) && (     //means , if the lift is deact. & it's on first floor
        <div className="empty">
          <div className={`lift-buttons ${!myClass && "hidden"}`}>
            <LiftButtons
              handleButtonRequest={handleButtonRequest}
              floorsCount={floorsCount}
            />
          </div>
        </div>
      )}

      <div className={`text ${!myClass && "hidden"}`}>
        {!liftState && liftPosition === 1 ? (
          <span style={textStyle}>
            Lift <br />
            Under maintai- <br />
            nance
          </span>
        ) : (
          <span>
            {FloorNum}
            {liftNum}
          </span>
        )}
      </div>
      
      <div
        className={`black-strip ${(!liftState && liftPosition === 1 && FloorNum === 1) && "modifyWidth"}`}
        data-floor={FloorNum}
        onClick={checkFloorRequest} 
      >
        
        {FloorNum === floorsCount[0] ? (
          <i className="fa-regular fa-circle-xmark"></i>
        ) : (
          <i className="fa-regular fa-circle-up up-button"></i>
        )}

        <span className="span_one">{liftPosition}</span>
        
        {FloorNum === floorsCount[floorsCount.length - 1] ? (
          <i className="fa-regular fa-circle-xmark"></i>
        ) : (
          <i className="fa-regular fa-circle-down down-button"></i>
        )}
      
      </div>
    </div>
  );
}

export default memo(EachFloor);