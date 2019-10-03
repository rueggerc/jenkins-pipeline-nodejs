"use strict"

const dbutils = require('./dbutils');
const serviceClient = require('./serviceClient');

module.exports.handler = async function(event,context,callback) {
    try {
        console.log("Handler: BEGIN");

        console.log("Handler: Invoke doDatabaseStuff");
        await dbutils.doDatabaseStuff();

        console.log("Handler: Invoke Service Client");
        let parms = {};
        let serviceResponse = await serviceClient.getSensorData(parms);
        console.log("Got Response From Service:\n" + JSON.stringify(serviceResponse,null,2));

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
