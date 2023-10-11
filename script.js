document.addEventListener("DOMContentLoaded", function () {
  // Get references to HTML elements
  const destinationInput = document.getElementById("destination");
  const departureDateInput = document.getElementById("departure-date");
  const returnDateInput = document.getElementById("return-date");
  const searchButton = document.getElementById("search-button");
  const resultsSection = document.querySelector(".results-section");

  // Event listener for the search button
  searchButton.addEventListener("click", function () {
      // Get user inputs
      const destination = destinationInput.value;
      const departureDate = departureDateInput.value;
      const returnDate = returnDateInput.value;

      // Use the Geolocation API to get coordinates for the destination
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${destination}&key=YOUR_API_KEY`)
          .then(response => response.json())
          .then(data => {
              // Extract coordinates (latitude and longitude) from the API response
              const coordinates = data.results[0].geometry.location;

              // Now that you have coordinates, you can fetch more travel information
              // For example, you can fetch weather data using a weather API
              // Replace 'YOUR_WEATHER_API_KEY' with your actual weather API key
              fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=YOUR_WEATHER_API_KEY`)
                  .then(response => response.json())
                  .then(weatherData => {
                      // Display the weather information in the results section
                      resultsSection.innerHTML = `
                          <h3>Weather for ${destination}</h3>
                          <p>Departure Date: ${departureDate}</p>
                          <p>Return Date: ${returnDate}</p>
                          <p>Temperature: ${weatherData.main.temp}&deg;C</p>
                          <p>Weather Condition: ${weatherData.weather[0].description}</p>
                      `;
                  })
                  .catch(error => {
                      console.error("Error fetching weather data:", error);
                  });
          })
          .catch(error => {
              console.error("Error fetching coordinates:", error);
          });
  });
});
