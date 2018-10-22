const request = require("request");

const darkskyAPIkey = "1b270f973418655aaa055526924d2f40",
darkskyAPIurl = "https://api.darksky.net/forecast";

const getWeather = (lat, lng, callback) => {
    request({
        url: `${darkskyAPIurl}/${darkskyAPIkey}/51.8957845,-1.1516252?units=si`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temp: body.currently.temperature,
                apparentTemp: body.currently.apparentTemperature
            });
        } else {
            callback("Unable to fetch weather.");
        }
    });
};

module.exports = {
    getWeather
}
