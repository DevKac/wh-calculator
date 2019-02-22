function powerCast(dice, bonus = 0, typeOfDice = 6) {
  return helperDiceRolls.rollSumChance(9 - bonus, dice, false, typeOfDice);
}
module.exports.deepStrikeCharge = deepStrikeCharge;