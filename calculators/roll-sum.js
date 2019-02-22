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

function rollSumRerollLowest(dice, target, bonus = 0, typeOfDice = 6) {
  return helperDiceRolls.rollSumChanceWithRerollLowest(target - bonus, dice, false, typeOfDice);
}
module.exports.rollSumRerollLowest = rollSumRerollLowest;
