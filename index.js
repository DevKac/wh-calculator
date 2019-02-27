const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const config = require('./config/config.js');
const blockTesting = require('./block/testing/testing.js');
const blockUnitsDmg = require('./block/units-dmg/units-dmg.js');
const blockCharges = require('./block/charges/charges.js');
const blockPsionic = require('./block/psionic/psionic.js');
const helperPrettify = require('./helpers/prettify.js');

// main function
(async () => {
  // todo: collect it to some CSV or sth
  // todo: add some cli menu?
  
  console.log('Welcone to Warhammer calculator!');
  helperPrettify.displaySpace();
  
  if (config.testing) {
    console.log('Testing...');
    blockTesting.calculateTesting();
    helperPrettify.displaySpace();
  }
  
  if (config.unitsDmg) {
    console.log('Damage output from specified units');
    blockUnitsDmg.calculateUnitsDmg();
    helperPrettify.displaySpace();
  }
  
  if (config.charges) {
    console.log('Charges');
    blockCharges.calculateCharges();
    helperPrettify.displaySpace(); 
  }

  if (config.psionic) {
    console.log('Psionic');
    blockPsionic.calculatePsionic();
    helperPrettify.displaySpace(); 
  }
  
})();
