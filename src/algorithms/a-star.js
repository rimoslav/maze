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

let marks = [];
const mark = (position) => {
	marks.push(position.toString());
}

const distance = (step, end) => {
	return Math.sqrt(Math.abs(Math.pow(step[0] - end[0], 2) + Math.pow(step[1] - end[1], 2))) //step[0] - end[0], step[1] - end[1]
}

const chooseNextStep = (currentPosition, endPosition, blockedFields, mazeSize, iteration) => {
	let nextPosition;

	const moveUp = move(currentPosition, 1);
	const moveRight = move(currentPosition, 2);
	const moveBack = move(currentPosition, 3);
	const moveLeft = move(currentPosition, 4);

	const allowUp = !isMoveInvalid(moveUp, mazeSize) && !isMoveBlocked(moveUp, blockedFields);
	const allowBack = !isMoveInvalid(moveBack, mazeSize) && !isMoveBlocked(moveBack, blockedFields);
	const allowRight = !isMoveInvalid(moveRight, mazeSize) && !isMoveBlocked(moveRight, blockedFields);
	const allowLeft = !isMoveInvalid(moveLeft, mazeSize) && !isMoveBlocked(moveLeft, blockedFields);

	const up = {
		distance: allowUp ? distance(moveUp, endPosition) : -1,
		marked: allowUp && getOccurrence(marks, moveUp.toString()),
		step: moveUp
	}
	const back = {
		distance: allowBack ? distance(moveBack, endPosition) : -1,
		marked: allowBack && getOccurrence(marks, moveBack.toString()),
		step: moveBack
	}
	const right = {
		distance: allowRight ? distance(moveRight, endPosition) : -1,
		marked: allowRight && getOccurrence(marks, moveRight.toString()),
		step: moveRight
	}
	const left = {
		distance: allowLeft ? distance(moveLeft, endPosition) : -1,
		marked: allowLeft && getOccurrence(marks, moveLeft.toString()),
		step: moveLeft
	}

	const distances = [up, back, left, right].sort((a, b) => a.distance - b.distance);

	for (let i = 0; i < 4; i++) {
		if (typeof distances[i].marked === 'number' && distances[i].marked < i + 1 && distances[i].distance > -1) {
			mark(currentPosition.toString());
			return nextPosition = distances[i].step;
		}
	}

	return nextPosition = null;
}
/**
 * 
 * @param {Array} startPosition Coordinates of maze starting position.
 * @param {Array} endPosition Coordinates of maze "finish line" position.
 * @param {Array.<Array>} blockedFields Array of maze blocked fields.
 * @param {Number} mazeSize Actual maze size (for 10x10 maze, mazeSize equals 10).
 * @returns {Array} Coordinates of last field visited by algorightm. If same as "end" coordinates, the maze is solved. Else the algorithm either failed or maze is not solvable (unknown).
 */
export const aStar = (startPosition, endPosition, blockedFields, mazeSize, level) => {
	const mazeStartedTime = window.performance.now();
	marks = [];
	const visitedFields = [];
	let mazeEndedTime;
	let solved = false;
	let currentPosition = startPosition; // Current position of the algorithm on the race to endPosition is set to startPosition at the beggining of the loop.
	let iteration = 0;
	const largerSide = Math.max(mazeSize[0], mazeSize[1]);
	while (solved === false && iteration < Math.pow(largerSide, 4)) {
		let nextPosition = chooseNextStep(currentPosition, endPosition, blockedFields, mazeSize, iteration);
		if (!nextPosition) {
			iteration = Math.pow(largerSide, 4);
			mazeEndedTime = window.performance.now();
		} else if (equalArrays(nextPosition, endPosition)) {
			visitedFields.push(nextPosition);
			currentPosition = [...endPosition];
			solved = true;
			mazeEndedTime = window.performance.now();
		} else {
			currentPosition = [...nextPosition];
			visitedFields.push(nextPosition);
		}
		iteration += 1;
	}
	if (!mazeEndedTime) mazeEndedTime = mazeStartedTime;
	return [level, 3, (mazeEndedTime - mazeStartedTime).toFixed(4) + "μs", iteration, solved, visitedFields];
}

