"use strict";
const assert = require('chai').assert;
const expect = require('chai').expect;

// Environment Variables
// process.env.DB_HOST = "localhost";
process.env.DB_HOST = "dbhost";
process.env.DB_USER = "testuser";
process.env.DB_PASSWORD = "testpwd";
process.env.DB_PORT = "5432";
process.env.DB_DATABASE = "itdb";
const index = require("../src/index");

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