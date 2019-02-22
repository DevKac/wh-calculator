function rollSumChance(querySum, dice = 2, exactRoll = false, typeOfDice = 6) {
  let rollResult;
  let x = 0;
  let n = 0;
  let totalResults = Math.pow(typeOfDice, dice);
  do {
    typeof rollResult === 'undefined' ? rollResult = new Array(dice).fill(1) : nextResult(rollResult, dice, typeOfDice);
    
    const totalSum = rollResult.reduce((total, num) => { return total + num })
    if (exactRoll) {
      if (totalSum === querySum) {
        x++;
      }
    } else {
      if (totalSum >= querySum) {
        x++;
      }
    }

    n++;
  } while (n < totalResults);

  return x/totalResults;
}
module.exports.rollSumChance = rollSumChance;

function rollSumChanceWithOneReroll(querySum, reroll, dice = 2, exactRoll = false, typeOfDice = 6) {
  const extendedDice = dice + 1;
  let rollResult;
  let x = 0;
  let n = 0;
  let totalResults = Math.pow(typeOfDice, extendedDice);
  do {
    typeof rollResult === 'undefined' ? rollResult = new Array(extendedDice).fill(1) : nextResult(rollResult, extendedDice, typeOfDice);
    
    let rollResultAfterReroll = rerollResults(rollResult.slice(0, reroll.nrOfRerolls), rollResult.slice(-dice), reroll);
    
    const totalSum = rollResultAfterReroll.reduce((total, num) => { return total + num })
    if (exactRoll) {
      if (totalSum === querySum) {
        x++;
      }
    } else {
      if (totalSum >= querySum) {
        x++;
      }
    }

    n++;
  } while (n < totalResults);

  return x/totalResults;
}
module.exports.rollSumChanceWithOneReroll = rollSumChanceWithOneReroll;

function nextResult(currentRoll, dice, typeOfDice) {
  if (currentRoll[dice-1] < typeOfDice) {
    currentRoll[dice-1]++;
  } else if (currentRoll[dice-1] = typeOfDice) {
    currentRoll[dice-1] = 1;
    nextResult(currentRoll, dice-1, typeOfDice);
  } else {
    throw new Error('Number is out of range!');
  }
}
module.exports.nextResult = nextResult;

function rerollResults(rerolledValues, currentRoll, reroll) {
  for (let i = 0, k = 0; i < currentRoll.length && k < reroll.nrOfRerolls; i++) {
    if (reroll.rerollValues.includes(currentRoll[i])) {
      currentRoll[i] = rerolledValues[k];
      k++
    }
  }
  return currentRoll;
}
module.exports.rerollResults = rerollResults;