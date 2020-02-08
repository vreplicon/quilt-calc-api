const knex = require("knex");
const app = require("../src/app");
const { makeQuiltsArray } = require("./quilts.fixtures");

describe("Quilt Endpoints", function() {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());
  before("clean the table", () =>
    db.raw("TRUNCATE quilts RESTART IDENTITY CASCADE")
  );

  afterEach("cleanup", () =>
    db.raw("TRUNCATE quilts RESTART IDENTITY CASCADE")
  );

  describe(`GET /api/quilts`, () => {
    context(`Given there are no quilts`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get("/")
          .expect(200, {});
      });
    });

    context(`Given there are quilts`, () => {
      const testQuilts = makeQuiltsArray();
      beforeEach("insert quilts", () => {
        return db.into("quilts").insert(testQuilts);
      });
      it(`Returns all quilts in database`, () => {
        return supertest(app)
          .get("/")
          .expect(200, {});
      });
    });
  });
});
