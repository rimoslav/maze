import { equalArrays, isMoveInvalid, isMoveBlocked } from "./helpers";
/* 
 * Given current coordinates and random number between 1 and 4 that indicates moving direction, calculates coordinats of next position.
 * @param {Array} currentPosition Current algorithm position in maze.
 * @param {Number} randomNumber A random number between 1 and 4 converted to one of four possible moving directions.
 * @param {Array.<Array>} blockedFields Array of arrays, each of which represents coordinates of blocked field.
 * @param {Number} mazeSize Acutal maze size (for 10x10 maze, mazeSize equals 10).
 * @returns {Array} Coordinates of next field to be visited.
 */
const move = (currentPosition, randomNumber, blockedFields, mazeSize) => {
    let nextPosition = [...currentPosition];
    switch (randomNumber) {
        // UP
        case 1:
            nextPosition[0] = currentPosition[0];
            nextPosition[1] = currentPosition[1] + 1;
            break;
        // DOWN
        case 2:
            nextPosition[0] = currentPosition[0] + 1;
            nextPosition[1] = currentPosition[1];
            break;
        // LEFT
        case 3:
            nextPosition[0] = currentPosition[0];
            nextPosition[1] = currentPosition[1] - 1;
            break;
        // RIGHT
        default:
            nextPosition[0] = currentPosition[0] - 1;
            nextPosition[1] = currentPosition[1];
            break;
    }
    if (isMoveInvalid(nextPosition, mazeSize) || isMoveBlocked(nextPosition, blockedFields)) {
        nextPosition = null;
    }
    return nextPosition;
}
/**
 * 
 * @param {Array} startPosition Coordinates of maze starting position.
 * @param {Array} endPosition Coordinates of maze "finish line" position.
 * @param {Array.<Array>} blockedFields Array of maze blocked fields.
 * @param {Number} mazeSize Actual maze size (for 10x10 maze, mazeSize equals 10).
 * @returns {Array} Coordinates of last field visited by algorightm. If same as "end" coordinates, the maze is solved. Else the algorithm either failed or maze is not solvable (unknown).
 */
export const lasVegas = (startPosition, endPosition, blockedFields, mazeSize, level) => {
    const visitedFields = [];
    const mazeStartedTime = window.performance.now();
    let mazeEndedTime;
    let solved = false;
    let currentPosition = startPosition; // Current position of the algorithm on the race to endPosition is set to startPosition at the beggining of the loop.
    let iteration = 0;
    let randomNumber = Math.floor(Math.random() * 4 + 1);
    const largerSide = Math.max(mazeSize[0], mazeSize[1]);
    while (solved === false && iteration < Math.pow(largerSide, 4)) {
        let nextPosition = move(currentPosition, randomNumber, blockedFields, mazeSize);
        if (!nextPosition) {
            randomNumber = Math.floor(Math.random() * 4 + 1);
        } else if (equalArrays(nextPosition, endPosition)) {
            visitedFields.push(nextPosition);
            currentPosition = [...endPosition];
            mazeEndedTime = window.performance.now();
            solved = true;
        } else if (!equalArrays(nextPosition, currentPosition)) {
            currentPosition = [...nextPosition];
            visitedFields.push(nextPosition);
        }
        iteration += 1;
    }
    if (!mazeEndedTime) mazeEndedTime = mazeStartedTime;
    return [level, 1, (mazeEndedTime - mazeStartedTime).toFixed(4) + "μs", iteration, solved, visitedFields];
}

