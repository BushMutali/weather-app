import Image from "next/image";
import Link from "next/link";
import { FaCloudRain } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { CiTempHigh } from "react-icons/ci";
import Loader from "./Loader";

const SearchFeed = ({ cities, cityImages, data, loading }) => {



    return (
        <div className='mt-4 w-full h-[400px] flex items-center justify-start gap-10 overflow-x-scroll'>
            {!loading ? (
                
                    cities.map((cityData) => {
                        const city = cityData.data;
                        const temperatureCelsius = (city.main.temp - 273.15).toFixed(0);
                        const feelsLikeCelsius = (city.main.feels_like - 273.15).toFixed(0);
                        const sunsetTime = new Date(city.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        const cityImage = cityImages[cityData.city];
                        const weatherIcon = `https://openweathermap.org/img/wn/${city.weather[0].icon}.png`
                        const url = data ? `/user/${data.user.id}/cities/?city=${city.name}` : 'api/auth/signin/';

                        return (
                            <Link href={url} key={city.id} className="bg-black border border-gray-400 w-[200px] h-[300px] max-h-[300px] flex flex-col items-center justify-center p-3 rounded-lg text-white relative overflow-hidden shadow">
                                <Image
                                    src={cityImage}
                                    alt={`${city.name} image`}
                                    width={2520}
                                    height={1324}
                                    className="absolute top-0 left-0 object-cover w-full h-full z-0 opacity-20 bg-blend-screen"
                                />
                                <div className="flex items-center justify-between gap-3 relative z-10">
                                    {/* <FaCloudRain className='text-2xl text-blue-500' /> */}
                                    <Image
                                        src={weatherIcon}
                                        alt={`${city.name} weather icon`}
                                        width={30}
                                        height={30}
                                        className="text-white"
                                    />
                                    <div className="flex flex-col items-start justify-center">
                                        <h1 className='text-xl'>{city.name}</h1>
                                        <span className='text-sm text-gray-400 capitalize' >{city.weather[0].description}</span>
                                    </div>
                                </div>
                                <div className="flex items-start justify-start relative z-10">
                                    <h1 className='text-[50px] font-extralight'>{temperatureCelsius}</h1>
                                    <h5 className='text-2xl font-light mt-2'>&deg; C</h5>
                                </div>
                                <div className="inline-flex items-center gap-1 text-gray-400 relative z-10">
                                    <FaLocationDot />
                                    <h1 className='font-extralight'>{city.name}, {city.sys.country}</h1>
                                </div>
                                <div className="flex flex-col items-start justify-center gap-1 mt-5 text-white relative z-10 bg-gray-600 w-full rounded-lg">
                                    <h1 className='font-light text-sm border-b-1 border-gray-500 w-full p-1 inline-flex items-center justify-start gap-1'>
                                        <CiTempHigh />
                                        Feels like {feelsLikeCelsius}&deg;C
                                    </h1>
                                    <h1 className='font-light text-sm p-1 inline-flex items-center justify-start gap-1'>
                                        Sunset {sunsetTime}
                                    </h1>
                                </div>
                            </Link>
                        );
                    })
                
            ) : (
                <Loader size={50} color="#1F2858" className="flex items-center justify-center" />
            )}
        </div>
    )
};

export default SearchFeed;
