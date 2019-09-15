"use strict"

const dbutils = require('./dbutils');

module.exports.handler = async function(event,context,callback) {
    try {
        console.log("Hello From Handler");
        console.log("DB_TO_USE=" + process.env.DB_HOST);
        await dbutils.doDatabaseStuff();

        return {
            statusCode: 200,
            body: `Here is Reply Message Hello Message from Lambda ${event.name}!`
        };
    } catch (err) {
        console.log("ERROR:" + err);
        return buildErrorResponse();
    } 
}

function buildErrorResponse(err) {
    let response = {
        statusCode: 500,
        body: err
    };
    return response;
}
