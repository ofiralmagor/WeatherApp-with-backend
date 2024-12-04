import './WeatherForecast.css';

const WeatherForecast = ({ dailyAverages, getWeatherIcon }) => {
    return (
        <div className="forecast-container">
            {dailyAverages.length === 0 ? (
                <p>No weather data available</p>
            ) : (
                dailyAverages.map((forecast, index) => (
                    <div className="weather-forecast-card" key={index}>
                        <p className="forecast-temp">{forecast.avgTemp}°C</p>
                        <i className={`weather-icon ${getWeatherIcon(forecast.weather)}`}></i>
                        <p className="forecast-date">{forecast.date}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default WeatherForecast;

