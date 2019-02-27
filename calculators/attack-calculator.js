const helperDiceRolls = require('../helpers/dice-rolls');

function getDmgFromCurrentAttack(attackMemberAttack, defendUnit, appliedBuffs) {
  return 1 * getHitRoll(attackMemberAttack, defendUnit, appliedBuffs);
}
module.exports.getDmgFromCurrentAttack = getDmgFromCurrentAttack;

function getHitRoll(attackMemberAttack, defendUnit, appliedBuffs) {
  let rerolls = [];
  if (attackMemberAttack.bonus.includes('reroll1toHit')) {
    rerolls.push(1);
  }
  return hitRoll(attackMemberAttack.WS, 0, 0, rerolls) * getWoundRoll(attackMemberAttack, defendUnit, appliedBuffs);
  
  function hitRoll(ws, bonus = 0, minus = 0, rerolls = []) {
    let neededRoll = Math.max(2, ws - bonus + minus);
    return helperDiceRolls.rollSumChance(neededRoll, 1, rerolls);
  }
}
module.exports.getHitRoll = getHitRoll;

function getWoundRoll(attackMemberAttack, defendUnit, appliedBuffs) {
  let attackStrength = attackMemberAttack.S;
  if (appliedBuffs.includes("S+1")) {
    attackStrength += 1;
  } 
  if (attackMemberAttack.bonus.includes('Sx2')) {
    attackStrength *= 2;
  }
  if (attackMemberAttack.bonus.includes('rending')) {
    const regularAttacks = woundRoll(attackStrength, defendUnit.T, 0, 1) * getSaveRoll(attackMemberAttack, defendUnit);
    const rendingAttacks = helperDiceRolls.rollSumChance(6, 1) * getSaveRoll(attackMemberAttack, defendUnit, ['rending']);
    return regularAttacks + rendingAttacks;
  } else {
    return woundRoll(attackStrength, defendUnit.T) * getSaveRoll(attackMemberAttack, defendUnit);
  }
  
  function woundRoll(s, t, bonus = 0, minus = 0, rerolls = []) {
    let neededRoll = 4;
    const ratio = s/t;
    if (ratio >= 2) {
      neededRoll = 2;
    }
    if (ratio < 2 && ratio > 1) {
      neededRoll = 3;
    }
    if (ratio === 1) {
      neededRoll = 4;
    }
    if (ratio < 1 && ratio > 0.5) {
      neededRoll = 5;
    }
    if (ratio <= 0.5) {
      neededRoll = 6
    }
    neededRoll = Math.max(2, neededRoll - bonus + minus);
    return helperDiceRolls.rollSumChance(neededRoll, 1, rerolls);
  }
}
module.exports.getWoundRoll = getWoundRoll;

function getSaveRoll(attackMemberAttack, defendUnit, subgroup = []) {
  let usedSaveEffect = 1;
  if (defendUnit.Sv !== null || defendUnit.Inv !== null) {
    let usedSave;
    const usedAP = subgroup.includes('rending') ? Math.max(4,attackMemberAttack.AP)  : attackMemberAttack.AP;
    if (defendUnit.Sv !== null && defendUnit.Inv !== null) {
      usedSave = Math.min(defendUnit.Sv + usedAP, defendUnit.Inv);
    } else if (defendUnit.Sv !== null && defendUnit.Inv === null) {
      usedSave = defendUnit.Sv + usedAP;
    } else if (defendUnit.Sv === null && defendUnit.Inv !== null) {
      usedSave = defendUnit.Inv;
    } else {
      usedSave = 7;
    }
    usedSaveEffect = (1 - saveRoll(usedSave));
  }
  let nrOfWounds = 1;
  if(defendUnit.multiwound) {
    nrOfWounds = attackMemberAttack.Dmg;
  }
  return usedSaveEffect * nrOfWounds * getFnPRoll(attackMemberAttack, defendUnit);

  function saveRoll(sv, bonus = 0, minus = 0, rerolls = []) {
    let neededRoll = Math.max(2, sv - bonus + minus);
    return helperDiceRolls.rollSumChance(neededRoll, 1, rerolls);
  }
}
module.exports.getSaveRoll = getSaveRoll;

function getFnPRoll(attackMemberAttack, defendUnit) {
  if (defendUnit.FnP !== null) {
    if (defendUnit.multiwound) {
      return (1 - fnpRoll(defendUnit.FnP));
    } else {
      return (1 - Math.pow(fnpRoll(defendUnit.FnP), attackMemberAttack.Dmg));
    }
  } else {
    return 1;
  }

  function fnpRoll(fnp, bonus = 0, minus = 0, rerolls = []) {
    let neededRoll = Math.max(2, fnp - bonus + minus);
    return helperDiceRolls.rollSumChance(neededRoll, 1, rerolls);
  }
}
module.exports.getFnPRoll = getFnPRoll;
