const prodStore = {};
const testStore = {};

require("dotenv").config();

let store = prodStore;

if (process.env.NODE_ENV === "TEST") {
  store = testStore;
}

module.exports = store;
