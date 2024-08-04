"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Loader from './Loader';
import axios from 'axios';
import { CiSquarePlus } from 'react-icons/ci';
import { IoCloseCircle } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import AddCityForm from './AddCityForm';
import UserCities from './UserCities';

const CitiesFeed = ({ data }) => {
  const router = useRouter();
  const [visitorCity, setVisitorCity] = useState('');
  const [visitorCountry, setVisitorCountry] = useState('');
  const [loaded, setIsLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [visitorWeather, setVisitorWeather] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [post, setPost] = useState({ city: '' });

  const addCity = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await fetch('/api/city/new', {
        method: 'POST',
        body: JSON.stringify({
          city: post.city,
          userId: data?.user.id,
        })
      });

      if (response.ok) {
        setShowForm(false);
        setPost({ city: '' });
        handleCityAdded();
      } else if (response.status === 400) {
        setErrorMessage('Invalid city name');
        setPost({ city: '' });
      } else if (response.status === 401) {
        setErrorMessage('You must be logged in to add a city.');
      } else if (response.status === 500) {
        setErrorMessage('Server error. Please try again later.');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSending(false);
    }
  };

  const handleCityAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
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
        return locationData.city;
      } catch (error) {
        console.error('Error fetching visitor location:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    const fetchCityImage = async (city) => {
      try {
        const response = await axios.get(`/api/cities/images`, {
          params: { visitorCity: city },
        });
        setImageUrl(response.data.image);
      } catch (error) {
        console.error('Error fetching city image:', error);
      }
    };

    const fetchData = async () => {
      const city = await fetchVisitorLocation();
      if (city) {
        fetchCityImage(city);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex items-center justify-start w-full mt-10 relative gap-10 flex-wrap">
        {data ? (
          <>
            <button onClick={() => setShowForm((prev) => !prev)} className="border border-primary h-[250px] w-[180px] rounded-[30px] overflow-hidden object-contain flex items-center justify-center flex-wrap flex-col gap-3">
              <CiSquarePlus className='text-4xl text-primary' />
              <h1 className='text-primary'>Add City</h1>
            </button>
          </>
        ) : (
          <Link href="/api/auth/signin" className="border border-primary h-[250px] w-[180px] rounded-[30px] overflow-hidden object-contain flex items-center justify-center flex-wrap flex-col gap-3">
            <CiSquarePlus className='text-4xl text-primary' />
            <h1 className='text-primary'>Add City</h1>
          </Link>
        )}


        {data && <UserCities refreshTrigger={refreshTrigger} />}
      </div>

      <div className={`text-white w-full absolute flex items-start justify-center ${showForm ? 'top-0' : 'top-[-300px]'} left-0 p-10 z-20 duration-700 transition-all`}>
        <div className="bg-primary rounded-xl shadow-lg p-8 text-text w-[500px] relative">
          <IoCloseCircle onClick={() => setShowForm((prev) => !prev)} className='absolute right-3 top-3 text-2xl text-white cursor-pointer' />
          <AddCityForm
            type="add"
            post={post}
            setPost={setPost}
            sending={sending}
            handleSubmit={addCity}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    </>
  );
};

export default CitiesFeed;
