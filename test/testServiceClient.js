"use strict";
const assert = require('chai').assert;
const index = require("../src/index");
const sinon = require("sinon");
const serviceClient = require("../src/serviceClient");

// let requestPromise = sinon.stub().returns({ promise: () => Promise.resolve() });

let sandbox = null;
// let requestPromise = null;

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
        // sandbox.stub(dbutils, 'doDatabaseStuff').callsFake((dbConfig) => {
        //     console.log("DO DATABASE STUFF STUB!");
        // });

        // sandbox.stub(request,'get').callsFake((options) => {
        //     console.log("STUB FOR REQUEST PROMISE");// 
        //     let response = {
        //         statusCode: 200,
        //         body: "This is False Information"
        //     };
        // });

        // sandbox.stub(requestPromise,'Constructor').callsFake((options) => {
        //     console.log("STUB FOR REQUEST PROMISE");
        //     let response = {
        //         statusCode: 200,
        //         body: "This is False Information"
        //     };
        // });
            
        // requestPromise = sandbox.stub().returns({ promise: () => Promise.resolve() });
    });
    
    afterEach(function() {
        console.log("=== AFTER EACH =====");
        sandbox.restore();
    });

    xit("Service Client Get Sensor Data", (done) => {
        let parms = {
        };
        done();
        // serviceClient.getSensorData(parms)
        //   .then(function(response) {
        //     console.log("Response=\n" + JSON.stringify(response,null,2));
        //     assert.equal(response.statusCode,200);
        // }).finally(done);
    });


});

