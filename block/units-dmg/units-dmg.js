const config = require('./config/config.js');
const helperPrettify = require('../../helpers/prettify.js');
const calculatorAttack = require('../../calculators/attack-calculator.js');

function calculateUnitsDmg() {
  config.source.units.forEach(attackUnit => {
    helperPrettify.displaySpace();
    logOutput(attackUnit.name + " (" + attackUnit.description + ")", config.output.log);
    attackUnit.buffs.forEach(appliedBuffs => {
      // todo: make it more readable
      logOutput(appliedBuffs, config.output.log);
      config.target.units.forEach(defendUnit => {
        let inflictedWounds = 0;
        attackUnit.members.forEach(attackMember => {
          let dmgFromOneMember = 0;
          attackMember.attacks.forEach(attackMemberAttack => {
            let attacksFromMember = attackMemberAttack.A;
            if (appliedBuffs.includes("A+1")) {
              attacksFromMember += 1;
            }
            dmgFromOneMember += attacksFromMember * calculatorAttack.getDmgFromCurrentAttack(attackMemberAttack, defendUnit, appliedBuffs);
          });
          inflictedWounds += dmgFromOneMember * attackMember.count;
        });
        logOutput(defendUnit.name + " (" + defendUnit.description + "): " + helperPrettify.displayRounded(inflictedWounds) + " wounds", config.output.log);
      });
    });
  });

  function logOutput(msg, log = true) {
    if (log) {
      console.log(msg);
    }
  }
}
module.exports.calculateUnitsDmg = calculateUnitsDmg;
