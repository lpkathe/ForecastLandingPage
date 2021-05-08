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
  console.log(response);

  document.getElementById(
    "asideDegree"
  ).innerHTML = `${response[0].current.temp}`;
  document.getElementById(
    "asideImg"
  ).src = `http://openweathermap.org/img/wn/${response[0].current.weather[0].icon}@2x.png`;
  document.getElementById(
    "asideImgDescription"
  ).src = `http://openweathermap.org/img/wn/${response[0].current.weather[0].icon}@2x.png`;

  for (index = 0; index < 3; index++) {
    const card1 = document.getElementById(`forecastCard${index + 1}`);
    card1.querySelector(
      ".card__img"
    ).src = `http://openweathermap.org/img/wn/${response[0].daily[index].weather[0].icon}@2x.png`;
    card1.querySelector(".text__day").innerText = new Date(
      response[0].daily[index].dt * 1000
    ).toLocaleString("en-US", { weekday: "long" });
    card1.querySelector(".text__weather").innerText =
      response[0].daily[index].weather[0].main;
    card1.querySelector(".humidity").innerText =
      response[0].daily[index].humidity;
    card1.querySelector(".degrees").innerText = `${Math.round(
      response[0].daily[index].temp.day
    )}`;
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
