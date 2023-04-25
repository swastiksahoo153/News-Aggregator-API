const bcrypt = require("bcrypt");
const store  = require('./dataStore');
const { 
    v4: uuidv4,
} = require('uuid');
  

class User {
    constructor(user) {
        this.id       = uuidv4()
        this.fullName = user.fullName
        this.email    = user.email
        this.role     = user.role
        this.password = bcrypt.hashSync(user.password, 8)
    }
    save() {
        if (store.users.find(usr => usr.email === this.email)) {
            return Promise.reject("User already exists!")
        }
        store.users.push(this)
        console.log(store.users)
        return Promise.resolve() 
    }
    getUsers() {
        return Promise.resolve(store.users)
    }
    static findOne(userAttribute) {
        const attribute = Object.keys(userAttribute)[0] // only support one attribute for thr sake of simplicity
        const user = store.users.find(usr => usr[attribute] === userAttribute[attribute])
        return Promise.resolve(user)
    }
}

module.exports = User