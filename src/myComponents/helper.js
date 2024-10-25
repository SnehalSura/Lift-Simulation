// const liftRequestQueues = new Map();           // Maps lift numbers to their request queues
// const liftProcessingStates = new Map();        // Maps lift numbers to their processing states
// const liftCurrentPositions = new Map();        // Maps lift numbers to their current positions

// const moveLift = async (currentPosition, targetPosition, setLiftPosition) => {
//     const step = currentPosition < targetPosition ? 1 : -1;
//     for (let i = currentPosition; i !== targetPosition; i += step) {
//         setLiftPosition(i);
//         await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate lift movement delay
//     }
//     setLiftPosition(targetPosition); // Ensure the lift reaches the target floor
// };

// export async function handleLiftRequests(liftNum) {
//     const queue = liftRequestQueues.get(liftNum);
//     if (!queue) return;

//     liftProcessingStates.set(liftNum, true);

//     while (queue.length > 0) {
//         const [floorNum, , setLiftPosition] = queue.shift(); // Extract the target floor number and the setLiftPosition function

//         // Get the current position of the lift
//         let currentPosition = liftCurrentPositions.get(liftNum);

//         if (floorNum !== currentPosition) {
//             console.log(`Lift ${liftNum}: Moving ${floorNum > currentPosition ? "Up" : "Down"}`);
//             await moveLift(currentPosition, floorNum, setLiftPosition);
//             liftCurrentPositions.set(liftNum, floorNum); // Update the current position
//         } else {
//             console.log(`Lift ${liftNum} is already at the requested floor: ${floorNum}`);
//         }

//         // Pause for 2 seconds between requests
//         await new Promise(resolve => setTimeout(resolve, 1000));
//     }

//     liftProcessingStates.set(liftNum, false);
// }

// export function addLiftRequest(floorNum, liftPosition, setLiftPosition, liftNum) {
//     if (!liftRequestQueues.has(liftNum)) {
//         liftRequestQueues.set(liftNum, []);
//         liftCurrentPositions.set(liftNum, liftPosition); // Set the initial position
//     }

//     liftRequestQueues.get(liftNum).push([floorNum, liftPosition, setLiftPosition]);
//     console.log(`Added floor request for Lift ${liftNum}:`, floorNum);

//     // Automatically start processing if not already processing
//     if (!liftProcessingStates.get(liftNum)) {
//         handleLiftRequests(liftNum);
//     }
// }

// My First Code:
// export function handleLiftRequest(FloorNum, liftPosition, setLiftPosition){
//     if(FloorNum > liftPosition){
//         console.log("Move Lift Up");
//         for(let i = liftPosition; i < FloorNum; i++){

//             setLiftPosition((prevLiftPos) => (prevLiftPos + 1));

//         }
//     }
//     else if(FloorNum < liftPosition){
//         console.log("Move Lift Down");
//         for(let i = liftPosition; i > FloorNum; i-- ){

//             setLiftPosition((prevLiftPos) => (prevLiftPos - 1));
//         }
//     }
//     else{
//         console.log("Dont Move the lift");
//     }
// }

const liftRequestQueues = {};     // Object to store request queues for each lift
const liftProcessingStates = {};  // Object to store processing states for each lift
const liftCurrentPositions = {};  // Object to store current positions for each lift

const moveLift = async (currentPosition, targetPosition, setLiftPosition) => {
  const step = currentPosition < targetPosition ? 1 : -1;
  for (let i = currentPosition; i !== targetPosition; i += step) {
    setLiftPosition(i);
    await new Promise((resolve) => setTimeout(resolve, 1000));    // Simulate lift movement delay
  }
  setLiftPosition(targetPosition);             // Ensure the lift reaches the target floor
};

export async function handleLiftRequests(liftNum) {
  const queue = liftRequestQueues[liftNum];
  if (!queue) return;

  liftProcessingStates[liftNum] = true;

  while (queue.length > 0) {
    const [floorNum, , setLiftPosition] = queue.shift(); // Extract the target floor number and the setLiftPosition function

    // Get the current position of the lift
    let currentPosition = liftCurrentPositions[liftNum];

    if (floorNum !== currentPosition) {
      console.log(
        `Lift ${liftNum}: Moving ${floorNum > currentPosition ? "Up" : "Down"}`
      );
      await moveLift(currentPosition, floorNum, setLiftPosition);
      liftCurrentPositions[liftNum] = floorNum; // Update the current position
    } else {
      console.log(
        `Lift ${liftNum} is already at the requested floor: ${floorNum}`
      );
    }

    // Pause for 2 seconds between requests
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  liftProcessingStates[liftNum] = false;
}

export function addLiftRequest(
  floorNum,
  liftPosition,
  setLiftPosition,
  liftNum
) {
  if (!liftRequestQueues[liftNum]) {        // becomes True, if there is absense of that particular liftNum in the object
    liftRequestQueues[liftNum] = [];
    liftCurrentPositions[liftNum] = liftPosition; // Set the initial position
  }

  liftRequestQueues[liftNum].push([floorNum, liftPosition, setLiftPosition]);
  console.log(`Added floor request for Lift ${liftNum}:`, floorNum);

  // Automatically start processing if not already processing
  if (!liftProcessingStates[liftNum]) {
    handleLiftRequests(liftNum);
  }

}
