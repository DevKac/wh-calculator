const fs = require('fs');

// const calculatorPsychicPhase = require('./calculators/psychic-phase');
// const calculatorChargePhase = require('./calculators/charge-phase');
const calculatorRollSum = require('./calculators/roll-sum');
const helperPrettify = require('./helpers/prettify');

// main function
(() => {
  // todo: collect it to some CSV or sth
  console.log('Welcone to Warhammer calculator!');
  helperPrettify.displaySpace();
  for (let target = 2; target <= 12; target++) {
    console.log('Chance for ' + target + ' with 2 dice reroll: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSum(2, target)) );
  }
  helperPrettify.displaySpace();
  for (let target = 2; target <= 12; target++) {
    console.log('Chance for ' + target + ' with 2 dice reroll with full reroll: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSumFullReroll(2, target)) );
  }
  helperPrettify.displaySpace();
  let results = [];
  for (let target = 2; target <= 12; target++) {
    for (let i = 1; i <= 6; i++) {
      for (let j = 1; j <= 6; j++) {
        // console.log('Your roll is ' + i + ' and ' + j);
        // console.log('Chance for ' + target + ' with full reroll: ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSum(2, target)) );
        const minValue = Math.min(i, j);
        const maxValue = Math.max(i, j);
        // console.log('Chance for ' + target + ' with reroll ' + minValue +': ' + helperPrettify.displayAsPercent(calculatorRollSum.rollSum(1, target - maxValue)) );
        results.push({
          target: target,
          roll: i + ', ' + j,
          fullReroll: helperPrettify.displayAsPercent(calculatorRollSum.rollSum(2, target)),
          lowerReroll: helperPrettify.displayAsPercent(calculatorRollSum.rollSum(1, target - maxValue))
        }); 
      }
    }
  }
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: './output/dejo.csv',
    header: [
        {id: 'target', title: 'Target'},
        {id: 'roll', title: 'Your roll'},
        {id: 'fullReroll', title: 'Full reroll'},
        {id: 'lowerReroll', title: 'Reroll of lower value'}
    ]
  });
 
  csvWriter.writeRecords(results).then(() => {
    console.log('...Done');
  });
  
  /*
  console.log('Chance for charge from deep strike with 2 dice: ' + helperPrettify.displayAsPercent(calculatorChargePhase.deepStrikeCharge(2)) );
  console.log('Chance for charge from deep strike with 2 dice with +1 to roll: ' + helperPrettify.displayAsPercent(calculatorChargePhase.deepStrikeCharge(2, 1)) );
  console.log('Chance for charge from deep strike with 2 dice with full reroll: ' + helperPrettify.displayAsPercent(calculatorChargePhase.deepStrikeChargeFullReroll(2)) );
  console.log('Chance for charge from deep strike with 2 dice with +1 to roll and full reroll: ' + helperPrettify.displayAsPercent(calculatorChargePhase.deepStrikeChargeFullReroll(2, 1)) );
  helperPrettify.displaySpace();
  console.log('Chance for charge from deep strike with 3 dice: ' + helperPrettify.displayAsPercent(calculatorChargePhase.deepStrikeCharge(3)) );
  console.log('Chance for charge from deep strike with 3 dice with +1 to roll: ' + helperPrettify.displayAsPercent(calculatorChargePhase.deepStrikeCharge(3, 1)) );
  console.log('Chance for charge from deep strike with 3 dice with full reroll: ' + helperPrettify.displayAsPercent(calculatorChargePhase.deepStrikeChargeFullReroll(3)) );
  console.log('Chance for charge from deep strike with 3 dice with +1 to roll and full reroll: ' + helperPrettify.displayAsPercent(calculatorChargePhase.deepStrikeChargeFullReroll(3, 1)) );
  helperPrettify.displaySpace();
  console.log('Chance for charge from deep strike with 2 dice with Command Reroll of 1 and below: ' + helperPrettify.displayAsPercent(calculatorChargePhase.deepStrikeChargeWithCommandReroll(2, [1])) );
  console.log('Chance for charge from deep strike with 2 dice with Command Reroll of 2 and below: ' + helperPrettify.displayAsPercent(calculatorChargePhase.deepStrikeChargeWithCommandReroll(2, [1, 2])) );
  console.log('Chance for charge from deep strike with 2 dice with Command Reroll of 3 and below: ' + helperPrettify.displayAsPercent(calculatorChargePhase.deepStrikeChargeWithCommandReroll(2, [1, 2, 3])) );
  helperPrettify.displaySpace();
  console.log('Chance for charge from Perfect Ambush with 2 Command Rerolls:');
  for (let i = 1; i <= 6; i++) {
    for (let j = 1; j <= 6; j++) {
      let iArray = Array.apply(null, {length: i}).map(function(value, index){
        return index + 1;
      });
      let jArray = Array.apply(null, {length: j}).map(function(value, index){
        return index + 1;
      });
      console.log('Reroll of ' + i + ' and below for move and ' + j + ' and below for charge: ' + helperPrettify.displayAsPercent(calculatorChargePhase.perfectAmbushChargeWith2CommandRerolls(2, [iArray, jArray], 1)));
    }
  }
  helperPrettify.displaySpace();
  console.log('When is it better to reroll one dice and when to full reroll for 2 dice!');
  for (let target = 2; target <= 12; target++) {
    console.log('Chance for ' + target + ' with full reroll: ' + helperPrettify.displayAsPercent(calculatorPsychicPhase.powerCast(2)) );
  }*/

})();
