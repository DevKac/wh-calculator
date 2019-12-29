const helperDiceRolls = require('../helpers/dice-rolls');

function rollSum(target, dice, bonus = 0, penalty = 0, typeOfDice = 6, discardLowest = null) {
  let neededRoll = Math.max(1, target - bonus + penalty);
  return helperDiceRolls.rollSumChance(neededRoll, dice, [], false, typeOfDice, discardLowest);
}
module.exports.rollSum = rollSum;

function rollSumFullReroll(target, dice, bonus = 0, penalty = 0, typeOfDice = 6, discardLowest = null) {
  let neededRoll = Math.max(1, target - bonus + penalty);
  const chanceForSuccess = helperDiceRolls.rollSumChance(neededRoll, dice, [], false, typeOfDice, discardLowest);
  return chanceForSuccess + (1 - chanceForSuccess) * chanceForSuccess;
}
module.exports.rollSumFullReroll = rollSumFullReroll;

function rollSumRerollLowest(target, dice, bonus = 0, penalty = 0, typeOfDice = 6, discardLowest = null) {
  let neededRoll = Math.max(1, target - bonus + penalty);
  return helperDiceRolls.rollSumChance(neededRoll, dice, ['lowest'], false, typeOfDice, discardLowest);
}
module.exports.rollSumRerollLowest = rollSumRerollLowest; 

function rollSumFullRerollAndRerollLowest(target, dice, bonus = 0, penalty = 0, typeOfDice = 6, discardLowest = null) {
  let neededRoll = Math.max(1, target - bonus + penalty);
  return helperDiceRolls.rollSumChance(neededRoll, dice, ['lowest', 'full'], false, typeOfDice, discardLowest);
}
module.exports.rollSumFullRerollAndRerollLowest = rollSumFullRerollAndRerollLowest;

function rollSumWithRerolls(target, dice, rerolls = [], bonus = 0, penalty = 0, typeOfDice = 6, discardLowest = null) {
  let neededRoll = Math.max(1, target - bonus + penalty);
  return helperDiceRolls.rollSumChance(neededRoll, dice, rerolls, false, typeOfDice, discardLowest);
}
module.exports.rollSumWithRerolls = rollSumWithRerolls;
