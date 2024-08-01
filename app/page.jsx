"use client"
import LeftSection from '@components/LeftSection'
import RightSection from '@components/RightSection'
import { useSession } from "next-auth/react"
import PageLoading from './loading'

const HomePage = () => {
  const {data: session , status} = useSession();
   if (status === "loading") return <PageLoading/>;
  return (

      <section className="flex items-start justify-between">
        <LeftSection />

        <RightSection />

      </section>
  )
}

export default HomePage
