"use strict";
const assert = require('chai').assert;
const expect = require('chai').expect;
const index = require("../src/index");

const sinon = require("sinon");
const PostgresUno = require('postgres-uno');
const dbutils = require("../src/dbutils");

let sandbox = null;
// beforeEach(function() {
//     console.log("=== BEFORE =====");
//     sandbox = sinon.createSandbox();
//     sinon.stub(dbutils, 'doDatabaseStuff').callsFake(() => {
//         console.log("DO DATABASE STUFF STUB!");
//     });

//     // sinon.stub(dbutils, 'getSensorData').callsFake(function(dbConfig) {
//     //     console.log("GET SENSOR DATA STUB!");
//     //     let result = {
//     //         rows: []
//     //     }
//     //     return result;
//     // });

//     // sinon.stub(dbutils, 'getSensorData').callsFake(function(dbConfig)  {
//     //     console.log("GET SENSOR DATA STUB");
//     // });

// });

// afterEach(function() {
//     console.log("=== AFTER =====");
//     sandbox.restore();
// });


before(async function() {
    console.log("=== BEFORE.1 =====");
    let parms = {
        sensorID: "Sensor1"
    };
    return await executeSQL(setupData,parms);
});
after(async function() {
    console.log("== AFTER.1 =====");
    let parms = {
        sensorID: "Sensor1"
    };
    return await executeSQL(cleanupData,parms);
   
});


describe("Test Handler", function() {

    beforeEach(function() {
        console.log("=== BEFORE EACH =====");
        sandbox = sinon.createSandbox();
        sandbox.stub(dbutils, 'doDatabaseStuff').callsFake((dbConfig) => {
            console.log("DO DATABASE STUFF STUB!");
        });
    
    });
    
    afterEach(function() {
        console.log("=== AFTER EACH =====");
        sandbox.restore();
    });



    it("Handler Test 1", function (done) {
        let event = {
            name: 'Fred'
        }
        index.handler(event,null,null)
          .then(function(response) {
            console.log("Response=\n" + JSON.stringify(response,null,2));
            assert.equal(response.statusCode,200);
            done();
        });
    });

    it("Handler Test 2", function(done) {
        let event = {
            name: 'Barney'
        }
        index.handler(event,null,null)
          .then(function(response) {
            console.log("Response=\n" + JSON.stringify(response,null,2));
            assert.equal(response.statusCode,200);
            done();
        });
    });
});

async function cleanupData(db,parms) {
    console.log("==== CLEANUP DATA===");
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
        console.log("==== SETUP DATA===");
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

async function executeSQL(sqlfunction,parms) {
    let db = null;
    try {
        db = new PostgresUno();
        let dbConfig = {
            host: "localhost",
            user: "testuser",
            password: "testpwd",
            port: 5432,
            database: "itdb"
        };
        await db.connect(dbConfig);

        // BEGIN
        await db.query("BEGIN");

        // Execute
        let result = await sqlfunction(db,parms);

        // Commit
        await db.query("COMMIT");

        // Done
        return result;

    } catch (err) {
        let msg = `ROLL BACK TRANSACTION: ${err.toString()}`;
        console.log("msg");
        await db.query("ROLLBACK");
        return msg;
    } finally {
        await db.disconnect();
    }
}