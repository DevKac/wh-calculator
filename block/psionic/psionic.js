const helperPrettify = require('../../helpers/prettify.js');
const calculatorRollSum = require('../../calculators/roll-sum.js');

function calculatePsionic() {
  let category, subcategory;
  helperPrettify.displaySpace();
  category = 'Chance for successfully manifesting a psychic power: ';
  
  subcategory = 'with Warp Charge 5 ';
  logOutput(category + subcategory + ': ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSum(5, 2)));
  logOutput(category + subcategory + 'and reroll of a lower result: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSumRerollLowest(5, 2)));
  logOutput(category + subcategory + 'and reroll of ones: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSumWithRerolls(5, 2, [1])));
  helperPrettify.displayBreak();

  subcategory = 'with Warp Charge 6 ';
  logOutput(category + subcategory + ': ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSum(6, 2)));
  logOutput(category + subcategory + 'and reroll of a lower result: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSumRerollLowest(6, 2)));
  logOutput(category + subcategory + 'and reroll of ones: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSumWithRerolls(6, 2, [1])));
  helperPrettify.displayBreak();

  subcategory = 'with Warp Charge 7 ';
  logOutput(category + subcategory + ': ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSum(7, 2)));
  logOutput(category + subcategory + 'and reroll of a lower result: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSumRerollLowest(7, 2)));
  logOutput(category + subcategory + 'and reroll of ones: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSumWithRerolls(7, 2, [1])));
  helperPrettify.displayBreak();
  
  function logOutput(msg, log = true) {
    if (log) {
      console.log(msg);
    }
  }
}
module.exports.calculatePsionic = calculatePsionic;