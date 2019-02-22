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

