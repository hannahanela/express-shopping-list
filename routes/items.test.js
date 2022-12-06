"use strict";

const request = require("supertest");

const app = require("../app");
let db = require("../fakeDb");

let testItem = { name: "chips", price: 1.25 };

beforeEach(function() {
  db.items.push({ ...testItem });
});

afterEach(function() {
  db.items.length = 0;
});

/** GET /items
 * 
 *  returns JSON:
 * 
 *  {items: [item, ...]}
 *      with item as: {name, price}
 * 
 */
describe("GET /items", function() {
  it("Gets a list of items", async function() {
    const resp = await request(app).get('/items');

    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({items: [testItem]});
  });
});

/** POST /items
 * 
 *  sends:
 * 
 *  {name, price}
 * 
 *  returns JSON:
 *      
 *  {added: {name, price}}
 * 
 */
describe("POST /items", function() {
  it("Creates a new item", async function() {
    const resp = await request(app)
      .post('/items', )
      .send({
        name: "soda",
        price: 0.75
      });

    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      "added": {
        name: "soda",
        price: 0.75
      }
    });
  });

  it("Responds with 400 if item is a duplicate", async function() {
    const resp = await request(app)
      .post('/items',)
      .send({
        name: "chips",
        price: 1.25
      });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body).toEqual({
      message: "Bad Request"
    });
  });

  // TODO: test missing required data
});

/** GET /items/:name
 * 
 *  returns JSON:
 *      {name, price}
 * 
 */
 describe("GET /items/:name", function() {
  it("Gets a single item", async function() {
    const resp = await request(app).get(`/items/${testItem.name}`);

    expect(resp.body).toEqual({
      name: "chips",
      price: 1.25
    })
  });

  it("Respondes with 404 if name invalid", async function() {
    const resp = await request(app).get('/items/candy');

    expect(resp.statusCode).toEqual(404);
    expect(resp.body).toEqual({
      error: {
        message: "No such item",
        status: 404
      }
    })
  })
 });

 /** PATCH /items/:name
 * 
 *  returns JSON:
 * 
 *  {updated: {name, price}}
 * 
 */
  describe("PATCH /items/:name", function() {
    it("Updates a single item", async function() {
      const resp = await request(app)
        .patch(`/items/${testItem.name}`)
        .send({
          name: "pickles",
          price: 1.25
        });

      expect(resp.body).toEqual({
        updated: {
          name: "pickles",
          price: 1.25
        }
      })
    });

    it("Responds with 404 if name invalid", async function() {
      const resp = await request(app)
        .patch('/items/candy')
        .send({
          name: "testFail",
          price: 0.00
        });

      expect(resp.statusCode).toEqual(404);
      expect(resp.body).toEqual({
        error: {
          message: "No such item",
          status: 404
        }
      })
    });
  });