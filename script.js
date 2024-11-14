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

const coElement = document.getElementById('co');
const noElement = document.getElementById('no');
const no2Element = document.getElementById('no2');
const o3Element = document.getElementById('o3');
const so2Element = document.getElementById('so2');
const pm2_5Element = document.getElementById('pm2_5');
const pm10Element = document.getElementById('pm10');
const nh3Element = document.getElementById('nh3');
const aqiElement= document.getElementById('aqi');

const co=document.getElementById('cometer');
const no=document.getElementById('nometer');
const no2=document.getElementById('no2meter');
const o3=document.getElementById('o3meter');
const so2 = document.getElementById('so2meter');
const pm2_5=document.getElementById('pm2_5meter');
const pm10=document.getElementById('pm10meter');
const nh3=document.getElementById('nh3meter');

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
            console.log(error);
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
            hour(data.timezone);


            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}
function fetchWeatherForecast(location) {
    const url = `${apiUrlForecast}?q=${location}&appid=${apiKey}&units=metric&cnt=30`;
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
            colabel.innerHTML=`CO: ${data.list[0].components.co}μg/m<sup>3</sup>`;
            nolabel.innerHTML=`NO: ${data.list[0].components.no}μg/m<sup>3</sup>`;
            no2label.innerHTML=`NO<sub>2</sub>: ${data.list[0].components.no2}μg/m<sup>3</sup>`;
            o3label.innerHTML=`O<sub>3</sub>: ${data.list[0].components.o3}μg/m<sup>3</sup>`;
            so2label.innerHTML=`SO<sub>2</sub>: ${data.list[0].components.so2}μg/m<sup>3</sup>`;
            pm2_5label.innerHTML=`PM<sub>2.5</sub>: ${data.list[0].components.pm2_5}μg/m<sup>3</sup>`;
            pm10label.innerHTML=`PM<sub>10</sub>: ${data.list[0].components.pm10}μg/m<sup>3</sup>`;
            nh3label.innerHTML=`NH<sub>3</sub>: ${data.list[0].components.nh3}μg/m<sup>3</sup>`;
            co.value=data.list[0].components.co;
            no.value=data.list[0].components.no;
            no2.value=data.list[0].components.no2;
            o3.value=data.list[0].components.o3;
            pm2_5.value=data.list[0].components.pm2_5;
            pm10.value=data.list[0].components.pm10;
            nh3.value=data.list[0].components.nh3;
            console.log(data);
            aqiElement.innerHTML=`Air quailty today is ${data.list[0].main.aqi}.`;
        })
        .catch(error => {
            console.error('Error fetching pollution data:', error);
        });
}
function fetchWidget(location){
    var div = document.getElementById('widgetGenerator');
    document.getElementById('openweathermap-widget-11').textContent = '';
    window.myWidgetParam = [];
    window.myWidgetParam.push({id: 11,cityid: location,appid: '49c0f56e7438b2b449e09780173bb6b8',units: 'metric',containerid: 'openweathermap-widget-11',  });
        (function() {
            var s = document.createElement('script');
            s.async = true;
            s.charset = "utf-8";
            s.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
            div.appendChild(s);
            div.textContent = '';
        })();
}


function whichDay(dayNumber) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    if (dayNumber < 0 || dayNumber > 6) {
        return "Invalid day number";
    }
    
    return daysOfWeek[dayNumber];
}

function hour(timeZone){
    var date = new Date();
    var data = date.toUTCString();
    var day = whichDay(date.getDay());
    var hours = data.slice(17, 19);
    hours = parseInt(hours) +  parseInt(timeZone/3600);
    if(hours>=24){
        hours -= 24;
        day = whichDay(date.getDay() + 1);
    }
    if(hours == 0){
        hours = "00";
    }
    var minutes = data.slice(20, 22);
    document.getElementById('day').innerHTML = day + ", " + hours + ":" + minutes;
}

function clearInput() {
    locationInput.value = "";
}

function showBox() {
    document.getElementById('container').style.display = 'block';
    document.getElementById('searchbar').style.marginTop = '10%';
}
