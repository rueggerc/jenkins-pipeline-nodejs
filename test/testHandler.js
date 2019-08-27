"use strict";
const assert = require('chai').assert;
const expect = require('chai').expect;

// Environment Variables
process.env.DB_HOST = "localhost";
process.env.DB_USER = "chris";
process.env.DB_PASSWORD = "dakota";
process.env.DB_PORT = "5432";
process.env.DB_DATABASE = "rueggerllc";
const index = require("../src/index");

// Comments here
// Basic Test
// Another comment
describe("Test Handler", function() {
    this.timeout(10000);
    let context = {};

    before(function() {
    });

    before(function() {
    });

    it("Test Simple", async function() {
        let event = {
            name: 'Fred'
        }
        let response = await index.handler(event,null,null);
        console.log("Response=\n" + JSON.stringify(response,null,2));
        assert.equal(response.statusCode,200);
    });
});