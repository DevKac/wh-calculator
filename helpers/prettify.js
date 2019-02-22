function displayAsPercent(input, digitsAfterComma = 2) {
  return ((input * 100).toFixed(digitsAfterComma) + '%').toString();
}
module.exports.displayAsPercent = displayAsPercent;

function displaySpace() {
  console.log('\n');
  console.log('__________');
  console.log('\n');
}
module.exports.displaySpace = displaySpace;