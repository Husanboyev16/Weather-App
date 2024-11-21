    const apiKey = "277e160f5af509c9f6e384d7cbe3501c";
    const defaultCity = "Tashkent";

    const temperatureElement = document.getElementById('temperature');
    const cityNameElement = document.getElementById('cityName');
    const searchInput = document.getElementById('searchInput');

    // Fetch weather data for a given city
    function fetchWeather(city) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => {
          if (!response.ok) {
            updateUIWithError();
            return null;
          }
          return response.json();
        })
        .then(data => {
          if (data) {
            updateUIWithWeather(data);
          }
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
          updateUIWithError();
        });
    }

    // Update UI with fetched data
    function updateUIWithWeather(data) {
      temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
      cityNameElement.textContent = data.name;
    }

    // Update UI with an error state
    function updateUIWithError() {
      temperatureElement.textContent = "--°C";
      cityNameElement.textContent = "City not found";
    }

    // Handle user input
    searchInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
          fetchWeather(city);
          searchInput.value = ""; // Clear input after search
        }
      }
    });

    // Fetch default city weather on load
    fetchWeather(defaultCity);
