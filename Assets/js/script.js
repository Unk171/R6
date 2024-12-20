const date = document.getElementById("date");
const weekday = document.getElementById("weekday");
const city = document.getElementById("city");
const search = document.getElementById("search");
const place = document.getElementById("place");
const curTemp = document.getElementById("curTemp");
const curHumidity = document.getElementById("curHumidity");
const curWind = document.getElementById("curWind");
const feels = document.getElementById("feels");
const iconNow = document.getElementById("iconNow");
const forecastEl = document.getElementById("forecast");
const historyEl = document.getElementById("historyEl");
let citySearch;

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

function historyUpdate() {
    const history = JSON.parse(localStorage.getItem("history")) || [];
    if (!history.includes(citySearch) && citySearch) {
        history.unshift(citySearch);
        if (history.length > 10) history.pop();
        localStorage.setItem("history", JSON.stringify(history));
    };
    historyEl.innerHTML = "";
    if (history) {
        for (let i = 0; i < history.length; i++) {
            const historyButton = document.createElement("button");
            historyButton.textContent = history[i];
            historyButton.classList.add("col", "s12", "btn", "blue", "darken-2", "waves-effect", "waves-light", "z-depth-5");
            historyButton.addEventListener("click", () => {
                citySearch = historyButton.textContent;
                forecast()
            });
            historyEl.appendChild(historyButton);
        }
    }
};

function forecast() {
    forecastEl.style.visibility = "visible";
    if (city.value) citySearch = city.value;
    historyUpdate();

    let weatherForecastUrl = `http://api.weatherapi.com/v1/forecast.json?key=e06e2419614d4cd0a3b23048241812&days=5&q=${citySearch}`
    city.value = "";
    fetch(weatherForecastUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            place.textContent = data.location.name;
            curTemp.textContent = `Temp: ${data.current.temp_f}°F / ${data.current.temp_c}°C`;
            feels.textContent = `Feels like ${data.current.feelslike_f}°F / ${data.current.feelslike_c}°C`
            curHumidity.textContent = `Humidity: ${data.current.humidity}%`;
            curWind.textContent = `Wind: ${data.current.wind_mph} mph`;
            iconNow.style.backgroundImage = `url(http:${data.current.condition.icon})`
            for (let i = 0; i < 4; i++) {
                const date = document.getElementById(`forDate${i}`)
                const icon = document.getElementById(`icon${i}`);
                const maxTemp = document.getElementById(`maxTemp${i}`);
                const minTemp = document.getElementById(`minTemp${i}`);
                const rain = document.getElementById(`rain${i}`);
                const snow = document.getElementById(`snow${i}`);
                icon.style.backgroundImage = `url(http:${data.forecast.forecastday[i].day.condition.icon})`
                date.textContent = data.forecast.forecastday[i].date
                maxTemp.textContent = `Max Temp: ${data.forecast.forecastday[i].day.maxtemp_f}°F / ${data.forecast.forecastday[i].day.maxtemp_c}°C`;
                minTemp.textContent = `Min Temp: ${data.forecast.forecastday[i].day.mintemp_f}°F / ${data.forecast.forecastday[i].day.mintemp_c}°C`;
                rain.textContent = `Chance of rain: ${data.forecast.forecastday[i].day.daily_chance_of_rain}%`;
                snow.textContent = `Chance of snow: ${data.forecast.forecastday[i].day.daily_chance_of_snow}%`;
            }
        });
}

historyUpdate();
search.addEventListener("click", forecast)
