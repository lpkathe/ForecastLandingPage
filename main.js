const cardinalDegrees = [
  {
    "minDeg": 348.75,
    "maxDeg": 11.25,
    "ordinal": "North"
  },
  {
    "minDeg": 11.25,
    "maxDeg": 33.75,
    "ordinal": "NNE"
  },
  {
    "minDeg": 33.75,
    "maxDeg": 56.25,
    "ordinal": "NorthEast"
  },
  {
    "minDeg": 56.25,
    "maxDeg": 78.75,
    "ordinal": "ENE"
  },
  {
    "minDeg": 78.75,
    "maxDeg": 101.25,
    "ordinal": "East"
  },
  {
    "minDeg": 101.25,
    "maxDeg": 123.75,
    "ordinal": "ESE"
  },
  {
    "minDeg": 123.75,
    "maxDeg": 146.25,
    "ordinal": "SouthEast"
  },
  {
    "minDeg": 146.25,
    "maxDeg": 168.75,
    "ordinal": "SSE"
  },
  {
    "minDeg": 168.75,
    "maxDeg": 191.25,
    "ordinal": "South"
  },
  {
    "minDeg": 191.25,
    "maxDeg": 213.75,
    "ordinal": "SSW"
  },
  {
    "minDeg": 213.75,
    "maxDeg": 236.25,
    "ordinal": "SouthWest"
  },
  {
    "minDeg": 236.25,
    "maxDeg": 258.75,
    "ordinal": "WSW"
  },
  {
    "minDeg": 258.75,
    "maxDeg": 281.25,
    "ordinal": "West"
  },
  {
    "minDeg": 281.25,
    "maxDeg": 303.75,
    "ordinal": "WNW"
  },
  {
    "minDeg": 303.75,
    "maxDeg": 326.25,
    "ordinal": "NorthWest"
  },
  {
    "minDeg": 326.25,
    "maxDeg": 348.75,
    "ordinal": "NNW"
  }
];

function onLoad() {
  loadCities();
}

const get = (url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status == 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.onerror = () => {
      reject(xhr.statusText && xhr.status);
    };
  });
};

function assignValues(response) {
  document.getElementById("asideDegree").innerHTML = `${response[0].current.temp}`;
  document.getElementById("asideImg").src = `http://openweathermap.org/img/wn/${response[0].current.weather[0].icon}@2x.png`;
  document.getElementById("asideImgDescription").innerText = response[0].current.weather[0].main;

  for (index = 0; index < 3; index++) {
    const card1 = document.getElementById(`forecastCard${index + 1}`);
    card1.querySelector(".card__img").src = `http://openweathermap.org/img/wn/${response[0].daily[index].weather[0].icon}@2x.png`;
    card1.querySelector(".text__day").innerText = new Date(response[0].daily[index].dt * 1000).toLocaleString("en-US", { weekday: "long" });
    card1.querySelector(".text__weather").innerText = response[0].daily[index].weather[0].main;
    card1.querySelector(".humidity").innerText = response[0].daily[index].humidity;
    card1.querySelector(".degrees").innerText = `${Math.round(response[0].daily[index].temp.day)}`;
  }

  const lyon = document.getElementById("lyon_card");
  lyon.querySelector(".france__img").src = `http://openweathermap.org/img/wn/${response[1].current.weather[0].icon}@2x.png`;
  lyon.querySelector(".france__degree__number").innerText = `${Math.round(response[1].current.temp)}`;
  lyon.querySelector(".france__humidity").innerText = response[1].current.humidity;
  lyon.querySelector(".france__wind").innerText = getWindDirectionByDegree(response[1].current.wind_deg);
  lyon.querySelector(".france__wind__velocity").innerText = response[1].current.wind_speed;

  const paris = document.getElementById(`paris_card`);
  paris.querySelector(".france__img").src = `http://openweathermap.org/img/wn/${response[2].current.weather[0].icon}@2x.png`;
  paris.querySelector(".france__degree__number").innerText = `${Math.round(response[2].current.temp)}`;
  paris.querySelector(".france__humidity").innerText = response[2].current.humidity;
  paris.querySelector(".france__wind").innerText = getWindDirectionByDegree(response[2].current.wind_deg);
  paris.querySelector(".france__wind__velocity").innerText = response[2].current.wind_speed;
}

function getWindDirectionByDegree(windDeg) {

  const result = cardinalDegrees.filter(data => windDeg >= data.minDeg && windDeg <= data.maxDeg);

  if (result.length > 0) {
    return result[0].ordinal;
  } else {
    return "Unknown";
  }
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
  let promiseArr = [];

  cities.forEach((data, index) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`;
    promiseArr.push(get(url));
  });

  Promise.all(promiseArr).then((response) => {
    assignValues(response);
  });
}

window.addEventListener("load", onLoad);