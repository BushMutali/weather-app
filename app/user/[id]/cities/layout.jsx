// "use client"
import RightSection from "@components/RightSection"
import SessionProviderWrapper from "@components/SessionProviderWrapper"

const UserCitiesPageLayout = ({children}) => {
  return (
    <SessionProviderWrapper>

    <section className="flex items-start justify-between">
    <section className='p-10 bg-white min-h-screen w-full px-[100px] flex flex-col gap-4'>
        {children}
    </section>
        <RightSection/>
    </section>
  </SessionProviderWrapper>
  )
}

export default UserCitiesPageLayout
