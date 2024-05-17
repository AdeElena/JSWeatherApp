const weatherFrom = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "1478f44121c233379138375eb2b310ae";

weatherFrom.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please, enter a city!");
  }
});
async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiUrl);
  console.log(response);

  if (!response.ok) {
    throw new Error("The city can not be found!"); // if the city can not be found
  }
  return await response.json();
}
function displayWeatherInfo(data) {
  console.log(data);
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const temperatureDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descriptionDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  temperatureDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C `;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descriptionDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add("cityDisplay");
  temperatureDisplay.classList.add("temperatureDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descriptionDisplay.classList.add("descriptionDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  card.appendChild(cityDisplay);
  card.appendChild(temperatureDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descriptionDisplay);
  card.appendChild(weatherEmoji);
}
function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "🌩 🌪";
    case weatherId >= 300 && weatherId < 400:
      return "☁";
    case weatherId >= 500 && weatherId < 600:
      return "🌧";
    case weatherId >= 600 && weatherId < 700:
      return "❄";
    case weatherId >= 700 && weatherId < 800:
      return "🌫";
    case weatherId === 800:
      return "🌞";
    case weatherId >= 801 && weatherId < 809:
      return "☁";
    default:
      return "?";
  }
}
function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = ""; // reset the text box if something is there
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
