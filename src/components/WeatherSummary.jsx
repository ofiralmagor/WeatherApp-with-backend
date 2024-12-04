import React from 'react';

const WeatherSummary = ({ weatherData, getWeatherIcon }) => {
    const currentWeather = weatherData.list[0]; 
    const temperature = currentWeather.main.temp; 
    const weatherDescription = currentWeather.weather[0].description; 
    const iconClass = getWeatherIcon(weatherDescription); 

    return (
        <div className="today-weather">
            <h2 className="temperature">{weatherData.city.name}, {weatherData.city.country}</h2>
            <i className={iconClass}></i>
            <h1 className="temperature">{temperature}°C</h1>
        </div>
    );
};

export default WeatherSummary;




