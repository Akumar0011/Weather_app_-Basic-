document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "Enter your key"; // env variable

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError(error.message);
    }
  });

  async function fetchWeatherData(city) {
    // Gets the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      // Handles HTTP errors explicitly
      if (!response.ok) {
        throw new Error("City not found. Please check the name and try again.");
      } else {
        throw new Error(
          "An error occurred while fetching the weather data. Please try again later."
        );
      }
    }

    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    // Displays weather data
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature: ${main.temp} °C`;
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`;

    // Show the weather info and hide the error message
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError(message) {
    // Displays the error message
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
    weatherInfo.classList.add("hidden");
  }
});
