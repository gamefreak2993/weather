const yargs = require("yargs"),
    axios = require("axios");

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

const googleAPIkey = "AIzaSyB04ny0w98CWvkRAs8v8SotbrgEzQo2WaE",
    googleAPIurl = "https://maps.googleapis.com/maps/api/geocode/json";

axios.get(`${googleAPIurl}?address=${encodeURIComponent(argv.address)}&key=${googleAPIkey}`)
    .then((response) => {
        if (response.data.status === "ZERO_RESULTS") {
            throw new Error("Unable to find address!");
        }

        const lat = response.data.results[0].geometry.location.lat,
            lng = response.data.results[0].geometry.location.lng;

        const darkskyAPIkey = "1b270f973418655aaa055526924d2f40",
            darkskyAPIurl = "https://api.darksky.net/forecast",
            url = `${darkskyAPIurl}/${darkskyAPIkey}/${lat},${lng}?units=si`;

        console.log(response.data.results[0].formatted_address);

        return axios.get(url);
    })
    .then((response) => {
        const temp = response.data.currently.temperature,
            apparentTemp = response.data.currently.apparentTemperature;

        console.log(`It's currently ${temp} °C. It feels like ${apparentTemp} °C.`);
    })
    .catch((error) => {
        if (error.code === "ENOTFOUND") {
            console.log("Unable to connect to API servers.")
        } else {
            console.log(error.message);
        }
    });
