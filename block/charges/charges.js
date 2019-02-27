const helperPrettify = require('../../helpers/prettify.js');
const calculatorRollSum = require('../../calculators/roll-sum.js');

function calculateCharges() {
  let category;
  helperPrettify.displaySpace();
  category = 'Chance for charge from Deep Strike (9") ';
  
  logOutput(category + 'with 2 dice: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSum(9, 2)));
  logOutput(category + 'with 2 dice and a reroll of lower result: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSumRerollLowest(9, 2)));
  logOutput(category + 'with 2 dice and full reroll: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSumFullReroll(9, 2)));
  logOutput(category + 'with 2 dice, reroll of lower result and full reroll: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSumFullRerollAndRerollLowest(9, 2)));
  
  helperPrettify.displayBreak();
  logOutput(category + 'with 2 dice and +1: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSum(9, 2, 1)));
  logOutput(category + 'with 2 dice and +1 and a reroll of lower result: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSumRerollLowest(9, 2, 1)));
  logOutput(category + 'with 2 dice and +1 and full reroll: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSumFullReroll(9, 2, 1)));
  logOutput(category + 'with 2 dice and +1, reroll of lower result and full reroll: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSumFullRerollAndRerollLowest(9, 2, 1)));
  
  helperPrettify.displayBreak();
  logOutput(category + 'with 2 dice and +2: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSum(9, 2, 2)));
  logOutput(category + 'with 2 dice and +2 and a reroll of lower result: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSumRerollLowest(9, 2, 2)));
  logOutput(category + 'with 2 dice and +2 and full reroll: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSumFullReroll(9, 2, 2)));
  logOutput(category + 'with 2 dice and +2, reroll of lower result and full reroll: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSumFullRerollAndRerollLowest(9, 2, 2)));
  
  helperPrettify.displayBreak();
  logOutput(category + 'with 3 dice: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSum(9, 3)));
  logOutput(category + 'with 3 dice and a reroll of lower result: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSumRerollLowest(9, 3)));
  logOutput(category + 'with 3 dice and full reroll: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSumFullReroll(9, 3)));
  logOutput(category + 'with 3 dice, reroll of lower result and full reroll: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSumFullRerollAndRerollLowest(9, 3)));
  
  helperPrettify.displayBreak();
  logOutput(category + 'with 3 dice and +1: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSum(9, 3, 1)));
  logOutput(category + 'with 3 dice and +1 and a reroll of lower result: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSumRerollLowest(9, 3, 1)));
  logOutput(category + 'with 3 dice and +1: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSumFullReroll(9, 3, 1)));
  logOutput(category + 'with 3 dice and +1, reroll of lower result and full reroll: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSumFullRerollAndRerollLowest(9, 3, 1)));

  function logOutput(msg, log = true) {
    if (log) {
      console.log(msg);
    }
  }
}
module.exports.calculateCharges = calculateCharges;