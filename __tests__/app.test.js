const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const endpoints = require('../endpoints.json')
const Test = require("supertest/lib/test");

beforeEach(() => seed(data));

afterAll(() => db.end());

describe('GET /api',() => {
    test('Respond with a json detailing all available endpoints', () => {
        return request(app)
            .get('/api')
            .expect(200)
            .then(({body}) => {
                expect(body.endpoints).toEqual(endpoints)
            })
    })
})

describe("GET /api/topics", () => {
  test(
    "Respond with 200 and array of topic objects with slug and description properties present",
    () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics.length).toBeGreaterThanOrEqual(1);
          body.topics.forEach((topic) => {
            expect(topic).toMatchObject({
              slug: expect.any(String),
              description: expect.any(String),
            });
          });
        });
    }
  );
});
