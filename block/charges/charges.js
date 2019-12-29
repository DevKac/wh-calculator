const config = require('./config/config.js');
const helperPrettify = require('../../helpers/prettify.js');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const calculatorRollSum = require('../../calculators/roll-sum.js');

function calculateCharges() {
  const csvWriter = config.output.csv ? setCsvWriter() : null;
  const records = [];

  config.settings.forEach((setting) => {
    records.push(calculateChargeChances(setting));
  })
  
  if (config.output.csv) {
    csvWriter.writeRecords(records).then(() => {
      console.log('charges.csv is done');
    });
  }
  
  function calculateChargeChances(setting) {
    const result = {setting: setting.name};
    
    for (let score = config.range.min; score <= config.range.max; score++) {
      const category = 'Chance for ' + setting.name + ' charge over distance ' + score.toString();
      let chance;
      switch(setting.reroll) {
        case 'full':
          chance = calculatorRollSum.rollSumFullReroll(score, setting.dices, setting.modifier > 0 ? setting.modifier : 0, setting.modifier < 0 ? Math.abs(setting.modifier) : 0, 6, setting.discardLowest)
          break;
        case 'lowest':
          chance = calculatorRollSum.rollSumFullRerollAndRerollLowest(score, setting.dices, setting.modifier > 0 ? setting.modifier : 0, setting.modifier < 0 ? Math.abs(setting.modifier) : 0, 6, setting.discardLowest)
          break;
        default:
          chance = calculatorRollSum.rollSum(score, setting.dices, setting.modifier > 0 ? setting.modifier : 0, setting.modifier < 0 ? Math.abs(setting.modifier) : 0, 6, setting.discardLowest)
      } 
      logOutput(category + ' ' + helperPrettify.displayAsPercent(chance));
      result['result_' + score] = chance;
    }
    
    return result;  
  }

  function setCsvWriter() {
    return createCsvWriter({
      path: 'output/charges.csv',
      header: setCsvWriterHeader()
    })
  }

  function setCsvWriterHeader() {
    const header = [{id: 'setting', title: ''}];

    for (let i = config.range.min; i <= config.range.max; i++) {
      header.push({id: 'result_' + i, title: i.toString()});
    }
    return header;
  }
  
  function logOutput(msg) {
    if (!config.output.log) {
      return;
    }
    console.log(msg);
  }
}
module.exports.calculateCharges = calculateCharges;