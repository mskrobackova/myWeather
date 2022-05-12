let now = new Date();
let h2 = document.querySelector("h2");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h2.innerHTML = `${day} ${hours}:${minutes}`;

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;
  celsiusTemperature = response.data.main.temp;
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon1 = document.querySelector("#icon1");
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  icon1.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon1.setAttribute("alt", response.data.weather[0].description);
}
function search(city) {
  let apiKey = "89bde6acca90144869bd1ea9198ba1b2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function displayCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  search(city.value);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperature = document.querySelector("#currentTemp");
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}
let celsiusTemperature = null;

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#currentTemp");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

function displayForecast() {
  let futureForecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col-2">
              <div class="weather-forecast-date">${day}</div>
              <img
                id="icons"
                src="http://openweathermap.org/img/wn/10d@2x.png"
              />
              <div class="weather-forecast-max">12/<small class="weather-forecast-max">10</small>°C
            </div>
        </div>
    `;
  });
  forecastHTML = forecastHTML + `</div>`;
  futureForecast.innerHTML = forecastHTML;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", displayCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);
search("Amsterdam");
displayForecast();
