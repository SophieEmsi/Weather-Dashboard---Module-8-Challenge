 var apiKey = 'e453b657439ab759f676b00e45336611';

 var searchForm = document.querySelector('#search-form');
 var searchInput = document.querySelector('#search-input');
 var todayWeather = document.querySelector('#today');
 var forecastWeather = document.querySelector('#forecast');

 

 searchForm.addEventListener('submit', function(event) { // adding event listener for when the submit button is clicked from html
    event.preventDefault(); // page was flashing and refreshing so this stops it
    var searchText = searchInput.value; // new variable which holds the value of searchInput
    currlocation(searchText) // function called currLocation takes the search text input as its value
        .then(function(weatherData) { // if currlocation is fulfilled the function takes the data and passes it to a new function called display weatherData
        displayWeather(weatherData); // this will display the weather on the page

        })
 })

 function currlocation(searchText){ // this function is to get the weather before displaying it
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchText + '&appid=' + apiKey; // new variable that makes a call to the website for informaiton by combining url with the api key
    return fetch(url) // returning a promise that will run when the url is fetched
    .then(function(response) { // takes the response of fetch as its argument and the function is called when the promise is fulfilled
        return response.json(); // this will be returned only when the fetch method is fulfilled
 })
}

function displayWeather(weatherData) { // new function with the parameter of weatherData with the purpose of updating the html elements with data from the api
    todayWeather.innerHTML = 'Current temperature: ' + weatherData.main.temp; // 
    todayWeather.innerHTML = 'Wind Speed: ' + weatherData.wind.speed;
    todayWeather.innerHTML = 'Humidity: ' + weatherData.main.humidity;

}