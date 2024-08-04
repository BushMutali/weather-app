"use client";
import { FaCloudRain } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import Image from "next/image";

const CurrentWeather = () => {
    const [loaded, setIsLoaded] = useState(false);
    const [visitorCity, setVisitorCity] = useState('');
    const [visitorCountry, setVisitorCountry] = useState('');
    const [visitorWeather, setVisitorWeather] = useState(null);
    const [currentDate, setCurrentDate] = useState('');
    const [weatherIcon, setWeatherIcon] = useState('');

    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    useEffect(() => {
        setIsLoaded(false);
        const formatDate = () => {
            const options = { weekday: 'short', day: 'numeric', month: 'short' };
            return new Date().toLocaleDateString('en-GB', options);
        };

        setCurrentDate(formatDate());

        const fetchVisitorLocation = async () => {
            try {
                const res = await fetch('/api/location');
                const locationData = await res.json();
                setVisitorCity(locationData.city);
                setVisitorCountry(locationData.country);

                if (locationData.city) {
                    const weatherRes = await fetch(`/api/weather/cities?cities=${locationData.city}`);
                    const weatherData = await weatherRes.json();
                    setVisitorWeather(weatherData[0].data);
                }
            } catch (error) {
                console.error('Error fetching visitor location:', error);
            } finally {
                setIsLoaded(true);
            }
        };

        fetchVisitorLocation();
    }, []);

    useEffect(() => {
        if (visitorWeather && visitorWeather.weather && visitorWeather.weather.length > 0) {
            const icon = `https://openweathermap.org/img/wn/${visitorWeather.weather[0].icon}.png`;
            setWeatherIcon(icon);
        }
    }, [visitorWeather]);

    return (
        <div className="flex flex-col items-center justify-center mt-10 text-white relative z-10">
            {loaded ? (
                visitorCity && visitorWeather ? (
                    <>
                        <div className="flex items-center justify-between gap-3">
                            {weatherIcon && (
                                <Image
                                    src={weatherIcon}
                                    alt='Weather Icon'
                                    width={50}
                                    height={50}
                                />
                            )}
                            <div className="flex flex-col items-start justify-center">
                                <h1 className='text-3xl'>Today</h1>
                                <span className='text-sm text-gray-400'>{currentDate}</span>
                            </div>
                        </div>

                        <div className="flex items-start justify-start">
                            <h1 className='text-[120px] font-extralight'>{(visitorWeather.main?.temp - 273.15)?.toFixed(0)}</h1>
                            <h5 className='text-3xl font-light mt-10'>&deg; C</h5>
                        </div>

                        <div className="inline-flex items-center gap-1 text-gray-400">
                            <FaLocationDot />
                            <h1 className='font-extralight'>{visitorCity}, {visitorCountry}</h1>
                        </div>

                        <div className="flex items-center justify-center gap-2 mt-5 text-gray-400">
                            <h1 className='font-light text-lg'>Feels like {(visitorWeather.main?.feels_like - 273.15)?.toFixed(0)}&deg;C</h1>
                            &#x2022;
                            <h1 className='font-light text-lg'>Sunset {formatTime(visitorWeather.sys?.sunset)}</h1>
                        </div>
                    </>
                ) : (
                    <p>No weather data available</p>
                )
            ) : (
                <div className="flex flex-col items-center justify-center mt-10 text-white h-[302px]">
                    <Loader size={100} color="#f5f5f5" />
                </div>
            )}
        </div>
    );
};

export default CurrentWeather;
