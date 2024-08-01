import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const NotFound = () => {
  
  return (
    <div className='bg-white w-full min-h-screen h-full absolute z-30 top-0 left-0'>
      <div className='flex flex-col items-center justify-center h-full w-full '>
        <Image
        src="/assets/images/404.svg"
        alt='404 image'
        width={3333}
        height={3333}
        priority
        className='w-[700px]'
        />
        <Link href="/" className='mt-10 h-[50px] w-[300px] bg-primary text-white text-2xl rounded hover:bg-blue-600 transition-all duration-200 items-center justify-center flex'>
        Go Home
      </Link>
      </div>
      
    </div>
  )
}

export default NotFound
