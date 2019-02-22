const helperDiceRolls = require('../helpers/dice-rolls');

function deepStrikeCharge(dice, bonus = 0, typeOfDice = 6) {
  return helperDiceRolls.rollSumChance(9 - bonus, dice, false, typeOfDice);
}
module.exports.deepStrikeCharge = deepStrikeCharge;

function deepStrikeChargeFullReroll(dice, bonus = 0, typeOfDice = 6) {
  const chanceForSuccess = helperDiceRolls.rollSumChance(9 - bonus, dice, false, typeOfDice);
  return chanceForSuccess + (1 - chanceForSuccess) * chanceForSuccess;
}
module.exports.deepStrikeChargeFullReroll = deepStrikeChargeFullReroll;

function deepStrikeChargeWithCommandReroll(dice, reroll, bonus = 0, typeOfDice = 6) {
  const rerollObject = {
    nrOfRerolls: 1,
    rerollValues: reroll
  }
  return helperDiceRolls.rollSumChanceWithOneReroll(9 - bonus, rerollObject, dice, false, typeOfDice);
}
module.exports.deepStrikeChargeWithCommandReroll = deepStrikeChargeWithCommandReroll;

function perfectAmbushChargeWith2CommandRerolls(chargeDice, reroll, bonus = 0, typeOfDice = 6) {
  const rerollMoveObject = {
    nrOfRerolls: 1,
    rerollValues: reroll[0]
  }
  const rerollChargeObject = {
    nrOfRerolls: 1,
    rerollValues: reroll[1]
  }
  let result = 0;
  // todo: remove for
  for (let i = 1; i <= typeOfDice; i++) {
    result += helperDiceRolls.rollSumChanceWithOneReroll(i, rerollMoveObject, 1, true, typeOfDice) * helperDiceRolls.rollSumChanceWithOneReroll(9 - i - bonus, rerollChargeObject, chargeDice, false, typeOfDice);
  }
  return result;
}
module.exports.perfectAmbushChargeWith2CommandRerolls = perfectAmbushChargeWith2CommandRerolls;