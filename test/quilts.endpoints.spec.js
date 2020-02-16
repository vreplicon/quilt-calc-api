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


  describe(`GET /api/quilts/:lookup_id`, () => {
    context(`Given id does not exist`, () => {
      it(`responds with 404`, () => {

      })
    })

    context('Given id does exist', () => {
			it(`Returns quilt`, () => {

			})
		})
    })
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

  describe(`POST /api/quilts`, () => {
		const testQuilts = makeQuiltsArray();

    it(`creates a quilt, responding with 201 and the new quilt`, () => {
      const newQuilt = {
      quilt_name: "Stripes",
      width: 3,
      height: 6,
      border: 0,
      block_width: 24,
      block_height: 12,
      class_name: "striped-block",
      standard_pattern: false,
      lookup_id: 1
      }
      return supertest(app)
        .post('/api/gear')
        .send(newQuilt)
        .expect(201)
        .expect(res => {
          expect(res.body.quilt_name).to.eql(newGear.quilt_name)
          expect(res.body.width).to.eql(newGear.width)
		  expect(res.body.border).to.eql(newGear.border)
		  expect(res.body.block_width).to.eql(newGear.block_width)
		  expect(res.body.block_height).to.eql(newGear.block_height)
		  expect(res.body.class_name).to.eql(newGear.class_name)
      expect(res.body.standard_pattern).to.eql(newGear.standard_pattern)
      expect(res.body.lookup_id).to.eql(newGear.lookup_id)
          expect(res.body).to.have.property('id')
        })
    })

  
    })
})




