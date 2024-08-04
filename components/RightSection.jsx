"use client"
import Image from 'next/image'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { RiLogoutCircleRFill } from "react-icons/ri";
import axios from 'axios';

import CurrentWeather from './CurrentWeather';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import PageLoading from '@app/loading';

const RightSection = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [loading, setLoading] = useState(true)

    const [visitorCity, setVisitorCity] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchVisitorCity = async () => {
            try {
                const res = await fetch('/api/location');
                const locationData = await res.json();
                setVisitorCity(locationData.city);
                return locationData.city;
            } catch (error) {
                console.log(error);
            }
        };

        const fetchCityImage = async (city) => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/cities/images`, {
                    params: { visitorCity: city },
                });
                setImageUrl(response.data.image);
            } catch (error) {
                console.error('Error fetching city image:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchData = async () => {
            const city = await fetchVisitorCity();
            if (city) {
                fetchCityImage(city);
            }
        };

        const setUpProviders = async () => {
            try {
                const response = await getProviders();
                setProviders(response);
            } catch (error) {
                console.error('Error fetching providers:', error);
            }
        };
        setUpProviders();
        fetchData();
    }, []);

    if (loading) {
        return <PageLoading />
    }
    return (
        <section className={` right_sec 
            p-8 bg-oilblack w-full lg:h-full  text-white h-full
            ${session ? 'lg:w-[500px] lg:min-h-screen relative top-0 left-0' : 'absolute z-50 top-0 left-0 min-h-[100vh] w-full lg:w-[600px]'} md:relative sm:relative relative object-contain bg-blend-screen
          `}>
            {session?.user ? (
                <div className="flex items-center justify-between gap-3 lg:mb-24 mb-10 sm:mb-10 md:mb-10 relative z-10">
                    <h1 className='text-lg text-white font-medium inline-flex items-center gap-2 tracking-wide'>
                        <span className='hidden lg:block md:block sm:block'>
                            Notifications
                        </span>
                        <span className='lg:hidden md:hidden sm:hidden'>
                            Notis
                        </span>
                        <span className='h-[23px] w-[23px] inline-flex items-center justify-center bg-red-500 rounded cursor-pointer'>
                            3
                        </span>
                    </h1>
                    <div className='flex items-center justify-end w-full gap-3'>
                        <Link href="/" className='overflow-hidden h-[50px] w-[50px] rounded object-contain'>
                            <Image
                                src={session?.user.image}
                                width={50}
                                height={50}
                                alt='profile picture'
                                className='object-contain'
                            />
                        </Link>
                        <button onClick={() => { signOut() }} className='h-[50px] w-[50px] md:w-[100px] bg-blue-500 inline-flex items-center justify-center rounded  hover:bg-red-500 lg:hidden sm:inline-flex md:inline-flex'>
                            <RiLogoutCircleRFill className="text-2xl md:hidden" />
                            <span className='hidden md:block'>Sign Out</span>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-between gap-3 mb-24 w-full relative z-10">
                    <h1 className='text-lg text-white font-medium inline-flex items-center gap-2 tracking-wide w-full'>Login to add cities ❤️</h1>
                    <div className='flex items-center justify-end w-full gap-3'>
                        <Link href="auth/sign-in" className='w-auto bg-blue-500 p-3 rounded hover:bg-blue-800 duration-200'>
                            Login
                        </Link>

                    </div>
                </div>
            )}

            <CurrentWeather />
            {session?.user && (

                <div className='absolute bottom-14 left-10 z-10'>
                    <button onClick={() => { signOut() }} className='p-2 bg-blue-500 w-[200px] h-[45px] rounded lg:inline-flex sm:hidden md:hidden items-center justify-center gap-4 text-lg hover:bg-red-500 transition-all duration-200 hidden '>Logout <RiLogoutCircleRFill /></button>
                </div>
            )}
            <Image
                src={imageUrl}
                alt='img'
                width={2520}
                height={1324}
                className='z-0 absolute top-0 left-0 w-full h-full object-cover opacity-30 bg-blend-screen'
                priority
            />
        </section>
    )
}

export default RightSection
