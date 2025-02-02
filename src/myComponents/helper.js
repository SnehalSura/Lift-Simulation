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
    const [floorNum, setLiftPosition] = queue.shift(); // Extract the target floor number and the setLiftPosition function

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

  liftRequestQueues[liftNum].push([floorNum, setLiftPosition]);
  console.log(`Added floor request for Lift ${liftNum}:`, floorNum);

  // Automatically start processing if not already processing
  if (!liftProcessingStates[liftNum]) {
    handleLiftRequests(liftNum);
  }

}
