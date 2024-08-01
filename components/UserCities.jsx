"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";

const UserCities = () => {
  const [userCities, setUserCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [cityWeather, setCityWeather] = useState(null);
  const [cityImages, setCityImages] = useState({});

  useEffect(() => {
    const fetchUserCities = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${session?.user.id}/cities`);
        const data = await response.json();
        setUserCities(data);
        if (data.length > 0) {
            // fetch weather for each city
            const weatherRequests = data.map(city =>
              fetch(`/api/weather/cities?cities=${city.city}`).then(res => res.json())
            );
  
            const weatherResponses = await Promise.all(weatherRequests);
            const weatherMap = weatherResponses.reduce((acc, weatherData, index) => {
              acc[data[index].city] = weatherData[0]?.data || null;
              return acc;
            }, {});
            
            setCityWeather(weatherMap);
            
            // Fetch images for each city
          const imageRequests = data.map(city =>
            axios.get('/api/cities/images', { params: { visitorCity: city.city } })
          );

          const imageResponses = await Promise.all(imageRequests);
          const imageMap = imageResponses.reduce((acc, imageResponse, index) => {
            acc[data[index].city] = imageResponse.data.image || '';
            return acc;
          }, {});

          setCityImages(imageMap);
          }
      } catch (error) {
        console.error("Failed to fetch cities", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user.id) fetchUserCities();
  }, [session?.user.id]);

  return (
    <>
      {loading ? (
        <Loader color="#1F2858" size={50} />
      ) : (
        userCities.length > 0 &&
        userCities.map((city) => (
          <div key={city._id} className="flex flex-col items-center gap-2">
            <Link href={`/user/${session?.user.id}/cities/?city=${city.city}`} className="bg-white h-[220px] w-[180px] rounded-[20px] overflow-hidden object-contain relative hover:shadow">
              <div className="absolute hover:bg-opacity-50 bg-opacity-0 w-full h-full bg-black z-0 top-0 left-0 text-white flex transition-all duration-250">
                <div className="flex flex-col items-center justify-center gap-3 absolute h-full w-full">
                  <h1 className='text-4xl'>
                  {cityWeather[city.city]?.main?.temp
                      ? (cityWeather[city.city].main.temp - 273.15)?.toFixed(0)
                      : 'N/A'}&deg;C
                  </h1>
                </div>
              </div>
              <Image
                src={cityImages[city.city]}
                alt={`Image of ${city.city}`}
                width={2520}
                height={1324}
                className="object-cover w-full h-full"
                priority
              />
            </Link>
            <h1 className="font-light text-lg text-primary capitalize">
              {city.city}, {cityWeather[city.city]?.sys?.country || 'N/A'}
            </h1>
          </div>
        ))
      )}
    </>
  );
}

export default UserCities;
