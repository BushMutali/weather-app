"use client";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PageLoading from "@app/loading";
import Image from "next/image";

const UserCitiesPage = () => {
    const { data: session , status} = useSession();
    const router = useRouter()
    const searchParams = useSearchParams();
    const cityName = searchParams.get('city');
    const [cityWeather, setCityWeather] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [loading, setLoading] = useState(true);

   

    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    useEffect(() => {

       if (status === "loading") return;
       if (!session) {
           router.push('/');
           return;
       }

        const fetchCityWeather = async () => {
            try {
                const weatherRes = await fetch(`/api/weather/cities?cities=${cityName}`);
                const weatherData = await weatherRes.json();
                if (weatherData && weatherData[0]?.data) {
                    setCityWeather(weatherData[0].data);
                }
            } catch (error) {
                console.error('Error fetching city weather:', error);
            }
        };

        const fetchCityImage = async () => {
            try {
                const response = await axios.get(`/api/cities/images`, {
                    params: { visitorCity: cityName },
                });
                setImageUrl(response.data.image);
            } catch (error) {
                console.error('Error fetching city image:', error);
            }
        };

        const fetchData = async () => {
            setLoading(true);
            const weatherData = await fetchCityWeather();
            await fetchCityImage();
            setLoading(false);
        };

        fetchData();
    }, [cityName, session, status, router]);

    if (loading) return <PageLoading />;

    return (
        <div className="flex flex-col gap-2 relative">
            {session?.user ? (
                <h1 className="font-extralight lg:text-5xl text-lg sm:text-lg text-primary tracking-wider capitalize">
                    {cityName}, 
                    <span className="font-semibold"> {cityWeather?.sys?.country}</span>
                </h1>
            ) : (
                <h1 className="font-extralight lg:text-5xl text-lg sm:text-lg md:text-lg text-primary tracking-wider">
                    Weather <span className="font-semibold">Forecast</span>
                </h1>
            )}
            <div className="bg-oilblack py-5 h-full w-full lg:min-h-[80vh] min-h-[50vh] absolute object-contain overflow-hidden z-0 top-12 left-0 duration-250 transition-all rounded-lg lg:mt-10 mt-3">
                <Image
                    src={imageUrl}
                    alt="city image"
                    height={1324}
                    width={2520}
                    className="object-cover w-full h-full rounded-sm"
                />
            </div>
        </div>
    );
};

export default UserCitiesPage;
