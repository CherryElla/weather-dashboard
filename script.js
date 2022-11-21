let cityContainer = document.getElementById("currentweather");
let todayContainer = document.getElementById("today");
let forecastBox0 = document.getElementById("forecastBox0");
let forecastBox1 = document.getElementById("forecastBox1");
let forecastBox2 = document.getElementById("forecastBox2");
let forecastBox3 = document.getElementById("forecastBox3");
let forecastBox4 = document.getElementById("forecastBox4");
let forecastBoxes = [
    forecastBox0,
    forecastBox1,
    forecastBox2,
    forecastBox3,
    forecastBox4,
];
let searchButton = document.getElementById("searchButton");
let userForm = document.getElementById("userForm");
let cityInput = document.getElementById("searchInput");
let citySearched = document.getElementById("citySearched");
let displayTemp = document.getElementById("displayTemp");
let forecastContainer = document.getElementById("forecastContainer")
let baseUrl = "https://api.openweathermap.org/";
let forecastUrl = `${baseUrl}data/2.5/forecast`;
let lookupUrl = `${baseUrl}geo/1.0/direct`;
let weatherUrl = `${baseUrl}data/2.5/weather`;

// API key from openweathermap API
let apiKey = "2fc4046d938a7e59ca5625d34a4b85c4";

// Current Date from moment.js
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

// A html div box builder function for forecast boxes
function forecastBoxBuilder (temp, humidity, wind, forecastBox, icon) {
    let tempBox = `<div><h3>Temperature: ${temp}℉</h3></div>`
    let humidityBox = `<div><h3>Humidity: ${humidity}%</h3></div>`
    let windBox = `<div><h3>Wind: ${wind}mph</h3></div>`
    $(forecastBox).html("")
    $(forecastBox).append(tempBox)
    $(forecastBox).append(humidityBox)
    $(forecastBox).append(windBox)
    $(forecastBox).append(icon)

}

// A display the 5 day forecast function
function displayForecast(forecastObj) {
    let weatherArray = forecastObj.list;
    for (let i = 0; i < forecastBoxes.length; i++) {
        let temp = weatherArray[i].main.temp;
        let humidity = weatherArray[i].main.humidity;
        let wind = weatherArray[i].wind.speed;
        let iconID = weatherArray[i].weather[0].icon;
        let icon = `<div style="text-align:center;"><img style="text-align:center; width:60px; height:auto;" 
        class="weatherIcon" src="http://openweathermap.org/img/w/${iconID}.png" 
        alt="Weather icon"/></div>`;
        console.log(iconID)
        let forecastBox = forecastBoxes[i];
        forecastBoxBuilder(temp, humidity, wind, forecastBox, icon)
        forecastContainer.style.visibility = "visible"
    }
}

// A function that displays today's weather
function dissplayTodayWeather(weatherObj) {
    let temp = weatherObj.main.temp;
    let humidity = weatherObj.main.humidity;
    let wind = weatherObj.wind.speed;
    let iconID = weatherObj.weather[0].icon;
    let icon = `<img style="padding-left: 10px; width:70px; height: auto;" 
    class="weatherIcon" src="http://openweathermap.org/img/w/${iconID}.png" 
    alt="Weather icon"/>`;
    console.log(iconID);
    todayContainer.textContent =
        "Temperature: " + temp + "℉" + " Humidity: " + humidity + "%" + " Wind: " + wind + "mph";
    $("#today").append(icon);
}

// A function that fetches a weather API URL
async function getMyWeather(urlEndpoint, lat, lon, units = "imperial") {
    let requestUrl = `${urlEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    let response = await fetch(requestUrl);
    let data = await responseToJson(response);
    console.log(data);
    return data;
}


//  A function that gets today's and the forecasts weather and stores the data
async function getAllWeather(lat, lon, units = "imperial") {
    let todayWeatherData = await getMyWeather(weatherUrl, lat, lon, units);
    let forecastData = await getMyWeather(forecastUrl, lat, lon, units);
    let result = {
        today: todayWeatherData,
        forecast: forecastData,
    };
    console.log(result);
    return result;
}

// Main function
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
        let forecastAndTodayObject = await getAllWeather(latitute, longitude);
        dissplayTodayWeather(forecastAndTodayObject.today);
        displayForecast(forecastAndTodayObject.forecast);
        let cityWithCap = capitalFirstLetter(city);
        console.log(cityWithCap);
        console.log(typeof city);
        citySearched.textContent = cityWithCap + ":" + " " + currentDate;
    }
}

// Function that requests/fetches data with the given city and returns city object
async function getSearchAPIAsync(city) {
    let requestUrl = `${lookupUrl}?q=${city}&limit=1&appid=${apiKey}`;
    let response = await fetch(requestUrl);
    let data = await responseToJson(response);
    console.log(data);
    return data[0];
}

// Global Event Listeners
userForm.addEventListener("submit", citySubmitHandlerAsync);
