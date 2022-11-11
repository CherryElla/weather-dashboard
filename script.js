let cityContainer = document.getElementById("currentweather");
let todayContainer = document.getElementById("today");
let forecastBox0 = document.getElementById("forecastBox0");
let forecastBox1 = document.getElementById("forecastBox1");
let forecastBox2 = document.getElementById("forecastBox2");
let forecastBox3 = document.getElementById("forecastBox3");
let forecastBox4 = document.getElementById("forecastBox4");
let forecastBoxes = [forecastBox0, forecastBox1, forecastBox2, forecastBox3, forecastBox4]
// let forecastList = document.getElementById("forecastList");
let searchButton = document.getElementById("searchButton");
let userForm = document.getElementById("userForm");
let cityInput = document.getElementById("searchInput");
let citySearched = document.getElementById("citySearched");
let displayTemp = document.getElementById("displayTemp");
let baseUrl = "https://api.openweathermap.org/";
let forecastUrl = `${baseUrl}data/2.5/forecast`;
let lookupUrl = `${baseUrl}geo/1.0/direct`;
let weatherUrl = `${baseUrl}data/2.5/weather`;

let apiKey = "2fc4046d938a7e59ca5625d34a4b85c4";

// Current Date Variable
let currentDate = moment().format("MMM Do YY");

// Function that takes the response and converts to json
async function responseToJson(response) {
    console.log(response.status);
    if (response.status !== 200) {
    }
    return await response.json();
}

// A function that capitilises the first letter of a string
function capitalFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function forecastBoxIndex () {
    for (let i = 0; i < forecastBoxes.length; i++) {
        let boxIndexes = forecastBoxes[i]
    }
    console.log(boxIndexes)
    return boxIndexes
}

function displayForecast(weatherArray) {
    // let  =
    for (let i = 0; i < weatherArray.length; i ++) {
        let temp = weatherArray[i].main.temp;
        let humidity = weatherArray[i].main.humidity;
        let wind = weatherArray[i].wind.speed;
        console.log(temp)
        }
        // let forecastBoxIndex = forecastBoxIndex()

    // forecastBox.textContent =
    //     "Temperature " + temp + " Humidity " + humidity + " Wind " + wind;
}

// Function that displays today's weather
function dissplayTodayWeather(weatherObj) {
    let temp = weatherObj.main.temp;
    let humidity = weatherObj.main.humidity;
    let wind = weatherObj.wind.speed;
    todayContainer.textContent =
        "Temperature " + temp + " Humidity " + humidity + " Wind " + wind;
}

async function getForecast(lat, lon) {
    let requestUrl = `${forecastUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    let response = await fetch(requestUrl);
    let data = await responseToJson(response);
    console.log(data);
    // Forecast data object
    let todatWeatherData = data.list[0];
    console.log(todatWeatherData);
    // Forecast 5 day data objects
    let forecastData = [];
    for (let i = 1; i < 6; i++) {
        forecastData.push(data.list[i]);
    }
    console.log(forecastData);

    let result = {
        today: todatWeatherData,
        forecast: forecastData,
    };
    console.log(result)
    return result;
}

// Main function that takes city inputted and calls getSearchAPIAsync function
// returning the city object with data
// Also prints the city serached and date to the page
async function citySubmitHandlerAsync(event) {
    event.preventDefault();
    let city = cityInput.value.trim();
    if (city) {
        let cityObject = await getSearchAPIAsync(city);
        console.log("in submit");
        console.log(cityObject);
        let latitute = cityObject.lat;
        console.log(latitute);
        let longitude = cityObject.lon;
        console.log(longitude);
        // Calls the function getForecast, passing in lat and lon values
        // and returns the fetched data object
        let forecastAndTodayObject = await getForecast(latitute, longitude);
        dissplayTodayWeather(forecastAndTodayObject.today);
        displayForecast(forecastAndTodayObject.forecast);
        let cityWithCap = capitalFirstLetter(city);
        console.log(cityWithCap);
        console.log(typeof city);
        citySearched.textContent = cityWithCap + ":" + " " + currentDate;
    }
}

// Function that requests/fetches data with the given city URL and returns city object
// Also converts the data into json
async function getSearchAPIAsync(city) {
    let requestUrl = `${lookupUrl}?q=${city}&limit=1&appid=${apiKey}`;
    let response = await fetch(requestUrl);
    let data = await responseToJson(response);
    console.log(data);
    return data[0];
}

// Global Event Listeners
userForm.addEventListener("submit", citySubmitHandlerAsync);
