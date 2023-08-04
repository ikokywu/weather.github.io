const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");
const apiKey = "b34b77e1a7c37f6a86e49562db6b64a4";

const getWeather = async (city) => {
  const getRequest = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`
  );

  if (getRequest.status == 404) {
    error.style.display = "block";
  }

  if (getRequest.status >= 400) {
    weather.style.display = "none";
  } else {
    const data = await getRequest.json();

    document.querySelector(".temperature").innerText =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".city").innerText =
      data.name + ", " + data.sys.country;
    document.querySelector(".humidity").innerText = data.main.humidity + "%";
    document.querySelector(".wind").innerText = data.wind.speed + "km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "images/snow.png";
    }

    weather.style.display = "block";
    error.style.display = "none";
  }
};

searchBtn.addEventListener("click", () => {
  getWeather(searchBox.value);
});

getWeather();
