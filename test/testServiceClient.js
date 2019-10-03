"use strict";
const assert = require('chai').assert;
const index = require("../src/index");
const sinon = require("sinon");
const serviceClient = require("../src/serviceClient");

// const requestPromise = sinon.stub().returns({ promise: () => Promise.resolve() });
const requestPromise = require('request-promise');

let sandbox = null;
describe("Test Service Client", function() {
    this.timeout(10000);

    before(async function() {
    });
    after(async function() {
    });

    beforeEach(function() {
        sandbox = sinon.createSandbox();
        sandbox.stub(requestPromise, 'Request').callsFake(() => {
            console.log("STUB For requestPromise.Request");
            return {
                statusCode: 200,
                body: 'STUB Response For Service Client'
            }
        });
        // sandbox.stub(requestPromise, 'Request').resolves({
        //     statusCode: 200,
        //     body: "STUB Response For Service Client"
        // }); 
    });
    
    afterEach(function() {
        sandbox.restore();
    });

    it("Service Client Get Sensor Data", (done) => {
        // sandbox.stub(requestPromise, 'Request').resolves({
        //     statusCode: 200,
        //     body: "Dummy Response"
        // }); 
        let parms = {
        };
        serviceClient.getSensorData(parms)
            .then(function(response) {
            console.log("Response=\n" + JSON.stringify(response,null,2));
            assert.equal(response.statusCode,200);
            assert.equal(response.body,'STUB Response For Service Client');
        }).finally(done);
    });

    it("Service Client Set Sensor Data", (done) => {
        // sandbox.stub(requestPromise, 'Request').resolves({
        //     statusCode: 200,
        //     body: "Dummy Response"
        // }); 
        let parms = {
        };
        serviceClient.setSensorData(parms)
            .then(function(response) {
            console.log("Response=\n" + JSON.stringify(response,null,2));
            assert.equal(response.statusCode,200);
        }).finally(done);
    });


});

