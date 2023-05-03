const store = require("./dataStore");
const { v4: uuidv4 } = require("uuid");

class User {
  constructor(user) {
    this.id = uuidv4();
    this.fullName = user.fullName;
    this.email = user.email;
    this.role = user.role;
    this.password = user.password;
  }
  createUserInfo() {
    return {
      id: this.id,
      fullName: this.fullName,
      email: this.email,
      role: this.role,
      password: this.password,
    };
  }
  create() {
    if (store[this.id] != undefined) {
      return Promise.reject("User already exists!");
    }
    store[this.id] = {
      userInfo: this.createUserInfo(),
      preferences: [],
      readArticleIds: [],
      favoriteArticleIds: [],
    };
    return Promise.resolve();
  }
  static getUsers() {
    const users = Object.values(store).map((item) => item.userInfo);
    return Promise.resolve(users);
  }
  static findOne(userAttribute) {
    const attribute = Object.keys(userAttribute)[0]; // only support one attribute for thr sake of simplicity
    let user = null;
    if (attribute === "id") {
      user = store[userAttribute.id];
    } else {
      user = Object.values(store).find(
        (usr) => usr.userInfo[attribute] === userAttribute[attribute]
      );
    }

    return Promise.resolve(user.userInfo);
  }
}

function updateUserPreferences(userId, preferences) {
  store[userId].preferences = [...store[userId].preferences, ...preferences];
  return Promise.resolve({ status: true });
}

function getUserPreferences(userId) {
  return Promise.resolve(store[userId].preferences);
}

module.exports = { User, updateUserPreferences, getUserPreferences };
