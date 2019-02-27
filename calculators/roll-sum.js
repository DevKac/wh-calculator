const helperDiceRolls = require('../helpers/dice-rolls');

function rollSum(target, dice, bonus = 0, penalty = 0, typeOfDice = 6) {
  let neededRoll = Math.max(1, target - bonus + penalty);
  return helperDiceRolls.rollSumChance(neededRoll, dice, [], false, typeOfDice);
}
module.exports.rollSum = rollSum;

function rollSumFullReroll(target, dice, bonus = 0, penalty = 0, typeOfDice = 6) {
  let neededRoll = Math.max(1, target - bonus + penalty);
  const chanceForSuccess = helperDiceRolls.rollSumChance(neededRoll, dice, [], false, typeOfDice);
  return chanceForSuccess + (1 - chanceForSuccess) * chanceForSuccess;
}
module.exports.rollSumFullReroll = rollSumFullReroll;

function rollSumRerollLowest(target, dice, bonus = 0, penalty = 0, typeOfDice = 6) {
  let neededRoll = Math.max(1, target - bonus + penalty);
  return helperDiceRolls.rollSumChance(neededRoll, dice, ['lowest'], false, typeOfDice);
}
module.exports.rollSumRerollLowest = rollSumRerollLowest;

function rollSumFullRerollAndRerollLowest(target, dice, bonus = 0, penalty = 0, typeOfDice = 6) {
  let neededRoll = Math.max(1, target - bonus + penalty);
  return helperDiceRolls.rollSumChance(neededRoll, dice, ['lowest', 'full'], false, typeOfDice);
}
module.exports.rollSumFullRerollAndRerollLowest = rollSumFullRerollAndRerollLowest;

function rollSumWithRerolls(target, dice, rerolls = [], bonus = 0, penalty = 0, typeOfDice = 6) {
  let neededRoll = Math.max(1, target - bonus + penalty);
  return helperDiceRolls.rollSumChance(neededRoll, dice, rerolls, false, typeOfDice);
}
module.exports.rollSumWithRerolls = rollSumWithRerolls;
