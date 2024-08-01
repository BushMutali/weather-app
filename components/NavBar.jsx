import { CiSearch } from "react-icons/ci";
import { FaCaretUp, FaCaretDown } from "react-icons/fa6";
import Link from "next/link";

const NavBar = ({cityInput, fetchCities, isOpen, setIsOpen, nearbyCities}) => {
  return (
    <div className="flex items-center justify-start font-light text-black mb-10">
                <div className="relative w-full">
                    <CiSearch className="text-2xl absolute top-3 left-3" />
                    <input
                        type="text"
                        name="city"
                        id="city"
                        value={cityInput}
                        onChange={(e) => setCityInput(e.target.value)}
                        placeholder="Search new place.."
                        className="border-gray-200 outline-none h-[45px] border px-5 pl-10 w-[350px]"
                    />
                    <button onClick={fetchCities} className="mx-3 h-[45px] w-[100px] bg-gray-700 text-white text-lg hover:bg-primary duration-200 rounded">Search</button>
                </div>

                <div className="w-[300px] relative">
                    <button
                        onClick={() => setIsOpen((prev) => !prev)}
                        className=" p-4 w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-transparent border active:border-gray-300 duration-300 active:text-primary">
                        Nearby Cities
                        {isOpen ? (
                            <FaCaretUp />
                        ) : (
                            <FaCaretDown />
                        )}

                    </button>
                    {isOpen && (
                        <div className="bg-gray-200 absolute top-20 flex flex-col items-start rounded-lg p-2 w-full duration-300 text-black shadow">
                            {nearbyCities.map(city => (
                                <Link href={`/${city.name}`} key={city.geonameId} className="flex w-full justify-between items-center hover:bg-blue-300 cursor-pointer rounded-r-lg border-l-transparent hover:border-l-white border-l-4 p-4 duration-200 hover:text-white">
                                    <h3 className="font-light text-sm">{city.name}, {city.countryName}</h3>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
  )
}

export default NavBar
