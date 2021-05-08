function onLoad() {
  loadCities();
}

function callWeatherAPI(url) {
  let request = new XMLHttpRequest();
  request.open("GET", url);
  request.send();
  request.onload = (request) => {
    if (request.target.status === 200) {
      console.log(request.target.response);
      return request.target.response;
    } else {
      console.log(`Error ${request.status} ${request.statusText}`);
      return "[]";
    }
  };
}

function loadCities() {
  const apiKey = "f0110d1ada957ee53f99220d938f65a3";

  let cities = [
    {
      lat: 4.60971,
      lon: -74.08175,
    },
    {
      lat: 45.76342,
      lon: 4.834277,
    },
    {
      lat: 48.864716,
      lon: 2.349014,
    },
  ];

  cities.forEach((data, index) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`;
    const response = callWeatherAPI(url);
    //response = JSON.parse(response);
    console.log(response);
    temperature(response, index);
    forecast(response, index);
  });
}

function temperature(response, index) {
  const data = response;
  const temperature = data - 273.15;
  document.getElementById("asideDegree").innerHTML = `${temperature}º`;
}

function forecast(response, index) {}

window.addEventListener("load", onLoad);
