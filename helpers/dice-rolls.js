function rollSumChance(querySum, dice = 2, rerolls = [], exactRoll = false, typeOfDice = 6) {
  const extendedDice = dice * 2;
  let rollResult;
  let x = 0, n = 0;
  let totalResults = Math.pow(typeOfDice, extendedDice);

  do {
    typeof rollResult === 'undefined' ? rollResult = new Array(extendedDice).fill(1) : getNextResult(rollResult, extendedDice, typeOfDice);
    
    let rollResultAfterReroll;
    if (rerolls.includes('lowest') || rerolls.includes('full')) {
      // special reroll cases
      let alreadyMatched = false;
      rollResultAfterReroll = rollResult.slice(-dice);
      if (isCorrectResult(rollResultAfterReroll, querySum, exactRoll)) {
        alreadyMatched = true;
        x++
      }
      if (alreadyMatched === false && rerolls.includes('lowest')) {
        rollResultAfterReroll = getRerolledLowest(rollResult.slice(0, 1), rollResultAfterReroll);
        if (isCorrectResult(rollResultAfterReroll, querySum, exactRoll)) {
          alreadyMatched = true;
          x++
        }
      }
      if (alreadyMatched === false && rerolls.includes('full')) {
        rollResultAfterReroll = rollResult.slice(0, dice);
        if (isCorrectResult(rollResultAfterReroll, querySum, exactRoll)) {
          alreadyMatched = true;
          x++
        }
      }
    } else {
      // reroll results specified in reroll array
      rollResultAfterReroll = rerollResults(rollResult.slice(0, dice), rollResult.slice(-dice), rerolls);
      if (isCorrectResult(rollResultAfterReroll, querySum, exactRoll)) {
        x++
      }
    }

    n++;
  } while (n < totalResults);

  return x/totalResults;

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
  function getRerolledLowest(rerolledValues, currentRoll) {
    // todo: make it work on more then one reroll
    let i = currentRoll.indexOf(Math.min(...currentRoll));
    currentRoll[i] = rerolledValues[0];
    return currentRoll;
  }
  function rerollResults(rerolledValues, currentRoll, rerolls) {
    return currentRoll.map((item, index) => {
      if (rerolls.includes(currentRoll[index])) {
        return rerolledValues[index];
      } else {
        return item;
      }
    });
  }
}
module.exports.rollSumChance = rollSumChance;
