// "use client"
import RightSection from "@components/RightSection"
import SessionProviderWrapper from "@components/SessionProviderWrapper"

const UserCitiesPageLayout = ({children}) => {
  return (
    <SessionProviderWrapper>

    <section className="flex items-start justify-between flex-col lg:flex-row sm-flex-col md:flex-col h-full">
    <RightSection/>
    <section className='lg:p-10 sm:p-4 md:p-4 p-4 bg-white min-h-screen w-full lg:px-[100px] flex flex-col gap-4'>
        {children}
    </section>
        
    </section>
  </SessionProviderWrapper>
  )
}

export default UserCitiesPageLayout
