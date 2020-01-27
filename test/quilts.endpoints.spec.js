const knex = require('knex')
const app = require('../src/app')

describe('User Endpoints', function() {
  let db

  before('make knex instance', () => {

    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)

  })

  after('disconnect from db', () => db.destroy())

//   before('clean the table', () => db.raw('TRUNCATE quilts RESTART IDENTITY CASCADE'))

//   afterEach('cleanup',() => db.raw('TRUNCATE quilts RESTART IDENTITY CASCADE'))

  describe(`GET /api/quilts`, () => {

        context(`Given there are no quilts`, () => {
			it(`responds with 200 and an empty list`, () => {

			})
		})
		context(`Given there are quilts`, () => {
			it(`Returns all quilts in database`, () => {

			})
		})
    })
})