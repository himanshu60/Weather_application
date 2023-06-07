const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchbtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const location_Not_Found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});

async function checkWeather(city) {
  const api_key = "93f2eaad7733d65ea7833208ee588cfe";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data = await fetch(`${url}`)
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));

  if (weather_data.cod === `404`) {
    location_Not_Found.style.display = "flex";
    weather_body.style.display = "none";
    console.log("error");
    return;
  } else {
    location_Not_Found.style.display = "none";
    weather_body.style.display = "flex";
  }
  temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`; //to conver celcius minus 273.15
  humidity.innerHTML = `${weather_data.main.humidity}%`;
  description.innerHTML = `${weather_data.weather[0].description}`;
  windSpeed.innerHTML = `${weather_data.wind.speed}km/H`;

  // witch case for image
  switch (weather_data.weather[0].main) {
    case "Clouds":
      weather_img.src = "/images/cloud.png";
      break;
    case "Clear":
      weather_img.src = "/images/clear.png";
      break;
    case "Rain":
      weather_img.src = "/images/rain.png";
      break;
    case "Mist":
      weather_img.src = "/images/mist.png";
      break;
    case "Snow":
      weather_img.src = "/images/snow.png";
      break;
  }

  // console.log(weather_data)
}
