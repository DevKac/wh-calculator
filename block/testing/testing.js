const helperDiceRolls = require('../../helpers/dice-rolls');

function calculateTesting() {
  // todo: add some real testing?
  try {
    let results = [];
    results.push(checkResult(5/6, helperDiceRolls.rollSumChance(2, 1)));
    results.push(checkResult(35/36, helperDiceRolls.rollSumChance(2, 1, [1])));
    results.push(checkResult(35/36, helperDiceRolls.rollSumChance(2, 1, [1])));
    results.push(checkResult(35/36, helperDiceRolls.rollSumChance(2, 1, ['full'])));

    results.push(checkResult(2/3, helperDiceRolls.rollSumChance(3, 1)));
    results.push(checkResult(7/9, helperDiceRolls.rollSumChance(3, 1, [1])));
    results.push(checkResult(8/9, helperDiceRolls.rollSumChance(3, 1, [1, 2])));
    results.push(checkResult(8/9, helperDiceRolls.rollSumChance(3, 1, ['full'])));

    results.push(checkResult(1/2, helperDiceRolls.rollSumChance(4, 1)));
    results.push(checkResult(7/12, helperDiceRolls.rollSumChance(4, 1, [1])));
    results.push(checkResult(3/4, helperDiceRolls.rollSumChance(4, 1, [1, 2, 3])));
    results.push(checkResult(3/4, helperDiceRolls.rollSumChance(4, 1, ['full'])));

    results.push(checkResult(1/3, helperDiceRolls.rollSumChance(5, 1)));
    results.push(checkResult(7/18, helperDiceRolls.rollSumChance(5, 1, [1])));
    results.push(checkResult(5/9, helperDiceRolls.rollSumChance(5, 1, [1, 2, 3, 4])));
    results.push(checkResult(5/9, helperDiceRolls.rollSumChance(5, 1, ['full'])));

    results.push(checkResult(1/6, helperDiceRolls.rollSumChance(6, 1)));
    results.push(checkResult(7/36, helperDiceRolls.rollSumChance(6, 1, [1])));
    results.push(checkResult(11/36, helperDiceRolls.rollSumChance(6, 1, [1, 2, 3, 4, 5])));
    results.push(checkResult(11/36, helperDiceRolls.rollSumChance(6, 1, ['full'])));

    results.push(checkResult(4/8, helperDiceRolls.rollSumChance(5, 1, [], false, 8)));

    results.push(checkResult(36/36, helperDiceRolls.rollSumChance(2, 2)));
    results.push(checkResult(35/36, helperDiceRolls.rollSumChance(3, 2)));
    results.push(checkResult(33/36, helperDiceRolls.rollSumChance(4, 2)));
    results.push(checkResult(30/36, helperDiceRolls.rollSumChance(5, 2)));
    results.push(checkResult(26/36, helperDiceRolls.rollSumChance(6, 2)));
    results.push(checkResult(21/36, helperDiceRolls.rollSumChance(7, 2)));
    results.push(checkResult(15/36, helperDiceRolls.rollSumChance(8, 2)));
    results.push(checkResult(10/36, helperDiceRolls.rollSumChance(9, 2)));
    results.push(checkResult(6/36, helperDiceRolls.rollSumChance(10, 2)));
    results.push(checkResult(3/36, helperDiceRolls.rollSumChance(11, 2)));
    results.push(checkResult(1/36, helperDiceRolls.rollSumChance(12, 2)));

    // throw error if any validation failed
    if (results.includes(true)) {
      throw new Error('At least one validation failed!');
    } else {
      console.log('Tests passed :)');
    }
  } catch (err) {
    console.log('Error occurred: ');
    console.log(err);
  }

  function checkResult(expectedValue, resultValue) {
    if (expectedValue !== resultValue) {
      logOutput('Expected ' + expectedValue + ', got: ' + resultValue);
      return true;
    } else {
      return false;
    }
  }
  function logOutput(msg, log = true) {
    if (log) {
      console.log(msg);
    }
  }
}
module.exports.calculateTesting = calculateTesting;
