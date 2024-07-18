const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const endpoints = require("../endpoints.json");
const Test = require("supertest/lib/test");

beforeEach(() => seed(data));

afterAll(() => db.end());

describe("GET /api", () => {
  test("Respond with a json detailing all available endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body.endpoints).toEqual(endpoints);
      });
  });
});

describe("GET /api/topics", () => {
  test("Respond with 200 and array of topic objects with slug and description properties present", () => {
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
  });
});

describe("GET /api/articles/:article_id", () => {
  test("Respond with an article containing the correct properties", () => {
    return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toMatchObject({
          article_id: 3,
          title: "Eight pug gifs that remind me of mitch",
          topic: "mitch",
          author: "icellusedkars",
          body: "some gifs",
          created_at: "2020-11-03T09:12:00.000Z",
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });
  test("Respond 400: Bad Request, when given invalid article_id", () => {
    return request(app)
      .get("/api/articles/not-a-number")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("Respond 404: Not Found, when given a non-existent article_id", () => {
    return request(app)
      .get("/api/articles/33333")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});

describe("GET /api/articles", () => {
  test("Respond with 200 and array of articles objects with the correct properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).toBe(13);
        body.articles.forEach((article) => {
          expect(article).toMatchObject({
            article_id: expect.any(Number),
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            votes: expect.any(Number),
            created_at: expect.any(String),
            article_img_url: expect.any(String),
            comment_count: expect.any(Number),
          });
        });
      });
  });
  test("Respond with an array of article objects sorted by created-at in descending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeSortedBy("created_at", { descending: true });
      });
  });
  test("Respond with 200 and articles sorted by created_at", () => {
    return request(app)
      .get("/api/articles?sort_by=votes")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeSortedBy("votes", { descending: true });
      });
  });
  test("Respond 400 : Bad Reques when given an invalid sort_by", () => {
    return request(app)
      .get("/api/articles?sort_by=not-valid")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("Respond with 200 and array of objects orderd by the given order(DESC or ASC)", () => {
    return request(app)
      .get("/api/articles?order_by=asc")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeSortedBy("created_at", { ascending: true });
      });
  });
  test("Respond 400: Bad Request when given and invalid order(DESC or ASC)", () => {
    return request(app)
      .get("/api/articles?order_by=invalid")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("Respond with 200 and articles of the given topic", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then(({ body }) => {
        body.articles.forEach((eachArticle) => {
          expect(eachArticle).toMatchObject({ topic: "mitch" });
        });
      });
  });
  test("Respond 404 when given a a topic that does not exist", () => {
    return request(app)
      .get("/api/articles?topic=Batman")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("Respond with an array of comments for a given article_id with the correct properties", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments.length).toBe(11);
        body.comments.forEach((eachComment) => {
          expect(eachComment).toMatchObject({
            comment_id: expect.any(Number),
            body: expect.any(String),
            votes: expect.any(Number),
            author: expect.any(String),
            article_id: expect.any(Number),
            created_at: expect.any(String),
          });
        });
      });
  });
  test("Respond 400: Not Found, when given a non-existent article_id", () => {
    return request(app)
      .get("/api/articles/not-a-number/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("Respond with 200 and empty array when article_id exists but has no comments", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toEqual([]);
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("Respond with the posted comment", () => {
    const newComment = {
      username: "butter_bridge",
      body: "this is new comment",
    };
    return request(app)
      .post("/api/articles/5/comments")
      .send(newComment)
      .expect(201)
      .then((response) => {
        expect(response.body.addedComment).toMatchObject({
          article_id: 5,
          comment_id: 19,
          author: "butter_bridge",
          body: "this is new comment",
          created_at: expect.any(String),
          votes: 0,
        });
      });
  });
  test("Respond with 400: Bad Request when given an object with a missing property", () => {
    return request(app)
      .post("/api/articles/7/comments")
      .send({
        body: "this is new comment",
      })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
  test("Respond 400: Bad Request when username property is missing", () => {
    return request(app)
      .post("/api/articles/7/comments")
      .send({
        body: "this is new comment",
      })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
  test("Respond with 400: Bad Request when given an invalid article_id", () => {
    return request(app)
      .post("/api/articles/invalid_id/comments")
      .send({
        author: "butter_bridge",
        body: "this is new comment",
      })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });
  test("Respond with 404: Not Found when article_id does not exist", () => {
    const newComment = {
      username: "butter_bridge",
      body: "this is new comment",
    };
    return request(app)
      .post("/api/articles/9999/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("Respond with 200 and and the updated article", () => {
    return request(app)
      .patch("/api/articles/7")
      .send({ inc_votes: 3 })
      .expect(200)
      .then(({ body }) => {
        expect(body.newlyUpdated).toMatchObject({
          article_id: 7,
          title: "Z",
          topic: "mitch",
          author: "icellusedkars",
          body: "I was hungry.",
          created_at: expect.any(String),
          votes: 3,
          article_img_url: expect.any(String),
        });
      });
  });
  test("Respond 400 : Bad Request when given an invalid article_id", () => {
    return request(app)
      .patch("/api/articles/string")
      .send({ inc_votes: 7 })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("Respond 404 : Not Found when given an non-existent article_id", () => {
    return request(app)
      .patch("/api/articles/1111111")
      .send({ inc_votes: 9 })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
  test("Respond with 400: Bad Request when given an empty object", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({})
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("Responds with 204 and no content", () => {
    return request(app).delete("/api/comments/8").expect(204);
  });
  test("Respond with 400: Bad Request when given an invalid comment_id", () => {
    return request(app)
      .delete("/api/comments/invalid")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("Respond 404: Not Found when given a comment_id that does not exist", () => {
    return request(app)
      .delete("/api/comments/757575")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});

describe("GET /api/user", () => {
  test("Respond with an array of user objects with the correct properties", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.users.length).toBe(4);
        body.users.forEach((eachUser) => {
          expect(eachUser).toMatchObject({
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String),
          });
        });
      });
  });
});
