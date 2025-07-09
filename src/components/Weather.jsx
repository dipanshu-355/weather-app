import React from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
const Weather = () => {
    const [darkMode, setDarkMode] = useState(false);
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);
    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }
    const search = async (city) => {
        if (city === "") {
            alert("Enter City Name");
            return;
        }

        try {
            // Save search to MongoDB backend
            await fetch("http://localhost:5000/api/cities", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: city })
            });

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            });





        } catch (error) {
            setWeatherData(false);
            console.error("Error fetching weather or saving city:", error);
        }
    };


    const [recentCities, setRecentCities] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/cities")
            .then(res => res.json())
            .then(data => setRecentCities(data))
            .catch(err => console.error("Failed to fetch recent cities"));
    }, []);

    return (

        <div className='weather'>
            {/* 🌙 Dark Mode Toggle Button */}
            <button
                className="theme-toggle"
                onClick={() => {
                    setDarkMode(!darkMode);
                    document.body.classList.toggle("dark");
                }}
            >
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>

            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder='Search' onKeyDown={(e) => {
                    if (e.key === 'Enter') search(inputRef.current.value);
                }} />
                <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
            </div>
            {recentCities.length > 0 && (
                <div className="recent">
                    <h3>Recently Searched Cities</h3>
                    <ul>
                        {recentCities.map((city, index) => (
                            <li
                                key={index}
                                onClick={() => search(city.name)}
                                style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                            >
                                {city.name}
                            </li>
                        ))}
                    </ul>

                </div>
            )}

            {weatherData ? <>
                {weatherData && (
                    <div className="weather-top">
                        <img src={weatherData.icon} alt="Weather Icon" className="weather-icon" />
                        <div className="weather-info">
                            <p className="temperature">{weatherData.temperature}°</p>
                            <p className="location">{weatherData.location}</p>
                        </div>
                    </div>
                )}

                <div className='weather-data'>
                    <div className='col'>
                        <img src={humidity_icon} alt="" />
                        <div>
                            <p>{weatherData.humidity} %</p>
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className='col'>
                        <img src={wind_icon} alt="" />
                        <div>
                            <p>{weatherData.windSpeed} m/s</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>


                </div>
            </> : <></>}

        </div>
    )
}

export default Weather
