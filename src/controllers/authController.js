const {
  createUser,
  findUserByEmail,
  comparePassword,
  createToken,
} = require("../services");

const { UserValidator } = require("../helpers/Validator");

const signup = async (req, res) => {
  try {
    if (!UserValidator.allSignupValuesProvided(req.body)) {
      return res.status(400).send({
        message: "fullName, email, role & password are required",
      });
    }
    await createUser(req.body);
    res.status(200).send({
      message: "User Registered successfully",
    });
  } catch (err) {
    if (err === "Email already exists!") {
      return res.status(400).send({
        message: err,
      });
    }
    return res.status(500).send({
      message: err,
    });
  }
};

const signin = async (req, res) => {
  try {
    if (!UserValidator.allLoginValuesProvided(req.body)) {
      return res.status(400).send({
        message: "email & password are required",
      });
    }
    const user = await findUserByEmail(req.body.email);
    if (!user) {
      return res.status(404).send({
        message: "User Not found.",
      });
    }

    const isPasswordValid = comparePassword(req.body.password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = createToken(user.id);

    //responding to client request with user profile success message and  access token .
    res.status(200).send({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
      message: "Login successful",
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({
      message: err,
    });
  }
};

module.exports = { signin, signup };
