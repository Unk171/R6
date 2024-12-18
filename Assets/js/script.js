const date = document.getElementById("date");
const weekday = document.getElementById("weekday");
const city = document.getElementById("city");
const search = document.getElementById("search");
const place = document.getElementById("place");
const weatherImage = document.getElementById("weatherImage");
const curTemp = document.getElementById("curTemp");
const curHumidity = document.getElementById("curHumidity");
const curWind = document.getElementById("curWind");
const feels = document.getElementById("feels");

let weatherCurrentUrl = "http://api.weatherapi.com/v1/current.json?key=e06e2419614d4cd0a3b23048241812&q=philadelphia"
let weatherForecastUrl = "http://api.weatherapi.com/v1/forecast.json?key=e06e2419614d4cd0a3b23048241812&days=5&q=philadelphia"

const currentDate = new Date();
const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
}).format(currentDate);
const formattedWeekday = new Intl.DateTimeFormat("en-US", {
    weekday: "long"
}).format(currentDate);

date.textContent = formattedDate;
weekday.textContent = formattedWeekday;


fetch(weatherCurrentUrl)
.then(response => response.json())
.then(data => {
    console.log(data);
    place.textContent = data.location.name;
    weatherImage.setAttribute("src", "http:" + data.current.condition.icon);
    curTemp.textContent = `Temp: ${data.current.temp_f}°F / ${data.current.temp_c}°C`;
    feels.textContent = `Feels like ${data.current.feelslike_f}°F / ${data.current.feelslike_c}°C`
    curHumidity.textContent = `Humidity: ${data.current.humidity}%`;
    curWind.textContent = `Wind: ${data.current.wind_mph} mph`
});

fetch(weatherForecastUrl)
.then(response => response.json())
.then(data => {
        console.log(data)
})


