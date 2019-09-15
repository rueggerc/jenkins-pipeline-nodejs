"use strict";
const assert = require('chai').assert;
const expect = require('chai').expect;
const index = require("../src/index");


describe("Test Handler", function() {
    it("Test Simple", async function() {
        let event = {
            name: 'Fred'
        }
        index.handler(event,null,null)
          .then(function(response) {
            console.log("Response=\n" + JSON.stringify(response,null,2));
            assert.equal(response.statusCode,200);
        });
    });
});