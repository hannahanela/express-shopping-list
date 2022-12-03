"use strict";

const express = require("express");

const { items } = require("../fakeDb");
const { NotFoundError } = require("../expressError");

const router = new express.Router();

/** GET /items: get a list of items
 * 
 *  returns JSON:
 * 
 *  {items: [item, ...]}
 *      with item as: {name, price}
 * 
 */
router.get('/', function(req, res, next) {
    return res.json({items: items});
});

/** POST /items: create a new item
 * 
 *  takes item:
 *      {name, price}
 * 
 *  returns JSON:
 *      {added: {name, price}}
 * 
 */
router.post('/', function(req, res, next) {
    let newItem = {};

    newItem.name = req.body.name;
    newItem.price = req.body.price;

    items.push(newItem);

    return res.status(201).json({added: newItem});
});

/** GET /items/:name: get a single item
 * 
 *  returns JSON:
 *      {name, price}
 * 
 */
router.get('/:name', function(req, res, next) {
    debugger;
    let item = items.find(i =>
        i.name === req.params.name
        );

    if (!item) {
        throw new NotFoundError("No such item");
    }

    return res.json(item);
});

/** PATCH /items/:name: update an item
 * 
 *  takes item:
 *      {name, price}
 * 
 *  returns JSON:
 *      {updated: {name, price}}
 * 
 */
router.patch('/:name', function(req, res, next) {
    let index;

    let item = items.find(function(i, idx){
        if (i.name === req.params.name) {
            index = idx;
            return i;
        }
    })

    if (!item) {
        throw new NotFoundError("No such item");
    }

    item.name = req.body.name;
    item.price = req.body.price;

    items[index] = item;

    return res.json({updated: item});
});

/** DELETE /items/:name: delete an item
 * 
 *  returns JSON:
 *      {message: "Deleted"}
 * 
 */
router.delete('/:name', function(req, res, next) {
    let index;

    let item = items.find(function(i, idx){
        if (i.name === req.params.name) {
            index = idx;
            return i;
        }
    })

    if (!item) {
        throw new NotFoundError("No such item");
    }

    items.splice(index, 1);

    return res.json({message: "Deleted"});
});

module.exports = router;