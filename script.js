let cityContainer = document.getElementById("currentweather")
let forecastContainer = document.getElementById("forecast")
let searchButton = document.getElementById("searchButton")
let userForm = document.getElementById("userForm");
let cityInput = document.getElementById("searchInput");
let citySearched = document.getElementById("citySearched")

let forecastUrl = "https://api.openweathermap.org/data/2.5/forecast"
let apiKey = "2fc4046d938a7e59ca5625d34a4b85c4"

let currentDate = moment().format("MMM Do YY");



