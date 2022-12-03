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
  it("Gets a list of cats", async function() {
    const resp = await request(app).get('/items');

    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({items: [testItem]});
  });
});

/** POST /items
 * 
 *      {name, price}
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
});