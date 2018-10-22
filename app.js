const yargs = require("yargs"),
    geocode = require("./geocode/geocode.js"),
    weather = require("./weather/weather.js");

const argv = yargs
    .options({
        address: {
            demand: true,
            alias: "a",
            describe: "Address to fetch weather for.",
            string: true
        }
    })
    .help()
    .alias("help", "h")
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage, result) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        weather.getWeather(result.lat, result.lng, (errorMessage, result) => {
            if (errorMessage) {
                console.log(errorMessage)
            } else {
                console.log(`It's currently ${result.temp} °C. It feels like ${result.apparentTemp} °C`);
            }
        });
    }
});
