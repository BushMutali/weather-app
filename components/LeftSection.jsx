"use client"
import { useEffect, useState } from "react";
import CitiesFeed from "./CitiesFeed";
import Link from "next/link";

import { useSession } from "next-auth/react";
import NavBar from "./NavBar";

const LeftSection = () => {
    const { data: session } = useSession();
    const [cities, setCities] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [cityInput, setCityInput] = useState('');

    const [nearbyCities, setNearbyCities] = useState([]);

    const fetchCities = async () => {
        const res = await fetch(`/api/weather/cities?cities=${cityInput}`);
        const data = await res.json();
        setCities(data);
    };

    useEffect(() => {
        const fetchNearbyCities = async () => {
            try {
                const res = await fetch('/api/location');
                const locationData = await res.json();
                const [lat, lon] = locationData.loc.split(',').map(coord => parseFloat(coord));
                const citiesRes = await fetch(`/api/location/nearby-cities?lat=${lat}&lon=${lon}`);
                const citiesData = await citiesRes.json();
                setNearbyCities(citiesData);

            } catch (error) {
                console.log(error);
            }
        }
        fetchNearbyCities();
    }, [])
    return (
        <section className='p-10 bg-white min-h-screen w-full px-[100px] flex flex-col gap-4'>
            <NavBar
                cityInput={cityInput}
                fetchCities={fetchCities}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                nearbyCities={nearbyCities}
            />
            <div className="flex flex-col gap-2">
                {session?.user ? (

                    <h1 className="font-extralight text-5xl text-primary tracking-wider">Hello, <span className="font-semibold">{session.user.name}</span></h1>
                ) : (
                    <h1 className="font-extralight text-5xl text-primary tracking-wider">Weather <span className="font-semibold">Forecast</span></h1>
                )}
                <CitiesFeed data={session} />
            </div>
        </section>
    )
}

export default LeftSection
