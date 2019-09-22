"use strict";
const assert = require('chai').assert;
const index = require("../src/index");
const sinon = require("sinon");
const serviceClient = require("../src/serviceClient");

// const requestPromise = sinon.stub().returns({ promise: () => Promise.resolve() });
const requestPromise = require('request-promise');

let sandbox = null;
describe("Test Service Client", function() {
    // this.timeout(60000);

    before(async function() {
        console.log("=== BEFORE.1 =====");
        let parms = {
            sensorID: "Sensor1"
        };
    });
    after(async function() {
        console.log("== AFTER.1 =====");
        let parms = {
            sensorID: "Sensor1"
        };   
    });

    beforeEach(function() {
        console.log("=== TestServiceClient BEFORE EACH =====");
        sandbox = sinon.createSandbox();
        sandbox.stub(requestPromise, 'Request').resolves({
            statusCode: 200,
            body: "Dummy Response"
        }); 
    });
    
    afterEach(function() {
        console.log("=== AFTER EACH =====");
        sandbox.restore();
    });

    it("Service Client Get Sensor Data", (done) => {
        // sandbox.stub(requestPromise, 'Request').resolves({
        //     statusCode: 200,
        //     body: "Dummy Response"
        // }); 
        // done();
        let parms = {
        };
        serviceClient.getSensorData(parms)
            .then(function(response) {
            console.log("Response=\n" + JSON.stringify(response,null,2));
            assert.equal(response.statusCode,200);
            assert.equal(response.body,'Dummy Response');
            console.log("Asserts Done");
        }).finally(done);
    });


});

