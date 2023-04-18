 var apiKey = 'e453b657439ab759f676b00e45336611';



 var searchForm = document.querySelector('#search-form');
 var searchInput = document.querySelector('#search-input');
 var todayWeather = document.querySelector('#today');
 var forecastWeather = document.querySelector('#forecast-weather');
 var searchHistory = [];

 var storedSearchHistory = JSON.parse(localStorage.getItem('searchHistory')); // new variable to retreive the search item from the local storage and turn it to an object.
if (storedSearchHistory !== null) { // if the local storage is not null then it assigns any data to searchHistory
  searchHistory = storedSearchHistory; // if user has been on page before it will retreive the search history
}

 searchForm.addEventListener('submit', function(event) { // adding event listener for when the submit button is clicked from html
    event.preventDefault(); // page was flashing and refreshing so this stops it
    var searchText = searchInput.value; // new variable which holds the value of searchInput
    currlocation(searchText) // function called currLocation takes the search text input as its value
        .then(function(weatherData) { // if currlocation is fulfilled the function takes the data and passes it to a new function called display weatherData
        displayWeather(weatherData); // this will display the weather on the page
        getForecast(weatherData.name); // this will display the forecast
        searchHistory.push(searchText); // add the search text to the searchHistory array
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory)); // save the searchHistory array to local storage as a string
        showSearchHistory(); // update the search history list on the page
    
    
    })
 })

 function currlocation(searchText){ // this function is to get the weather before displaying it
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchText + '&appid=' + apiKey + '&dt=' + moment().unix();; // new variable that makes a call to the website for informaiton by combining url with the api key. I added moment().unix() to make sure that the displayed weather is current.
    return fetch(url) // returning a promise that will run when the url is fetched
    .then(function(response) { // takes the response of fetch as its argument and the function is called when the promise is fulfilled
        return response.json(); // this will be returned only when the fetch method is fulfilled
 })
}

// function displayWeather(weatherData) { 
//     var Celsius = weatherData.main.temp - 273.15; 
//     todayWeather.innerHTML = 'Current temperature: ' + Celsius.toFixed(1) + ' °C' +'<br>' + 
//                                 'Wind Speed: ' + weatherData.wind.speed + 'kph' + '<br>' +
//                                 'Humidity: ' + weatherData.main.humidity + '%'; // 
  

// }

function displayWeather(weatherData) { // new function with the parameter of weatherData with the purpose of updating the html elements with data from the api
    var Celsius = weatherData.main.temp - 273.15; // convert the temp from kelvin to celsius by subtracting 273.15 from the main temp
    document.getElementById("weather-location").innerHTML = weatherData.name; // I have added the html element weather-location which this line calls and displays the location name using name and weatherData
    document.getElementById("weather-date").innerHTML = moment().format("ddd, D MMM YYYY, h:mm A"); // added a html element called weather-date to display the date using moment.js
    document.getElementById("weather-temperature").innerHTML = "Temperature: " + Celsius.toFixed(1) + " °C";// new html element added for the weather-temperature and calculated celcius to display current temp to one decimal place
    document.getElementById("weather-wind").innerHTML = "Wind Speed: " + weatherData.wind.speed + " kph"; // new html element called weather-wind which gets its informaiton from weatherData that is called via currLocation
    document.getElementById("weather-humidity").innerHTML = "Humidity: " + weatherData.main.humidity + " %";// new html element called weather-humidity which gets its information from weatherData that is called via currLocation
  
    
}

function showSearchHistory() {
    var searchHistoryList = document.getElementById('search-history'); // i added a html id element called search-history
    searchHistoryList.innerHTML = ''; // clears the search history list by setting the innerhtml to empty string
    for (var i = 0; i < searchHistory.length; i++) { // for loop to create a new list item from searchHistory
      var li = document.createElement('li'); // creates new list 
      li.textContent = searchHistory[i]; // assigns the search history text to textContent
      searchHistoryList.appendChild(li); // add the search history item to the list using appendchild
    }
  }
  
  // call the showSearchHistory function to display the search history list on page load
  showSearchHistory();

// currently the only part displaying on my page is the humidity so I need to edit this function // fixed by altering the layout of todayWeather.innerHTML

  function getForecast(cityName) { // new function which will be used to hold the forecast data
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;
  
    fetch(forecastUrl) // making a request to fetch the data from the url provided in forecastUrl
      .then(function(response) {
        return response.json(); // turns the response into an object from a string via json
      })
      .then(function(data) { // data from the called api is then passed through a .then method 
        // the forecast is showing every 3 hours rather than one a day so I selected 12pm for the forecast time 
        var forecasts = [];  // creates an empty array
        for (let i = 0; i < data.list.length; i++) { //  loops through each item in data.list
          var forecast = data.list[i]; // takes the forecast data and assings it to new variable called forecast
          var time = forecast.dt_txt.split(' ')[1]; // extracts the time from the forecast data by splitting the dt (date.time) and txt property
          if (time === '12:00:00') { // if time is 12pm in the open weather map api then push the forecast
            forecasts.push(forecast);
          }
        }
        var forecastContainer = document.createElement('div'); // Create a new div element to hold the forecast items
        forecastContainer.style.display = "flex"; // sets the display property of the container to flex
        forecastContainer.style.flexDirection = "row"; // sets the flex direction to row so that the child elements are displayed horizontally
        forecastContainer.style.overflowX = "auto"; // adds horizontal scrolling to the container in case the child elements exceed the width of the container
        
    
          for (var i = 0; i < forecasts.length; i++) {// Loop through the list of forecasts 
            var forecastData = forecasts[i];
  
        var forecastItem = document.createElement('div'); // Create a new div element and assigning it to forecastItem 
          // Create new HTML elements to display the date and time of the forecast
          var forecastDate = document.createElement('div');// Create a new div element for the date and assigning it to forecasDate 
          forecastDate.innerHTML = moment.unix(forecastData.dt).format('ddd, MMM D'); // now a new div has been created this line fills it with information by converting the unix timestamp to a js date object in the given format.
          

          var forecastTime = document.createElement('div');// Create a new div element for the time and assigning it to forecastTime
          forecastTime.innerHTML = moment.unix(forecastData.dt).format('h:mm A'); // the same code as above is used but the format is for a time rather than date
  
          // Create a new HTML element to display the forecast temperature
          var forecastTemp = document.createElement('div');// Create a new div element for the temp and assigning it to forecastTemp
        //   console.log("Temperature: " + forecastData.main.temp); // i was trying to convert the temp from kelvin to celsius but it appears to already be in c
          forecastTemp.innerHTML = forecastData.main.temp.toFixed(1) + ' °C';
  
          // Create a new HTML element to display the forecast weather icon
          var forecastIcon = document.createElement('img');// Create a new div element for the weather icons and assigning it to forecastIcon
          
          //openweathermap.org/img/wn/10d@2x.png // url from openweathermap.org
          forecastIcon.src = `http://openweathermap.org/img/wn/${forecastData.weather[0].icon}.png`; // set the src img element for id element called forecastIcon created above. 
          //retrieving the icon property from the first element in the weather array, which is inside the forecastData object
  
          // appending these elements as the children of forecastItem which is the parent.
          forecastItem.appendChild(forecastDate);
          forecastItem.appendChild(forecastTime);
          forecastItem.appendChild(forecastTemp);
          forecastItem.appendChild(forecastIcon);
  
        forecastContainer.appendChild(forecastItem); // Add the forecast item to the forecast container
          
        //   forecastWeather.innerHTML = '';
          forecastWeather.appendChild(forecastContainer);// add the forecastItem element to the forecastWeather element
        }
      });
  }
  
  // forecast is currently displaying vertically not horizontally and I think this is to do with the new html elements created for each weather element.


