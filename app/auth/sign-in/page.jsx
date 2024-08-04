"use client"
import { signIn, getProviders } from "next-auth/react"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import PageLoading from "@app/loading";

const LoginPage = () => {
  const router = useRouter();
  const [providers, setProviders] = useState(null);
  const [loadingProviders, setLoadingProviders] = useState(true); // New state for loading
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return; 

    if (session) {
      router.push('/');
    }
  }, [session, status, router]);

  useEffect(() => {
    const setUpProviders = async () => {
      try {
        const response = await getProviders();
        setProviders(response);
      } catch (error) {
        console.error('Failed to fetch providers:', error);
      } finally {
        setLoadingProviders(false);
      }
    };
    setUpProviders();
  }, []);

  if (loadingProviders) {
    return <PageLoading />
  }
  return (
    <div className='flex items-center justify-center bg-white w-full max-h-screen p-10'>
      <div className="flex flex-col items-center justify-center w-[400px] gap-3">
        <h1 className='text-4xl text-primary uppercase tracking-wider'>Sign In</h1>
        <form className='w-full mt-5 flex flex-col items-center justify-center gap-2'>
          <div className="w-full mb-3">
            <input type="text" placeholder='Enter your email' className='h-[50px] w-full outline-none border border-gray-300 text-black font-extralight px-4 rounded-md' />
          </div>
          <div className="w-full mb-3">
            <button type="button" placeholder='Enter your email' className='h-[50px] w-full outline-none bg-primary font-semibold px-4 rounded-md text-xl text-white uppercase hover:bg-oilblack duration-300'> Sign In</button>
          </div>
        </form>
        <div className="w-full">
          <h1 className='text-gray-500 font-extralight tracking-wider'>Continue with</h1>
          <div className="flex items-center justify-center gap-4">
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className=" h-[50px] w-[50px] rounded-full object-contain inline-flex items-center shadow"
                >
                  <Image
                    src={`/assets/images/${provider.name}.svg`}
                    alt={provider.name}
                    width={50}
                    height={50}
                    className="object-cover"
                  />
                </button>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
