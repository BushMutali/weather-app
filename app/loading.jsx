import { BarLoader } from "react-spinners"

const PageLoading = () => {
    return (
        <div className='bg-white w-full min-h-screen h-full absolute z-30 top-0 left-0'>
            <div className='flex flex-col items-center justify-center h-full w-full '>
                <BarLoader
                    color="#0B1215"
                    height={4}
                    width={500}
                />
            </div>

        </div>
    )
}

export default PageLoading
