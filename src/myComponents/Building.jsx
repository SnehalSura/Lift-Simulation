import React from "react";
import BuildingFloor from "./BuildingFloor";
import Lift from "./Lift";

function Building({ buildingNum, floorsCount, liftsCount }) {
  const Number_of_floors = Array.from(
    { length: floorsCount },
    (_, i) => floorsCount - i
  );
  const Number_Of_Lifts = Array.from({ length: liftsCount }, (_, i) => i + 1);

  return (
    <>
      <div className="Building">
        <div>
          <h3 className="building-title">Building {buildingNum} </h3>
          { Number_of_floors.map((_, indx) => (
              <BuildingFloor key={indx} />
          ))
          }
        </div>

        <div className="allLifts">
          {Number_Of_Lifts.map((value, indx) => (
            <Lift
              key={indx}
              floorsCount={Number_of_floors}
              liftNum={value}   
            />
          ))}
        </div>
      </div>
      
    </>
  );
}

export default Building;
