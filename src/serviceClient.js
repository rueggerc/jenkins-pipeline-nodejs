"use strict";

const requestPromise = require('request-promise');

module.exports.getSensorData = async function(parms) {
    let response = {};
    let endpoint = null;
    try {
        endpoint = buildGetURL(parms);
        var options = {
            method: 'GET',
            uri: endpoint,
            json: false,
            resolveWithFullResponse: true
        };
        console.log(`serviceClient.getSensorData connecting to Service at: ${endpoint}`);
        let serviceResponse = await requestPromise(options);
        console.log("serviceClient.getSensorData Got Response=\n" + JSON.stringify(serviceResponse,null,2));
        response.statusCode = serviceResponse.statusCode;
        response.body = serviceResponse.body;
    } catch (err) {
        let msg = `Service Client Error ${endpoint}`;
        response.statusCode = 500;
    }

    // Done
    return response;
}


module.exports.setSensorData = async function(parms) {
    let response = {};
    let endpoint = null;
    try {
        endpoint = buildSetURL(parms);
        let payload = {};
        var options = {
            method: 'POST',
            uri: endpoint,
            body: payload,
            json: true,
            resolveWithFullResponse: true
        };
        console.log(`serviceClient.setSensorData connecting to Service at: ${endpoint}`);
        let serviceResponse = await requestPromise(options);
        console.log("serviceClient.setSensorData Got Response=\n" + JSON.stringify(serviceResponse,null,2));
        response.statusCode = serviceResponse.statusCode;
    } catch (err) {
        let msg = `Service Client Error ${endpoint}`;
        response.statusCode = 500;
    }

    // Done
    return response;
}

function buildGetURL(parms) {
    return "http://localhost:3000/sensor/pi/sensor1/readings";
}

function buildSetURL(parms) {
    return " http://localhost:3000/sensor/pi/sensor1/78.33/91.03/readings";
}