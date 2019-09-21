"use strict";

before(async function() {
    console.log("Test Setup");
    // process.env.DB_HOST = "dbhost";
    // process.env.DB_HOST = "localhost";
    process.env.DB_USER = "testuser";
    process.env.DB_PASSWORD = "testpwd";
    process.env.DB_PORT = "5432";
    process.env.DB_DATABASE = "itdb";

    // console.log("DB_HOST=" + process.env.DB_HOST);
    // const index = require("../src/index");

});