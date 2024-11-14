const apiKey = '49c0f56e7438b2b449e09780173bb6b8';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiUrlForecast = 'https://api.openweathermap.org/data/2.5/forecast';
const apiUrlPollution = 'http://api.openweathermap.org/data/2.5/air_pollution';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const pressureElement = document.getElementById('pressure');
const windSpeedElement = document.getElementById('windSpeed');
const descriptionElement = document.getElementById('description');
const tempFeelsElement = document.getElementById('tempFeels');
const rainElement = document.getElementById('rain');
const snowElement = document.getElementById('snow');
const sunRiseElement = document.getElementById('sunRise');
const sunSetElement = document.getElementById('sunSet');
const iconElement = document.getElementById('icon');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        coords(location);
    }
});
function coords(location){
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            fetchWeather(location);
            fetchWeatherForecast(location);
            fetchWidget(data.id);
            location = [data.coord.lat, data.coord.lon];
            fetchAirPollution(location);
        })
        .catch(error => {
            alert("Can't find city");
        });
}
function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = `${data.name}, ${data.sys.country}`;
            descriptionElement.textContent = data.weather[0].description;
            temperatureElement.textContent = Math.round(data.main.temp);
            humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
            pressureElement.textContent = `Pressure: ${data.main.pressure}hPa`;
            windSpeedElement.textContent = `Wind speed: ${data.wind.speed}m/s`;

            //Chcesz rafal to to zmien jak ci sie nie podoba POZDRO
            let icon = data.weather[0].icon;
            let iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
            iconElement.innerHTML = `<img src="${iconurl}" alt="Weather Icon">`;


            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}
function fetchWeatherForecast(location) {
    const url = `${apiUrlForecast}?q=${location}&appid=${apiKey}&units=metric&cnt=3`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}
function fetchAirPollution(location) {
    const url = `${apiUrlPollution}?lat=${location[0]}&lon=${location[1]}&appid=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            alert("Can't find city");
            console.error('Error fetching pollution data:', error);
        });
}
function fetchWidget(location){
    window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];
    window.myWidgetParam.push({id: 11,cityid: location,appid: '49c0f56e7438b2b449e09780173bb6b8',units: 'metric',containerid: 'openweathermap-widget-11',  });
        (function() {
            var script = document.createElement('script');
            script.async = true;
            script.charset = "utf-8";
            script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
            var s = document.getElementsByTagName('script')[1];
            s.parentNode.insertBefore(script, s);
        })();
}


function whichDay(dayNumber) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    if (dayNumber < 0 || dayNumber > 6) {
        return "Invalid day number";
    }
    
    return daysOfWeek[dayNumber];
}

const d = new Date();
let day = d.getDay();
let hr = d.getHours();
let mi = d.getMinutes();
document.getElementById('day').innerHTML = whichDay(day) + ", " + hr + ":" + mi;

function clearInput() {
    locationInput.value = "";
}

function showBox() {
    document.getElementById('container').style.display = 'block';
    document.getElementById('searchbar').style.marginTop = '10%';
}