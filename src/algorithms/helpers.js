/**
 * 
 * Checks if element is already in the blockedFields array. Used when creating blocked fields.
 * @param {Array} block New field to be added to blockedFields. 
 * @param {Array.<Array>} blockedFields Already added fields.
 * @returns {Boolean} True - don't add this field again; False - safe to be added.
 */

export const alreadyIn = (block, blockedFields) => {
    let isIt = false;
    blockedFields.forEach(field => {
        if (block[0] === field[0] && block[1] === field[1])
            return isIt = true;
    });
    return isIt
}

/**
 * 
 * Returns Array of block elements.
 * @param {Number} level Maze level and the number of blocked fields.
 * @param {Array} startPosition Coordinates of maze starting position.
 * @param {Array} endPosition Coordinates of maze "finish line" position.
 * @returns {Array.<Array>} Array of block elements with the lenght equal to the level.
 */
export const randomizeBlocks = (level, startPosition, endPosition, size) => {
    let blockedFields = [];
    while (blockedFields.length < level && blockedFields.length < ((size[0] * size[1]) - 2)) {
        let block = [...startPosition];
        while (equalArrays(block, startPosition) || equalArrays(block, endPosition) || alreadyIn(block, blockedFields)) {
            block[0] = Math.floor(Math.random() * size[0]);
            block[1] = Math.floor(Math.random() * size[1]);
        }
        blockedFields.push(block);
    }
    return Array.from(blockedFields);
}

/**
 * 
 * Would this move fall outside of maze?
 * @param {Array} nextPosition Next potential move coordinates.
 * @param {Number} mazeSize Acutal maze size (for 10x10 maze, mazeSize equals 10).
 */
export const isMoveInvalid = (nextPosition, mazeSize) => {
    return (nextPosition[0] < 0 || nextPosition[1] < 0 || nextPosition[0] > mazeSize[0] - 1 || nextPosition[1] > mazeSize[1] - 1)
}
/** 
 * 
 * Would this move fall on blocked field?
 * @param {Array} nextPosition Next potential move coordinates.
 * @param {Array.<Array>} blockedFields Array of arrays, each of which represents coordinates of blocked field.
 * @returns {Boolean} Would next move fall on blocked field or not?
 */
export const isMoveBlocked = (nextPosition, blockedFields) => {
    let isBlocked = false;
    blockedFields.some(field => {
        if (nextPosition[0] === field[0] && nextPosition[1] === field[1]) {
            return isBlocked = true;
        }
    });
    return isBlocked;
}

export const move = (currentPosition, randomNumber) => {
    let nextPosition = [];
    switch (randomNumber) {
        // UP
        case 1:
            nextPosition[0] = currentPosition[0] - 1;
            nextPosition[1] = currentPosition[1];
            break;
        // RIGHT
        case 2:
            nextPosition[0] = currentPosition[0];
            nextPosition[1] = currentPosition[1] + 1;
            break;
        // DOWN
        case 3:
            nextPosition[0] = currentPosition[0] + 1;
            nextPosition[1] = currentPosition[1];
            break;
        // LEFT
        default:
            nextPosition[0] = currentPosition[0];
            nextPosition[1] = currentPosition[1] - 1;
            break;
    }
    return nextPosition;
}

export const getOccurrence = (array, value) => {
    return array.filter((v) => (v === value)).length;
}

export const equalArrays = (array1, array2) => {
    if (!array1 || !array2)
        return false;

    // compare lengths - can save a lot of time 
    if (array1.length !== array2.length)
        return false;

    for (let i = 0, l = array1.length; i < l; i++) {
        if (array1[i] instanceof Array && array2[i] instanceof Array) {
            if (!equalArrays(array1[i], array2[i]))
                return false;
        }
        else if (array1[i] !== array2[i]) {
            // Warning - two different object instances will never be equal: {x:20} !== {x:20}
            return false;
        }
    }
    return true;
}