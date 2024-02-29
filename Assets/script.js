
var currentDate = dayjs().format('dddd, MMMM D, YYYY, h:mm a');
var displayDate = document.querySelector('currentDate');
var currentTime = dayjs().hour();

var todaysWeather = document.querySelector('#todaysWeather')
var futureWeather = document.querySelector('#futureWeather')

var clearButton = document.querySelector('#erase-history')
var cityResults = document.querySelector('#cityResults')
var citySearch = document.querySelector('#citySearch')
var cityInputEl = document.querySelector('#city-input')
var cityHistoryEl = document.querySelector('#cityHistory')
var eraseHistory = document.querySelector('#erase-history')


var searchHistory = JSON.parse(localStorage.getItem("city")) || []



// sets time into dashboard header area
console.log(currentTime)
$('#currentDate').html(currentDate)



var APIKey = "98d710491c449ad5a6ba81a14f1ff914"


function weatherDashboard(event) {
    event.preventDefault();

    var cityName = cityInputEl.value;

    currentweather(cityName);
}

// obtains the current weather for a city
function currentweather(cityName) {

    var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`;
    console.trace(cityName)
    fetch(queryURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (currentData) {
            console.log(currentData);
            var currentForecast = `http://api.openweathermap.org/data/2.5/forecast?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&appid=${APIKey}`
            fetch(currentForecast)
                .then(function (response) {
                    return response.json();
                })
                .then(function (fiveDayForecast) {
                    if (!searchHistory.includes(currentData.name)) {
                        searchHistory.push(currentData.name)
                        localStorage.setItem("city", JSON.stringify(searchHistory));
                    }
                    showCity();
                    console.log(fiveDayForecast);
                    todaysWeather.innerHTML = `<ul>
                    <li class="title">${currentData.name} /<span> ${moment(
                        currentData.dt,
                        "X"
                    ).format(" MM/DD/YYYY")} </span></li>
                    <li><img src ="http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png" /></li>
                    <li>Temp: ${currentData.main.temp}</li>
                    <li>Wind: ${currentData.wind.speed}</li>
                    <li>Humidity: ${currentData.main.humidity}</li>
                </ul>`;
                    var cards = "";
                    for (var i = 1; i < 6; i++) {
                        var forecastIndex = i * 8 - 1
                        cards = cards + `<ul class="col-2 col-xl-2 day">
                        <li>${moment(fiveDayForecast.list[forecastIndex].dt, "X").format(" MM/DD/YYYY")}</li>
                        <li><img src ="http://openweathermap.org/img/wn/${fiveDayForecast.list[forecastIndex].weather[0].icon}@2x.png" /></li>
                        <li>Temp: ${fiveDayForecast.list[forecastIndex].main.temp}</li>
                        <li>Wind: ${fiveDayForecast.list[forecastIndex].wind_speed}</li>
                        <li>Humidity: ${fiveDayForecast.list[forecastIndex].humidity}</li>
                    </ul>`;
                    }

                    futureWeather.innerHTML = cards;
                })
        })
}



function showCity() {
    if (localStorage.getItem("city")) {
        searchHistory = JSON.parse(localStorage.getItem("city"));
    }
    var cityList = ""
    for (var i = 0; i < searchHistory.length; i++) {
        cityList =
            // must be backticks not single quotes
            cityList + `<button class="btn btn-secondary my-2" type="submit">${searchHistory[i]}</button>`
    }
    cityResults.innerHTML = cityList;
    var dashTwo = cityResults.querySelectorAll("button")
    for (var i = 0; i < dashTwo.length; i++) {
        dashTwo[i].addEventListener("click", function () {
            currentweather(this.textContent);
        });
    }

}
showCity()

citySearch.addEventListener("submit", weatherDashboard)


function clearHistory() {
    localStorage.clear();
    cityResults.innerHTML = "";
    searchHistory = [];
}
eraseHistory.addEventListener("click", function () {
    clearHistory();
});