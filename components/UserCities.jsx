"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { FaRegStar, FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const UserCities = ({ refreshTrigger }) => {
  const [userCities, setUserCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [cityWeather, setCityWeather] = useState({});
  const [cityImages, setCityImages] = useState({});
  const [favInfo, setFavInfo] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchUserCities = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${session?.user.id}/cities`);
        const data = await response.json();
        setUserCities(data);
        if (data.length > 0) {
          const weatherRequests = data.map(city =>
            fetch(`/api/weather/cities?cities=${city.city}`).then(res => res.json())
          );

          const weatherResponses = await Promise.all(weatherRequests);
          const weatherMap = weatherResponses.reduce((acc, weatherData, index) => {
            const cityData = weatherData[0]?.data || null;
            if (cityData) {
              acc[data[index].city] = {
                ...cityData,
                iconUrl: `https://openweathermap.org/img/wn/${cityData.weather[0].icon}.png`,
              };
            }
            return acc;
          }, {});

          setCityWeather(weatherMap);

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
  }, [session?.user.id, refreshTrigger]);

  const toggleFavourite = async (cityId, newFav) => {
    try {
      setLoaded(true);
      const response = await fetch(`/api/city/${cityId}`, {
        method: 'PATCH',
        body: JSON.stringify({ fav: newFav }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setUserCities(prevCities =>
          prevCities.map(city =>
            city._id === cityId ? { ...city, fav: newFav } : city
          )
        );
        setFavInfo(newFav);
        setTimeout(() => {
          setFavInfo(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Failed to update favourite status", error);
    } finally {
      setLoaded(false);
    }
  };

  const handleDelete = async (city) => {
    const hasConfirmed = confirm(`Are you sure you want to delete "${city.city}"?`);
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/city/${city._id.toString()}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          setUserCities(prevCities =>
            prevCities.filter(c => c._id !== city._id)
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {favInfo && (
        <span className={`absolute top-[-30px] transition-opacity duration-700 ${favInfo ? 'opacity-100' : 'opacity-0'} text-gray-500 text-sm font-extralight italic`}>
          {favInfo === 'yes' ? 'Added to favourites' : 'Removed from favourites'}
        </span>
      )}

      {loading ? (
        <Loader color="#1F2858" size={50} />
      ) : (
        userCities.length > 0 &&
        userCities.map((city) => (
          <div key={city._id} className="flex flex-col items-center gap-2 relative">
            <Link href={`/user/${session?.user.id}/cities/?city=${city.city}`} className="bg-white h-[220px] w-[180px] rounded-[20px] overflow-hidden object-contain relative hover:shadow">
              <div className="absolute hover:bg-opacity-50 bg-opacity-0 w-full h-full bg-black z-0 top-0 left-0 text-white flex transition-all duration-250">
                <div className="flex flex-col items-center justify-center gap-2 absolute h-full w-full">
                {cityWeather[city.city]?.iconUrl && (
                    <Image
                      src={cityWeather[city.city].iconUrl}
                      alt="Weather icon"
                      width={30}
                      height={30}
                      className="object-cover"
                    />
                  )}
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
            <h1 className="font-light text-lg text-primary capitalize inline-flex items-center justify-start gap-2 w-full">
              {city.city}, {cityWeather[city.city]?.sys?.country}
            </h1>
            {!loaded ? (
              city.fav === 'yes' ? (
                <FaStar onClick={() => toggleFavourite(city._id, 'no')} className="absolute top-2 right-2 text-xl text-white items-center cursor-pointer bg-primary h-[20px] w-[20px] rounded-full p-1" key={city._id} />
              ) : (
                <FaRegStar onClick={() => toggleFavourite(city._id, 'yes')} className="absolute top-2 right-2 text-xl cursor-pointer bg-gray-100 h-[20px] w-[20px] rounded-full p-1" key={city._id} />
              )
            ) : (
              <div className="loading absolute top-2 right-2"></div>
            )}
            <MdDelete onClick={() => handleDelete(city)} className="absolute bottom-11 right-2 text-xl text-white cursor-pointer bg-red-500 h-[25px] w-[25px] rounded-full p-1" />
          </div>
        ))
      )}
    </>
  );
}

export default UserCities;
