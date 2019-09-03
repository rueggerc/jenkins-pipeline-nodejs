"use strict";
const PostgresUno = require('postgres-uno');

module.exports.doDatabaseStuff = async function() {

    console.log("DO DATABASE STUFF BEGIN");
    let dbConfig = builddbConfig();
   
    let result = await getSensorData(dbConfig);
    let rows = result.rows;
    for (let i = 0; i < rows.length; i++) {
        let reading = rows[i];
        // console.log(JSON.stringify(reading));
        console.log(`Sensor: ${reading.sensor_id} Temperature: ${reading.temperature} Humidity: ${reading.humidity} Time: ${reading.reading_time}`);
    }

    console.log("DO DATABASE STUFF END");
}

async function getSensorData(dbConfig) {
    try {

        console.log("getSensorData BEGIN");
        let db = new PostgresUno();
        // console.log("DBConfig=\n" + JSON.stringify(dbConfig,null,2));

        console.log("CONNECT BEGIN");
        await db.connect(dbConfig);
        console.log("CONNECT END");

        // Query
        let dbQuery = "select * from dht22_readings limit 10";
        let result = await db.query(dbQuery);
        let rows = result.rows;
        // console.log(JSON.stringify(rows,null,2));

    
        // Disconnect
        await db.disconnect();

        return result;

    } catch (err) {
        console.log("ERROR=" + err);
        throw new Error(err);
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