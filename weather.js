const apiKey = "154d1ba2504c208784cde2dcffbc74b4";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function getCoordinates(city) {
  const geoCodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
  const response = await fetch(geoCodingUrl);
  const data = await response.json();

  if (data.length === 0) {
    throw new Error("Cidade não encontrada");
  }

  return {
    lat: data[0].lat,
    lon: data[0].lon,
  };
}

async function checkWeather(city) {
  try {
    const { lat, lon } = await getCoordinates(city);
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    document.querySelector(".error").style.display = "none";

    if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".wheather").style.display = "none";
    } else {
      const data = await response.json();

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + " ºC";
      document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      const weatherCondition = data.weather[0].main;
      if (weatherCondition === "Clouds") {
        weatherIcon.src = "./images/clouds.png";
      } else if (weatherCondition === "Clear") {
        weatherIcon.src = "./images/clear.png";
      } else if (weatherCondition === "Rain") {
        weatherIcon.src = "./images/rain.png";
      } else if (weatherCondition === "Drizzle") {
        weatherIcon.src = "./images/drizzle.png";
      } else if (weatherCondition === "Mist") {
        weatherIcon.src = "./images/mist.png";
      } else if (weatherCondition === "Snow") {
        weatherIcon.src = "./images/snow.png";
      }
      document.querySelector(".weather").style.display = "block";
    }
  } catch (error) {
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value;
  if (city) {
    checkWeather(city);
  } else {
    alert("Por favor, insira o nome de uma cidade!");
  }
});

searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const city = searchBox.value;
    if (city) {
      checkWeather(city);
    } else {
      alert("Por favor, insira o nome de uma cidade!");
    }
  }
});
