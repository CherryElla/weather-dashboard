let cityContainer = document.getElementById("currentweather")
let forecastContainer = document.getElementById("forecast")
let searchButton = document.getElementById("searchButton")
let userForm = document.getElementById("userForm");
let cityInput = document.getElementById("searchInput");
let citySearched = document.getElementById("citySearched")

let forecastUrl = "https://api.openweathermap.org/data/2.5/forecast"
let apiKey = "2fc4046d938a7e59ca5625d34a4b85c4"

let currentDate = moment().format("MMM Do YY");


// Function that 
function createForecastURL (lat, lon) {
    let url = `${mainUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`
}

function citySubmitHandler (event) {
    event.preventDefault();
    let city = cityInput.value.trim();
    if (city) {
        getSearchAPI(city);
        console.log(city)
    }
}





function getSearchAPI (city) {
    let apiCallUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    fetch(apiCallUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        displayCurrentCity(data.items)
    });
}

function displayCurrentCity (cities, cityText) {
    citySearched.textContent = cityText
    for (let i = 0; i < cities.length; i++) {
        let cityAndDate = cities[i].name + " " + currentDate;
        let 
    }
}

searchButton.addEventListener("click", getSearchAPI);
userForm.addEventListener("submit", citySubmitHandler)