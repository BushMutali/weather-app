"use client"
import Image from 'next/image'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { RiLogoutCircleRFill } from "react-icons/ri";

import CurrentWeather from './CurrentWeather';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const RightSection = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders();
    }, [])
    return (
        <section className="p-10 bg-oilblack w-[600px] min-h-screen text-white relative">
            {session?.user ? (
                <div className="flex items-center justify-between gap-3 mb-24">
                    <h1 className='text-lg text-white font-medium inline-flex items-center gap-2 tracking-wide'>Notifications <span className='h-[23px] w-[23px] inline-flex items-center justify-center bg-red-500 rounded cursor-pointer'>3</span></h1>
                    <div className='overflow-hidden h-[50px] w-[50px] rounded object-contain'>
                        <Link href="/">
                            <Image
                                src={session?.user.image}
                                width={50}
                                height={50}
                                alt='profile picture'
                                className='object-contain'
                            />
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-between gap-3 mb-24">
                    <h1 className='text-lg text-white font-medium inline-flex items-center gap-2 tracking-wide'>Login to add cities ❤️</h1>
                    <div>
                        <Link href="/api/auth/signin" className='w-full bg-blue-500 p-3 rounded hover:bg-blue-800 duration-200'>
                            Login
                        </Link>
                    </div>
                </div>
            )}

            <CurrentWeather />
            <div className="flex flex-col items-start justify-center gap-2 text-white mt-10">
                <h1 className='text-xl tracking-wider'>Chance of rain</h1>
            </div>
            {session?.user && (

                <div className='absolute bottom-14 left-10'>
                    <button onClick={() => { signOut() }} className='p-2 bg-red-500 w-[200px] h-[45px] rounded inline-flex items-center justify-center gap-4 text-lg hover:bg-red-900 transition-all duration-200'>Logout <RiLogoutCircleRFill /></button>
                </div>
            )}
        </section>
    )
}

export default RightSection
