module.exports = (app) => {
  require("./personController")(app);
  require("./contractController")(app);
  require("./linkedContractController")(app);
};
