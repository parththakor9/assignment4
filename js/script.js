const API_KEY = '648ce3db6233bcba877bbe5eb414085a'; // Make sure your key is active

// Dynamically add student info
document.getElementById('student-info').textContent = 'Name: Parth | Student ID: 200597138';

const cityInput = document.getElementById('city-input');
const getWeatherButton = document.getElementById('get-weather');
const weatherOutput = document.getElementById('weather-output');
const appContainer = document.getElementById('app-container');

// Event listener for button
getWeatherButton.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (!city) {
    weatherOutput.textContent = 'Please enter a city name.';
    return;
  }
  fetchWeather(city);
});

function fetchWeather(city) {
  // Construct the URL for the API request
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  // Start the fetch request
  fetch(url)
    .then(response => {
      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error(`City not found: ${city}`);
      }
      return response.json(); // Parse JSON if response is valid
    })
    .then(data => {
      const { name, sys, main, weather } = data;
      const iconCode = weather[0].icon; // Get icon code for the weather
      const weatherMain = weather[0].main; // Main weather condition (e.g., Clear, Rain)
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      // Update the weather information on the page
      weatherOutput.innerHTML = `
        <strong>📍 ${name}, ${sys.country}</strong><br />
        🌡 <strong>${main.temp}°C</strong><br />
        🌤 ${weather[0].description}<br />
        <img src="${iconUrl}" alt="Weather icon" />
      `;

      // Set background image based on weather condition
      setWeatherBackground(weatherMain);
    })
    .catch(error => {
      // Display error message if anything goes wrong (e.g., invalid city)
      weatherOutput.textContent = `❌ Error: ${error.message}`;
    });
}

// Change background image based on weather condition
function setWeatherBackground(weatherMain) {
  let backgroundImage = '';

  switch (weatherMain.toLowerCase()) {
    case 'clear':
      backgroundImage = 'url("https://source.unsplash.com/1600x900/?sunny,sky")';
      break;
    case 'rain':
      backgroundImage = 'url("https://source.unsplash.com/1600x900/?rain,clouds")';
      break;
    case 'clouds':
      backgroundImage = 'url("https://source.unsplash.com/1600x900/?cloudy,sky")';
      break;
    case 'snow':
      backgroundImage = 'url("https://source.unsplash.com/1600x900/?snow")';
      break;
    case 'thunderstorm':
      backgroundImage = 'url("https://source.unsplash.com/1600x900/?thunderstorm")';
      break;
    default:
      backgroundImage = 'url("https://source.unsplash.com/1600x900/?weather")';
  }

  // Update the background image dynamically
  document.body.style.backgroundImage = backgroundImage;
}
