const contract = artifacts.require("Data");

module.exports = function (deployer) {
  deployer.deploy(contract);
};