let chai = require("chai");
let chaiHttp = require("chai-http");
const server = require("../../src/app");
const { deleteAllUsers, createUser } = require("../../src/services");

chai.use(chaiHttp);
const expect = chai.expect;

const endpointPrefix = "/api/v1/";

describe("verifies register flow", () => {
  before(async function () {
    // runs once before the first test in this block
    // delete all users and make just one user with the following details
    await deleteAllUsers();
    await createUser({
      fullName: "Swastik Sahoo",
      email: "swastiksahoo22@gmail.com",
      role: "ADMIN",
      password: "password",
    });
  });

  it("successful register", (done) => {
    const registerBody = {
      fullName: "Swastik Sahoo",
      email: "newemailswastiksahoo22@gmail.com",
      role: "ADMIN",
      password: "password",
    };
    chai
      .request(server)
      .post(`${endpointPrefix}/register`)
      .send(registerBody)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body.message).equal("User Registered successfully");
        done();
      });
  });

  it("incomplete details provided for register", (done) => {
    const registerBody = {
      fullName: "Swastik Sahoo",
      role: "ADMIN",
      password: "password",
    };
    chai
      .request(server)
      .post(`${endpointPrefix}/register`)
      .send(registerBody)
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.message).equal(
          "fullName, email, role & password are required"
        );
        done();
      });
  });
  it("Email already exists", (done) => {
    const registerBody = {
      fullName: "Swastik Sahoo",
      email: "swastiksahoo22@gmail.com",
      role: "ADMIN",
      password: "password",
    };
    chai
      .request(server)
      .post(`${endpointPrefix}/register`)
      .send(registerBody)
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.message).equal("Email already exists!");
        done();
      });
  });
});

describe("verifies login flow", () => {
  before(async function () {
    // runs once before the first test in this block
    // delete all users and make just one user with the following details
    await deleteAllUsers();
    await createUser({
      fullName: "Swastik Sahoo",
      email: "swastiksahoo22@gmail.com",
      role: "ADMIN",
      password: "password",
    });
  });

  it("successful login", (done) => {
    const loginBody = {
      email: "swastiksahoo22@gmail.com",
      password: "password",
    };
    chai
      .request(server)
      .post(`${endpointPrefix}/login`)
      .send(loginBody)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body.message).equal("Login successful");

        done();
      });
  });

  it("incorrect password", (done) => {
    const loginBody = {
      email: "swastiksahoo22@gmail.com",
      password: "INCORRECT_password",
    };
    chai
      .request(server)
      .post(`${endpointPrefix}/login`)
      .send(loginBody)
      .end((err, res) => {
        expect(res.status).equal(401);
        expect(res.body.message).equal("Invalid Password!");
        done();
      });
  });
  it("User not found", (done) => {
    const loginBody = {
      email: "doesnotexist@gmail.com",
      password: "password",
    };
    chai
      .request(server)
      .post(`${endpointPrefix}/login`)
      .send(loginBody)
      .end((err, res) => {
        expect(res.status).equal(404);
        expect(res.body.message).equal("User Not found.");
        done();
      });
  });

  it("Insufficient values provided", (done) => {
    const loginBody = {
      password: "password",
    };
    chai
      .request(server)
      .post(`${endpointPrefix}/login`)
      .send(loginBody)
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.message).equal("email & password are required");
        done();
      });
  });
});
