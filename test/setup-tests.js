"use strict";

before(async function() {
    console.log("Test Setup");
    console.log("DB_HOST=" + process.env.DB_HOST);
    process.env.DB_USER = "testuser";
    process.env.DB_PASSWORD = "testpwd";
    process.env.DB_PORT = "5432";
    process.env.DB_DATABASE = "itdb";
});