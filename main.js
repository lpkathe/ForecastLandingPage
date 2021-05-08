function temperature(response) {
  const data = response;
  const temperature = data - 273.15;
  document.getElementById("asideDegree").innerHTML = `${temperature}º`;
}

function createURL(city) {
  const apiKey = "f0110d1ada957ee53f99220d938f65a3";
  const bogota = "Bogota, co";
  const paris = "Paris, fr";
  const lyon = "Lyon, fr";
  const cityName = bogota;

  if (city === "bogota") {
    cityName = bogota;
  } else if (city === "lyon") {
    cityName = lyon;
  } else {
    cityName = paris;
  }

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&cnt=4`;
  return url;
}

function onLoad() {
  getInfo("bogota");
}

function getInfo(city) {
  let request = new XMLHttpRequest();
  request.open("GET", createURL(city));
  request.send();
  request.onload = () => {
    console.log(request);

    if (request.status === 200) {
      console.log(JSON.parse(request.response));
      const response = JSON.parse(request.response);
      temperature(response.main.temp);
    } else {
      console.log(`Error ${request.status} ${request.statusText}`);
    }
  };
}

getInfo();
window.addEventListener("load", onLoad);
