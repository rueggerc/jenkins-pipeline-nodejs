"use strict";
const assert = require('chai').assert;
const expect = require('chai').expect;
const index = require("../src/index");

const sinon = require("sinon");
const testDBUtils = require("./testDBUtils");
const dbutils = require("../src/dbutils");
const serviceClient = require("../src/serviceClient");

let sandbox = null;
describe("Test Handler", function() {
    this.timeout(10000);

    before(async function() {
        let parms = {
            sensorID: "Sensor1"
        };
        return await testDBUtils.executeSQL(setupData,parms);
    });
    after(async function() {
        let parms = {
            sensorID: "Sensor1"
        };
        return await testDBUtils.executeSQL(cleanupData,parms);
       
    });

    beforeEach(function() {
        console.log("=== BEFORE EACH =====");
        sandbox = sinon.createSandbox();
        // sandbox.stub(dbutils, 'doDatabaseStuff').callsFake((dbConfig) => {
        //     console.log("Invoking: doDatabaseStuff STUB");
        // });
        sandbox.stub(serviceClient, 'getSensorData').callsFake((parms) => {
            console.log("Invoking: Service Client Get Sensor Data STUB!");
            return {
                statusCode: 200,
                body: 'Fake Sensor Data'
            }
        });
    });
    
    afterEach(function() {
        console.log("=== AFTER EACH =====");
        sandbox.restore();
    });

    it("Handler Test 1", (done) => {
        let event = {
            name: 'Fred'
        }
        index.handler(event,null,null)
          .then(function(response) {
            console.log("Response=\n" + JSON.stringify(response,null,2));
            assert.equal(response.statusCode,200);
        }).finally(done);
    });

});


async function cleanupData(db,parms) {
    console.log("==== CLEANUP DB DATA===");
    try {
        // Query
        let dbQuery = `
          DELETE FROM dht22_readings
          WHERE sensor_id = '${parms.sensorID}' `;
        return await db.query(dbQuery);
    } catch (err) {
        console.log("ERROR=" + err);
        throw new Error(err);
    } 
}

async function setupData(db,parms) {
    try {
        console.log("==== SETUP DB DATA===");
        let notes = "Notes";
        let reading_time = null;
        let temperature = 78.33;
        let humidity = 81.99;

        // Query
        let dbQuery = `
          insert into dht22_readings
          (sensor_id, notes, reading_time, temperature, humidity)
          values ('${parms.sensorID}', '${notes}', ${reading_time}, ${temperature}, ${humidity})`;
       return await db.query(dbQuery);
    } catch (err) {
        console.log("ERROR=" + err);
        throw new Error(err);
    } 
}

