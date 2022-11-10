let cityContainer = document.getElementById("currentweather");
let todayContainer = document.getElementById("today");
let todayContainer1 = document.getElementById("today1");
let todayContainer2 = document.getElementById("today2");
let forecastBox = document.getElementById("forecastBox")
let forecastList = document.getElementById("forecastList")
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

function displayForecast (temp, humidity, wind) {
    forecastBox.textContent = temp 
}

async function getForecast(lat, lon) {
    let requestUrl = `${forecastUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    let response = await fetch(requestUrl);
    let data = await responseToJson(response);
    console.log(data)
    // Forecast data object
    let forecastData = data.list[0]
    console.log(forecastData)
    let temp = forecastData.main.temp
    let humidity = forecastData.main.humidity
    let wind = forecastData.wind.speed
    console.log(temp)
    forecastList.textContent = "Temperature: " + temp + " Humidity: " + humidity + " Wind Speed: " + wind

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
        getForecast(latitute, longitude);
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
