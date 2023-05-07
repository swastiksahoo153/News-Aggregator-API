let chai = require("chai");
let chaiHttp = require("chai-http");
const server = require("../../src/app");
const {
  deleteAllUsers,
  createUser,
  updateUserPreferences,
  createToken,
} = require("../../src/services");

chai.use(chaiHttp);
const expect = chai.expect;

const endpointPrefix = "/api/v1/";

describe("Tests for preferences", () => {
  let userId;
  let token;

  beforeEach(async function () {
    await deleteAllUsers();
    userId = await createUser({
      fullName: "Swastik Sahoo",
      email: "swastiksahoo22@gmail.com",
      role: "ADMIN",
      password: "password",
    });
    updateUserPreferences(userId, ["science"]);
    token = createToken(userId);
  });

  describe("GET /preferences", () => {
    it("get the set preferences", (done) => {
      chai
        .request(server)
        .get(`${endpointPrefix}/preferences`)
        .set("Authorization", `JWT ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.same.members(["science"]);
          done();
        });
    });
  });

  describe("PUT /preferences", () => {
    it("add new preference for the user", (done) => {
      const newPreferenceBody = { preferences: ["sports", "bollywood"] };
      chai
        .request(server)
        .put(`${endpointPrefix}/preferences`)
        .send(newPreferenceBody)
        .set("Authorization", `JWT ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).equal("User Preferences updated successfully");
          done();
        });
    });
  });
});
