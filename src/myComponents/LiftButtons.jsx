
import React, {memo} from 'react';

function LiftButtons({ handleButtonRequest, floorsCount }) {
  
  return (
    <>
      {
        
        floorsCount.map(floor => (

        <span                   // liftBtn : number icon
          key={floor}
          className="material-symbols-outlined"
          // data-floor={floor}
          onClick={() => handleButtonRequest(floor)}
        >
          {`counter_${floor}`}
        </span>
      ))
      
      }
    </>
  );
}

export default memo(LiftButtons);
