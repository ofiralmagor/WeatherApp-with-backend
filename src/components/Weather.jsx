import { useState, useEffect } from 'react';
import axios from 'axios'; // ייבוא Axios
import WeatherSummary from './WeatherSummary.jsx';
import WeatherForecast from './WeatherForecast.jsx';
import HourlyWeather from './HourlyWeather.jsx';

import '../App.css';
import './Weather.css';

const Weather = () => {
    const [inputCity, setInputCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [city, setCity] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [apiKey, setApiKey] = useState(''); // מצב חדש לאחסון ה-API Key

    // Fetch the API key from your server
    useEffect(() => {
        const fetchApiKey = async () => {
            try {
                const response = await axios.get('https://weatherappnew-bh46.onrender.com/api/key'); // שליחת בקשה לשרת 
                setApiKey(response.data.apiKey); // אחסון ה-API Key
            } catch (err) {
                console.error('Error fetching API Key:', err);
                setError('Failed to fetch API Key.');
            }
        };

        fetchApiKey();
    }, []);

    const fetchWeather = async (cityName) => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
                params: {
                    q: cityName,
                    appid: apiKey, // שימוש ב-API Key שקיבלנו מהשרת
                    units: 'metric',
                },
            });
            setWeatherData(response.data);
            setCity(response.data.city.name);
            setInputCity('');
            setShowInput(false); 
        } catch (err) {
            setError(err.response?.status === 404 ? 'City not found!' : 'Something went wrong.');
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!inputCity.trim()) {
            setError('Please enter a city name.');
        } else {
            fetchWeather(inputCity);
        }
    };

    const getWeatherIcon = (description) => {
        const iconMap = {
            'clear sky': 'bi bi-sun',
            'few clouds': 'bi bi-cloud-sun',
            'scattered clouds': 'bi bi-cloud',
            'broken clouds': 'bi bi-clouds',
            'shower rain': 'bi bi-cloud-drizzle',
            'rain': 'bi bi-cloud-rain',
            'thunderstorm': 'bi bi-cloud-lightning',
            'snow': 'bi bi-snow',
            'mist': 'bi bi-cloud-fog',
            'light rain': 'bi bi-cloud-drizzle',
            'overcast clouds': 'bi bi-clouds',
            'extreme rain': 'bi bi-cloud-rain-heavy',
            'dust': 'bi bi-tornado',
            'moderate rain': 'bi bi-cloud-drizzle',
        };
        return iconMap[description] || 'bi bi-question-circle';
    };

    const getDailyAverages = (data) => {
        const dailyData = {};
        data.list.forEach((forecast) => {
            const date = new Date(forecast.dt * 1000).toLocaleDateString();
            const currentDayWeather = forecast.weather[0];
            if (!dailyData[date]) {
                dailyData[date] = {
                    totalTemp: 0,
                    count: 0,
                    weather: currentDayWeather.description,
                };
            }
            dailyData[date].totalTemp += forecast.main.temp;
            dailyData[date].count++;
        });

        return Object.entries(dailyData)
            .map(([date, { totalTemp, count, weather }]) => ({
                date,
                avgTemp: (totalTemp / count).toFixed(1),
                weather,
            }))
            .slice(1, 6); // Retrieving only forecast for the next 5 days
    };

    useEffect(() => {
        if (apiKey) { // מחכים לטעינת ה-API Key לפני בקשת מזג האוויר
            fetchWeather('Tel Aviv');
        }
    }, [apiKey]);

    return (
        <div>
            <button className="toggle-button" onClick={() => setShowInput(!showInput)}>
                <i className={showInput ? 'bi bi-x-lg' : 'bi bi-search'}></i>
            </button>
            {showInput && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter city"
                        value={inputCity}
                        onChange={(event) => setInputCity(event.target.value)}
                    />
                    <button type="submit">
                        <i className="bi bi-search"></i>
                    </button>
                </form>
            )}
            
            {loading && <div className="spinner"></div>}
            {error && <p className="error-message">{error}</p>}
            {weatherData && (
                <>
                    <WeatherSummary weatherData={weatherData} getWeatherIcon={getWeatherIcon} />
                    <HourlyWeather city={city} getWeatherIcon={getWeatherIcon} apiKey={apiKey} />
                    <WeatherForecast dailyAverages={getDailyAverages(weatherData)} getWeatherIcon={getWeatherIcon} />
                </>
            )}
        </div>
    );
};

export default Weather;