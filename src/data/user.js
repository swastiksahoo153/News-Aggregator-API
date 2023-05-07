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
    try {
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
    } catch (err) {
      return Promise.reject("Error while creating user: " + err);
    }
  }
  static getUsers() {
    try {
      const users = Object.values(store).map((item) => item.userInfo);
      return Promise.resolve(users);
    } catch (err) {
      return Promise.reject("Error while fetching user: " + err);
    }
  }
  static findOne(userAttribute) {
    try {
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
    } catch (err) {
      return Promise.reject(
        `Error while fetching user by : ${userAttribute}` + err
      );
    }
  }
  static deleteAll() {
    Object.keys(store).forEach((key) => delete store[key]);
  }
}

module.exports = User;
