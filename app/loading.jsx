import { BarLoader } from "react-spinners"

const PageLoading = () => {
    return (
        <div className='bg-oilblack w-full min-h-screen h-full absolute z-30 top-0 left-0'>
            <div className='flex flex-col items-center justify-center h-full w-full '>
                <BarLoader
                    color="#F5F5F5"
                    height={4}
                    width={200}
                />
            </div>

        </div>
    )
}

export default PageLoading
