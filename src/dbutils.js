"use strict";
const PostgresUno = require('postgres-uno');

module.exports.doDatabaseStuff = async function() {

    console.log("doDatabaseStuff Connect to Host=" + process.env.DB_HOST);
    let dbConfig = builddbConfig();
    let result = await getSensorData(dbConfig);
    let rows = result.rows;
    console.log("Sensor Data:");
    for (let i = 0; i < rows.length; i++) {
        let reading = rows[i];
        console.log(`Sensor Data: SensorID: ${reading.sensor_id} Temperature: ${reading.temperature} Humidity: ${reading.humidity} Time: ${reading.reading_time}`);
    }
    console.log("DO DATABASE STUFF END");
}

async function getSensorData(dbConfig) {
    let db = null;
    try {

        console.log("getSensorData from DB BEGIN");
        db = new PostgresUno();

        console.log("CONNECT TO DB BEGIN");
        await db.connect(dbConfig);
        console.log("CONNECT TO DB END");

        // Query
        let dbQuery = "select * from dht22_readings limit 10";
        return await db.query(dbQuery);

    } catch (err) {
        console.log("ERROR=" + err);
        throw new Error(err);
    } finally {
        await db.disconnect();
    }
}

function builddbConfig() {
    let db_host = process.env.DB_HOST || throwError("Not Set: DB_HOST");
    let db_user = process.env.DB_USER || throwError("Not Set: DB_USER");
    let db_password = process.env.DB_PASSWORD || throwError("Not Set: DB_PASSWORD");
    let db_port = process.env.DB_PORT || throwError("Not Set: DB_PORT");
    let db_database = process.env.DB_DATABASE || throwError("Not Set: DB_DATABASE");

    let dbConfig = {
        host: db_host,
        user: db_user,
        password: db_password,
        port: db_port,
        database: db_database
    };
    return dbConfig;

}

function throwError(msg) {
    throw new Error(msg);
}
