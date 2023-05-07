const store = require("../data/dataStore");
const { User } = require("../data");

function updateUserPreferences(userId, preferences) {
  store[userId].preferences = [...store[userId].preferences, ...preferences];
  return Promise.resolve({ status: true });
}

function getUserPreferences(userId) {
  return Promise.resolve(store[userId].preferences);
}

function deleteAllUsers() {
  User.deleteAll();
}

module.exports = { updateUserPreferences, getUserPreferences, deleteAllUsers };
