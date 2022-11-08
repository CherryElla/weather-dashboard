let cityContainer = document.getElementById("currentweather")
let forecastContainer = document.getElementById("forecast")
let searchButton = document.getElementById("searchButton")
let userForm = document.getElementById("userForm");
let cityInput = document.getElementById("searchInput");
let citySearched = document.getElementById("citySearched")
let displayTemp = document.getElementById("displayTemp")

let forecastUrl = "https://api.openweathermap.org/data/2.5/forecast"

let apiKey = "2fc4046d938a7e59ca5625d34a4b85c4"

// Current Date Variable
let currentDate = moment().format("MMM Do YY");


function createForecastURL (lat, lon) {
    let forecastUrl = `${mainUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`

}

function citySubmitHandler (event) {
    event.preventDefault();
    let city = cityInput.value.trim();
    if (city) {
        getSearchAPI(city);
        let cityWithCap = capitalFirstLetter(city)
        console.log(cityWithCap)
        console.log(typeof city)
        citySearched.textContent = cityWithCap + " " + currentDate
    }
}

function capitalFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}



function getSearchAPI (city) {
    let apiCallUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    fetch(apiCallUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        console.log(data)
        
        
    });
}


searchButton.addEventListener("click", getSearchAPI);
userForm.addEventListener("submit", citySubmitHandler)