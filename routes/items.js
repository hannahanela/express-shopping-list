"use strict";

const express = require("express");

const { items } = require("../fakeDb");

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
    return res.json(items);
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

    return res.json({added: newItem});
});

/** GET /items/:name: get a single item
 * 
 *  returns JSON:
 *      {name, price}
 * 
 */
router.get('/:name', function(req, res, next) {
    let itemName = req.params.name;
    let foundItem;
    
    for (let item of items) {
        if (item.name === itemName) {
            foundItem = item;
        }
    }

    // TODO: error for item not found

    return res.json(foundItem);
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
    let itemName = req.params.name;
    let updatedItem;
    let index;

    for (let i = 0; i < items.length; i++) {
        if (items[i].name === itemName) {
            updatedItem = items[i];
            index = i;
        }
    }

    updatedItem.name = req.body.name;
    updatedItem.price = req.body.price;

    items[index] = updatedItem;

    // TODO: error messages

    return res.json({updated: updatedItem});
});

module.exports = router;