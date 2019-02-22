function rollSumChance(querySum, dice = 2, exactRoll = false, typeOfDice = 6) {
  let rollResult;
  let x = 0, n = 0;
  let totalResults = Math.pow(typeOfDice, dice);
  
  do {
    typeof rollResult === 'undefined' ? rollResult = new Array(dice).fill(1) : getNextResult(rollResult, dice, typeOfDice);
    if (isCorrectResult(rollResult, querySum, exactRoll)) {
      x++;
    }
    n++;
  } while (n < totalResults);

  return x/totalResults;
}
module.exports.rollSumChance = rollSumChance;

function rollSumChanceWithRerollLowest(querySum, dice = 2, exactRoll = false, typeOfDice = 6) {
  const extendedDice = dice + 1;
  let rollResult;
  let x = 0, n = 0;
  let totalResults = Math.pow(typeOfDice, extendedDice);
  
  do {
    typeof rollResult === 'undefined' ? rollResult = new Array(extendedDice).fill(1) : getNextResult(rollResult, extendedDice, typeOfDice);
    
    let rollResultAfterReroll = rollResult.slice(-dice);
    if (isCorrectResult(rollResultAfterReroll, querySum, exactRoll)) {
      x++
    } else {
      rollResultAfterReroll = getRerolledLowest(rollResult.slice(0, 1), rollResultAfterReroll);
      if (isCorrectResult(rollResultAfterReroll, querySum, exactRoll)) {
        x++
      }
    }
    n++;
  } while (n < totalResults);

  return x/totalResults;
}
module.exports.rollSumChanceWithRerollLowest = rollSumChanceWithRerollLowest;

function getNextResult(currentRoll, dice, typeOfDice) {
  if (currentRoll[dice-1] < typeOfDice) {
    currentRoll[dice-1]++;
  } else if (currentRoll[dice-1] = typeOfDice) {
    currentRoll[dice-1] = 1;
    getNextResult(currentRoll, dice-1, typeOfDice);
  } else {
    throw new Error('Number is out of range!');
  }
}
module.exports.getNextResult = getNextResult;

function isCorrectResult(currentRoll, querySum, exactRoll) {
  const totalSum = currentRoll.reduce((total, num) => { return total + num })
  if (exactRoll) {
    if (totalSum === querySum) {
      return true;
    }
  } else {
    if (totalSum >= querySum) {
      return true;
    }
  }
  return false;
}
module.exports.isCorrectResult = isCorrectResult;

function getRerolledLowest(rerolledValues, currentRoll) {
  // todo: make it work on more then one reroll
  let i = currentRoll.indexOf(Math.min(...currentRoll));
  currentRoll[i] = rerolledValues[0];
  return currentRoll;
}
module.exports.getRerolledLowest = getRerolledLowest;