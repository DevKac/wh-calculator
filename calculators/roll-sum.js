const helperDiceRolls = require('../helpers/dice-rolls');

function rollSum(dice, target, bonus = 0, typeOfDice = 6) {
  return helperDiceRolls.rollSumChance(target - bonus, dice, false, typeOfDice);
}
module.exports.rollSum = rollSum;

function rollSumFullReroll(dice, target, bonus = 0, typeOfDice = 6) {
  const chanceForSuccess = helperDiceRolls.rollSumChance(target - bonus, dice, false, typeOfDice);
  return chanceForSuccess + (1 - chanceForSuccess) * chanceForSuccess;
}
module.exports.rollSumFullReroll = rollSumFullReroll;

function rollSumReroll(dice, target, reroll, bonus = 0, typeOfDice = 6) {
  const rerollObject = {
    nrOfRerolls: 1,
    rerollValues: reroll
  }
  return helperDiceRolls.rollSumChanceWithOneReroll(target - bonus, rerollObject, dice, false, typeOfDice);
}
module.exports.rollSumReroll = rollSumReroll;