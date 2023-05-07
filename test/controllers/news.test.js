let chai = require("chai");
const sinon = require("sinon");
let chaiHttp = require("chai-http");
const server = require("../../src/app");
const services = require("../../src/services");
const { deleteAllUsers, createUser, updateUserPreferences, createToken } =
  services;
const { newsFixture } = require("./consts");

chai.use(chaiHttp);
const expect = chai.expect;

const endpointPrefix = "/api/v1/";

describe("Tests for news", () => {
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

  describe("GET /news", () => {
    it("get the set preferences", (done) => {
      sinon.stub(services, "getNewsArticles").resolves(newsFixture); // Avoid making call to external API and always return fixed response
      chai
        .request(server)
        .get(`${endpointPrefix}/news`)
        .set("Authorization", `JWT ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.deep.members(newsFixture); // Verify against the fixed response returned from the stubbed function
          done();
        });
    });
  });
});
