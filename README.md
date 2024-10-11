# Weather Dashboard

The task is to build a weather dashboard application using React. The app will display weather information for a specific city and allow users to search for weather in different cities. You will need to fetch data from a third-party API (such as OpenWeatherMap) and present it in a user-friendly manner.

# Requirements

1. City Search Functionality:

   - A search bar should allow users to enter a city name and fetch the weather for that city.
   - Display an error message if the city is not found or if there is a network issue.
   - Maintain search history along with weather data for searched city in local storage.

2. Current Weather Information:

   - Display the following for the searched city:
     - City name
     - Current temperature
     - Weather condition (e.g., sunny, cloudy)
     - Wind speed
     - Humidity level
     - Icon representing the weather condition

3. Weather Forecast:

   - Show a 5-day weather forecast for the selected city. For each day, display:
     - Date
     - Forecasted temperature
     - Weather condition
     - Icon representing the forecasted condition
     - Allow users to switch between Celsius and Fahrenheit.

4. Third-Party API Integration:

   - Use the OpenWeatherMap API (or any other suitable API) to fetch weather data.
   - API documentation: [OpenWeatherMap API](https://openweathermap.org/api)

5. UI and User Experience:

   - Ensure the UI is clean and responsive.
   - Implement a loading spinner while fetching data from the API.
   - Include some basic CSS styling (bonus if styled using a CSS-in-JS library like Styled Components).

6. Error Handling:

   - Implement error handling for failed API calls and display appropriate messages.

7. Bonus (Optional):
   - Add unit testing for critical components.

# Assessment Criteria

- Proper use of React features (e.g., hooks, state management).
- Ability to work with asynchronous data and third-party APIs.
- Clean, modular, and maintainable code.
- User experience and responsiveness of the UI.
- Error handling and edge cases.

Timeframe: 3 Hours
