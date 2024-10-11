import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import "./styles/weather-dashboard.styles.css";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
type WeatherData = {
  city: string;
  current: {
    temperature: number;
    description: string;
    icon: string;
    windSpeed: number;
    humidity: number;
  };
  forecast: Array<{
    date: string;
    temperature: number;
    description: string;
    icon: string;
  }>;
};

export default function WeatherDashboard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }

    const savedWeather = localStorage.getItem("weatherData");
    if (savedWeather) {
      setWeather(JSON.parse(savedWeather));
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim() === "") return;

    const mockWeatherData: WeatherData = {
      city: city,
      current: {
        temperature: 20,
        description: "Partly cloudy",
        icon: "02d",
        windSpeed: 5.5,
        humidity: 65,
      },
      forecast: [
        {
          date: "2023-05-01",
          temperature: 22,
          description: "Sunny",
          icon: "01d",
        },
        {
          date: "2023-05-02",
          temperature: 21,
          description: "Partly cloudy",
          icon: "02d",
        },
        {
          date: "2023-05-03",
          temperature: 19,
          description: "Rainy",
          icon: "10d",
        },
        {
          date: "2023-05-04",
          temperature: 18,
          description: "Cloudy",
          icon: "03d",
        },
        {
          date: "2023-05-05",
          temperature: 20,
          description: "Partly cloudy",
          icon: "02d",
        },
      ],
    };

    setWeather(mockWeatherData);

    const updatedHistory = [
      city,
      ...searchHistory.filter((item) => item !== city),
    ].slice(0, 5);
    setSearchHistory(updatedHistory);

    localStorage.setItem("weatherData", JSON.stringify(mockWeatherData));
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

    setCity("");
  };

  const convertTemperature = (temp: number) => {
    if (isCelsius) return temp;
    return (temp * 9) / 5 + 32;
  };

  const getWeatherIcon = (icon: string) => {
    return `http://openweathermap.org/img/wn/${icon}.png`;
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
        <div className="temperature-toggle">
          <button
            className={isCelsius ? "active" : ""}
            onClick={() => setIsCelsius(true)}
          >
            °C
          </button>
          <button
            className={!isCelsius ? "active" : ""}
            onClick={() => setIsCelsius(false)}
          >
            °F
          </button>
        </div>
        {weather && (
          <div className="weather-display">
            <h2 className="city-name">{weather.city}</h2>
            <div className="current-weather">
              <img
                src={getWeatherIcon(weather.current.icon)}
                alt={weather.current.description}
                className="weather-icon"
              />
              <div className="weather-info">
                <span className="temperature">
                  {convertTemperature(weather.current.temperature).toFixed(1)}°
                  {isCelsius ? "C" : "F"}
                </span>
                <span className="description">
                  {weather.current.description}
                </span>
              </div>
            </div>
            <div className="weather-details">
              <div className="weather-detail-item">
                <h3>Wind Speed</h3>
                <p>{weather.current.windSpeed} m/s</p>
              </div>
              <div className="weather-detail-item">
                <h3>Humidity</h3>
                <p>{weather.current.humidity}%</p>
              </div>
            </div>
            <h3 className="forecast-title">5-Day Forecast</h3>
            <div className="forecast">
              {weather.forecast.map((day, index) => (
                <div key={index} className="forecast-item">
                  <p className="forecast-date">{day.date}</p>
                  <img
                    src={getWeatherIcon(day.icon)}
                    alt={day.description}
                    className="forecast-icon"
                  />
                  <p className="forecast-temp">
                    {convertTemperature(day.temperature).toFixed(1)}°
                    {isCelsius ? "C" : "F"}
                  </p>
                  <p className="forecast-desc">{day.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="search-history">
          <h3>Search History</h3>
          <ul>
            {searchHistory.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
