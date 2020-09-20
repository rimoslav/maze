
import { equalArrays, isMoveInvalid, isMoveBlocked, move, getOccurrence } from "./helpers";

/**
 * 
 * Given current coordinates and random number between 1 and 4 that indicates moving direction, calculates coordinats of next position.
 * @param {Array} currentPosition Current algorithm position in maze.
 * @param {Number} randomNumber A random number between 1 and 4 converted to one of four possible moving directions.
 * @param {Array.<Array>} blockedFields Array of arrays, each of which represents coordinates of blocked field.
 * @param {Number} mazeSize Acutal maze size (for 10x10 maze, mazeSize equals 10).
 * @returns {Array} Coordinates of next field to be visited.
 */

let randomNumber = Math.floor(Math.random() * 4 + 1);
let marks = [];

const mark = (position) => {
    marks.push(position.toString());
}

const chooseNextStep = (currentPosition, blockedFields, mazeSize) => {

    let nextPosition;

    const forward = move(currentPosition, randomNumber % 4);
    let markedForward = getOccurrence(marks, forward.toString());
    if (isMoveInvalid(forward, mazeSize) || isMoveBlocked(forward, blockedFields)) {
        markedForward = 10;
    }

    if (markedForward > 0) {
        const back = move(currentPosition, (randomNumber + 2) % 4);
        let markedBack = getOccurrence(marks, back.toString());
        if (isMoveInvalid(back, mazeSize) || isMoveBlocked(back, blockedFields)) {
            markedBack = 10;
        }
        if (markedBack === 0) {
            randomNumber += 2;
            nextPosition = back;
        } else {

            const left = move(currentPosition, (randomNumber + 3) % 4);
            const right = move(currentPosition, (randomNumber + 1) % 4);

            let markedLeft = getOccurrence(marks, left.toString())
            if (isMoveInvalid(left, mazeSize) || isMoveBlocked(left, blockedFields)) {
                markedLeft = 10;
            }

            let markedRight = getOccurrence(marks, right.toString());
            if (isMoveInvalid(right, mazeSize) || isMoveBlocked(right, blockedFields)) {
                markedRight = 10;
            }

            const min = Math.min(markedForward, markedBack, markedLeft, markedRight);

            if (min === markedForward && min < 10) {
                mark(forward.toString());
                nextPosition = forward;
            } else if (min === markedBack && min < 10) {
                randomNumber += 2;
                mark(back.toString());
                nextPosition = back;
            } else if (min === markedRight && min < 10) {
                randomNumber += 1;
                mark(right.toString());
                nextPosition = right;
            } else if (min === markedLeft && min < 10) {
                randomNumber += 3;
                mark(left.toString());
                nextPosition = left;
            } else {
                nextPosition = null;
            }
        }

    } else {
        nextPosition = forward;
    }
    if (nextPosition)
        mark(currentPosition.toString());
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
export const tremaux = (startPosition, endPosition, blockedFields, mazeSize, level) => {
    marks = [];
    const visitedFields = [];
    const mazeStartedTime = window.performance.now();
    let mazeEndedTime;
    let solved = false;
    let currentPosition = startPosition; // Current position of the algorithm on the race to endPosition is set to startPosition at the beggining of the loop.
    let iteration = 0;
    const largerSide = Math.max(mazeSize[0], mazeSize[1]);
    while (solved === false && iteration < Math.pow(largerSide, 4)) {
        let nextPosition = chooseNextStep(currentPosition, blockedFields, mazeSize);
        if (!nextPosition) {
            iteration = Math.pow(largerSide, 4);
        } else if (equalArrays(nextPosition, endPosition)) {
            visitedFields.push(nextPosition);
            currentPosition = [...endPosition];
            mazeEndedTime = window.performance.now();
            solved = true;
        } else {
            currentPosition = [...nextPosition];
            visitedFields.push(nextPosition);
        }
        iteration += 1;
    }
    if (!mazeEndedTime) mazeEndedTime = mazeStartedTime;
    return [level, 2, (mazeEndedTime - mazeStartedTime).toFixed(4) + "μs", iteration, solved, visitedFields];
}

