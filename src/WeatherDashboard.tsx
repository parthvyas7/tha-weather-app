import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import "./styles/weather-dashboard.styles.css";
import Loader from "./components/Loader";

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
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim() === "") return;

    setPending(true);
    const currentWeatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
        setError("Error: City not found or Network error");
        setPending(false);
      });

    const forecastWeatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    )
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
        setError("Error: City not found or Network error");
        setPending(false);
      });

    const WeatherData: WeatherData = {
      city: city,
      current: {
        temperature: currentWeatherData.main.temp,
        description: currentWeatherData.weather[0].description,
        icon: currentWeatherData.weather[0].icon,
        windSpeed: currentWeatherData.wind.speed,
        humidity: currentWeatherData.main.humidity,
      },
      forecast: [
        {
          date: forecastWeatherData.list[0].dt_txt,
          temperature: forecastWeatherData.list[0].main.temp,
          description: forecastWeatherData.list[0].weather[0].description,
          icon: forecastWeatherData.list[0].weather[0].icon,
        },
        {
          date: forecastWeatherData.list[8].dt_txt,
          temperature: forecastWeatherData.list[8].main.temp,
          description: forecastWeatherData.list[8].weather[0].description,
          icon: forecastWeatherData.list[8].weather[0].icon,
        },
        {
          date: forecastWeatherData.list[16].dt_txt,
          temperature: forecastWeatherData.list[16].main.temp,
          description: forecastWeatherData.list[16].weather[0].description,
          icon: forecastWeatherData.list[16].weather[0].icon,
        },
        {
          date: forecastWeatherData.list[24].dt_txt,
          temperature: forecastWeatherData.list[24].main.temp,
          description: forecastWeatherData.list[24].weather[0].description,
          icon: forecastWeatherData.list[24].weather[0].icon,
        },
        {
          date: forecastWeatherData.list[32].dt_txt,
          temperature: forecastWeatherData.list[32].main.temp,
          description: forecastWeatherData.list[32].weather[0].description,
          icon: forecastWeatherData.list[32].weather[0].icon,
        },
      ],
    };

    setWeather(WeatherData);
    setPending(false);

    const updatedHistory = [
      city,
      ...searchHistory.filter((item) => item !== city),
    ].slice(0, 5);
    setSearchHistory(updatedHistory);

    localStorage.setItem("weatherData", JSON.stringify(WeatherData));
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
        {error && <p className="error">{error}</p>}
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
        {pending ? (
          <Loader />
        ) : (
          weather && (
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
                    {convertTemperature(weather.current.temperature).toFixed(1)}
                    °{isCelsius ? "C" : "F"}
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
          )
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
