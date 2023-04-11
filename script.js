 var apiKey = 'e453b657439ab759f676b00e45336611';

 var searchForm = document.querySelector('#search-form');
 var searchInput = document.querySelector('#search-input');
 var todayWeather = document.querySelector('#today');
 var forecastWeather = document.querySelector('#forecast');

 function Currlocation(city){

 var URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

 console.log(city)
 }