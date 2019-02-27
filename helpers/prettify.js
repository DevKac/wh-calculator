function displayAsPercent(input, digitsAfterComma = 2) {
  return ((input * 100).toFixed(digitsAfterComma) + '%').toString();
}
module.exports.displayAsPercent = displayAsPercent;

function displayRounded(input, digitsAfterComma = 2) {
  return (input.toFixed(digitsAfterComma)).toString();
}
module.exports.displayRounded = displayRounded;

function displaySpace() {
  console.log('\n');
  console.log('__________');
  console.log('\n');
}
module.exports.displaySpace = displaySpace;

function displayBreak() {
  console.log('\n');
}
module.exports.displayBreak = displayBreak;