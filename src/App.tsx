import { useState } from "react";
import { CiSearch } from "react-icons/ci";

const App = () => {
  const initialWeather = {};
  const [city, setCity] = useState("Surat");
  const [weather, setWeather] = useState(initialWeather);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
  };

  return (
    <div className="weather-dashboard">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Weather Dashboard</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <CiSearch className="search-icon" />
          </button>
        </form>
        <div className="weather-display">
          <h2 className="city-name">{city}</h2>
          <div className="weather-main">
            <span className="temperature">{weather.temperature}°C</span>
            <span className="description">{weather.description}</span>
          </div>
          <div className="weather-details">
            <div className="weather-detail-item">
              <h3>Humidity</h3>
              <p>{weather.humidity}%</p>
            </div>
            <div className="weather-detail-item">
              <h3>Wind Speed</h3>
              <p>{weather.windSpeed} m/s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
