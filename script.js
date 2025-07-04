let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let currentDate = document.querySelector("#current-date");
let date = new Date();
let day = days[date.getDay()];
let hours = date.getHours();
let minutes = date.getMinutes();
if (minutes.toString().length < 2) {
  currentDate.innerHTML = day + " " + hours + ":0" + minutes;
} else {
  currentDate.innerHTML = day + " " + hours + ":" + minutes;
}

function changeCurrentCity(event) {
  event.preventDefault();
  let input1 = document.querySelector("#city-input");
  let input = input1.value.toLowerCase();
  console.log(input);
  let result = input.charAt(0).toUpperCase() + input.slice(1);
  console.log(result);
  let apiKey = "14b3e71od6df40977d863a00tdaeb6ef";
  let apiURL =
    "https://api.shecodes.io/weather/v1/current?query=" +
    result +
    "&key=" +
    apiKey;
  axios.get(apiURL).then(changeInfo);
}

function defaultCity(city) {
  let apiKey = "14b3e71od6df40977d863a00tdaeb6ef";
  let apiURL =
    "https://api.shecodes.io/weather/v1/current?query=" +
    city +
    "&key=" +
    apiKey;
  axios.get(apiURL).then(changeInfo);
}

function changeInfo(response) {
  console.log(response.data);
  let city = document.querySelector("#current-city");
  city.innerHTML = response.data.city;
  let temperature = document.querySelector("#deg");
  temperature.innerHTML = Math.round(response.data.temperature.current);
  let feels_like = document.querySelector("#feelsLike");
  feels_like.innerHTML =
    "Feels Like: " + Math.round(response.data.temperature.feels_like) + "°C";
  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = "Pressure: " + response.data.temperature.pressure;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = "Humidity: " + response.data.temperature.humidity + "%";
  let wind_speed = document.querySelector("#windSpeed");
  wind_speed.innerHTML = "Wind Speed: " + response.data.wind.speed + " mph";
  let weather_text = document.querySelector("#weatherText");
  weather_text.innerHTML = response.data.condition.description;

  let icon_url = document.querySelector("#currentWeatherEmoji");
  icon_url.innerHTML =
    "<img src=" +
    response.data.condition.icon_url +
    ' class="weather-app-icon" />';

  getForecast(response.data.city);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "14b3e71od6df40977d863a00tdaeb6ef";
  let apiUrl =
    "https://api.shecodes.io/weather/v1/forecast?query=" +
    city +
    "&key=" +
    apiKey;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
        <div class="card day">
          <div class="row days date">${formatDay(day.time)}</div>
          <div class="row days"><img src=${day.condition.icon_url} /></div>
          <div class="row">
            <div class="col days"><strong>${Math.round(
              day.temperature.maximum
            )}°</strong> ${Math.round(day.temperature.minimum)}°</div>
          </div>
        </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
defaultCity("Toronto");
let searchButton = document.querySelector("#city-search-form");
searchButton.addEventListener("submit", changeCurrentCity);
