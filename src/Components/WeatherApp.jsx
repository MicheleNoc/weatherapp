import React, { useState, useEffect } from 'react';
import './WeatherApp.css'; // Importa il file CSS
import sunny from '../assets/images/sunny.png';
import cloudy from '../assets/images/cloudy.png';
import rainy from '../assets/images/rainy.png';
import snow from '../assets/images/snowy.png';
import haze from '../assets/images/cloudy.png';
import mist from '../assets/images/cloudy.png'; 
import { FaClock } from "react-icons/fa";
import { FaTemperatureHigh } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { LuWind } from "react-icons/lu";
import { TiWeatherPartlySunny } from "react-icons/ti";

const WeatherApp = () => {
    const [data, setData] = useState({});
    const [location, setLocation] = useState('');
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    // Aggiorna l'orologio ogni secondo
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        // Pulisci l'intervallo quando il componente viene smontato
        return () => clearInterval(intervalId);
    }, []);

    // Oggetto delle immagini meteo
    const weatherImages = {
        Clear: sunny,
        Clouds: cloudy,
        Rain: rainy,
        Snow: snow,
        Haze: haze,
        Mist: mist,
    };

    // Seleziona l'immagine meteo basata sui dati
    const weatherImage = data.weather ? weatherImages[data.weather[0].main] : null;

    // Funzione per la ricerca del meteo
    async function search(event) {
        event.preventDefault();
        const api_key = '46d25d550789714a31b15b72e35fa44a';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api_key}`;
        try {
            const res = await fetch(url);
            const searchData = await res.json();
            console.log(searchData);
            setData(searchData);
            setLocation('');
        } catch (error) {
            console.error("Error fetching the weather data:", error);
        }
    }

    return (
        <div>
            <div className='container'>
                <h1><FaClock /> {time}</h1>

                <form className="form-inline my-2 my-lg-0" onSubmit={search}>
                    <input
                        className="form-control mr-sm-2"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        type="search"
                        placeholder="Inserisci città"
                        aria-label="Search"
                    />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                        Cerca
                    </button>
                </form>

                <div className="weather-data">
                    {data.main && (
                        <div>
                            <h3>{data.name}</h3>
                            <img src={weatherImage} alt="weather" />
                            <p><FaTemperatureHigh /> Temperatura: {data.main.temp}°C</p>
                            <p><TiWeatherPartlySunny /> Meteo: {data.weather[0].description}</p>
                            <p><WiHumidity /> Umidità: {data.main.humidity}%</p>
                            <p><LuWind /> Vento: {data.wind.speed} m/s</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default WeatherApp;
