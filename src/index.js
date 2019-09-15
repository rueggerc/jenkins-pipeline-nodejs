"use strict"

const dbutils = require('./dbutils');

module.exports.handler = async function(event,context,callback) {
    try {
        console.log("Hello From Handler");
        await dbutils.doDatabaseStuff();

        let response = {
            statusCode: 200,
            body: `Here is Reply Message Hello Message from Lambda ${event.name}!`
        };
        return response;
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