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
        <section className={`lg:p-10 p-8 sm:p-8 md:p-8 bg-oilblack w-full lg:[w-200px] sm:w-full md:w-full h-full lg:min-h-screen text-white ${session ? '' : 'absolute z-20 top-0 left-0 max-h-[100vh]'}`}>
            {session?.user ? (
                <div className="flex items-center justify-between gap-3 lg:mb-24 mb-10 sm:mb-10 md:mb-10">
                    <h1 className='text-lg text-white font-medium inline-flex items-center gap-2 tracking-wide'>Notifications <span className='h-[23px] w-[23px] inline-flex items-center justify-center bg-red-500 rounded cursor-pointer'>3</span></h1>
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
                        <button onClick={() => { signOut() }} className='h-[50px] w-[50px] bg-red-300 inline-flex items-center justify-center rounded text-2xl hover:bg-red-500 lg:hidden sm:inline-flex md:inline-flex'>
                            <RiLogoutCircleRFill />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-between gap-3 mb-24 w-full">
                    <h1 className='text-lg text-white font-medium inline-flex items-center gap-2 tracking-wide w-full'>Login to add cities ❤️</h1>
                    <div className='flex items-center justify-end w-full gap-3'>
                        <Link href="/api/auth/signin" className='w-auto bg-blue-500 p-3 rounded hover:bg-blue-800 duration-200'>
                            Login
                        </Link>

                    </div>
                </div>
            )}

            <CurrentWeather />
            {/* chance of rain  */}
            {session?.user && (

                <div className='absolute bottom-14 left-10'>
                    <button onClick={() => { signOut() }} className='p-2 bg-red-500 w-[200px] h-[45px] rounded lg:inline-flex sm:hidden md:hidden items-center justify-center gap-4 text-lg hover:bg-red-900 transition-all duration-200 hidden '>Logout <RiLogoutCircleRFill /></button>
                </div>
            )}

        </section>
    )
}

export default RightSection
