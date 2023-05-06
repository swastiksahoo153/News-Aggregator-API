const { store } = require("../data");

function updateUserPreferences(userId, preferences) {
  store[userId].preferences = [...store[userId].preferences, ...preferences];
  return Promise.resolve({ status: true });
}

function getUserPreferences(userId) {
  return Promise.resolve(store[userId].preferences);
}

module.exports = { updateUserPreferences, getUserPreferences };
