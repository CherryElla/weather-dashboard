let cityContainer = document.getElementById("currentweather")
let forecastContainer = document.getElementById("forecast")
let searchButton = document.getElementById("searchButton")
let userForm = document.getElementById("userForm");
let cityInput = document.getElementById("searchInput");
let citySearched = document.getElementById("citySearched")
let displayTemp = document.getElementById("displayTemp")
let baseUrl = "https://api.openweathermap.org/"
let forecastUrl = `${baseUrl}data/2.5/forecast`
let lookupUrl = `${baseUrl}geo/1.0/direct`
let weatherUrl = `${baseUrl}data/2.5/weather`

let apiKey = "2fc4046d938a7e59ca5625d34a4b85c4"

// Current Date Variable
let currentDate = moment().format("MMM Do YY");

// Function that takes the response and converts to json
function responseToJson(response) {
    console.log(response.status);
    if (response.status !== 200) {
    }
    return response.json();
}

// A function that capitilises the first letter of a string
function capitalFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}


async function getForecast (lat, lon) {
    let requestUrl = `${forecastUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`
    let response = await fetch(requestUrl)
    let data = responseToJson(response)
    // do something with the forecast6
}




async function citySubmitHandlerAsync (event) {
    event.preventDefault();
    let city = cityInput.value.trim();
    if (city) {
        let data = await getSearchAPIAsync(city);
        console.log('in submit')
        console.log(data);
        let cityWithCap = capitalFirstLetter(city)
        console.log(cityWithCap)
        console.log(typeof city)
        citySearched.textContent = cityWithCap + ":" + " " + currentDate
    }
}

async function getSearchAPIAsync(city) {
    let requestUrl = `${lookupUrl}?q=${city}&limit=1&appid=${apiKey}`;
    let response = await fetch(requestUrl);
    let data = responseToJson(response)
    console.log("async searched")
    return data
}


// Global Event Listeners
userForm.addEventListener("submit", citySubmitHandlerAsync)