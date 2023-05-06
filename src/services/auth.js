const { User } = require("../data");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = ({ fullName, email, role, password }) => {
  const user = new User({
    fullName,
    email,
    role,
    password: bcrypt.hashSync(password, 8), //ecrypt password
  });

  return user.create();
};

const findUserByEmail = (email) => {
  return User.findOne({ email });
};

const comparePassword = (password1, password2) => {
  return bcrypt.compareSync(password1, password2);
};

const createToken = (userId) => {
  return jwt.sign(
    {
      id: userId,
    },
    process.env.API_SECRET,
    {
      expiresIn: 86400,
    }
  );
};

module.exports = { createUser, findUserByEmail, comparePassword, createToken };
