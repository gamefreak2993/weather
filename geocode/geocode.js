const request = require("request");

const googleAPIkey = "AIzaSyB04ny0w98CWvkRAs8v8SotbrgEzQo2WaE",
    googleAPIurl = "https://maps.googleapis.com/maps/api/geocode/json";

const geocodeAddress = (address, callback) => {
    request({
        url: `${googleAPIurl}?address=${encodeURIComponent(address)}&key=${googleAPIkey}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback("Unable to connect to Google servers.");
        } else if (body.status === "ZERO_RESULTS") {
            callback(`No results found for "${address}".`);
        } else if (body.status === "OK") {
            callback(undefined, {
                address: body.results[0].formatted_address,
                lat: body.results[0].geometry.location.lat,
                lng: body.results[0].geometry.location.lng
            });
        };
    });
}

module.exports = {
    geocodeAddress
}
