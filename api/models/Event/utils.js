const getPrice = (num) => (num / 100).toFixed(2);
const setPrice = (num) => num * 100;

module.exports = {
  getPrice,
  setPrice,
};
