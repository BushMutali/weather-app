"use client"
import { useEffect, useState } from 'react'

const AddCityForm = ({ type, post, setPost, sending, handleSubmit, errorMessage }) => {
  const [visibleErrorMessage, setVisibleErrorMessage] = useState('');

  useEffect(() => {
    if (errorMessage) {
      setVisibleErrorMessage(errorMessage);
      const timer = setTimeout(() => {
        setVisibleErrorMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);


  return (
    <form className='flex flex-col space-y-4' autoComplete='off' onSubmit={handleSubmit}>
      {visibleErrorMessage && (

        <span className={`bg-red-600 p-1 text-center mx-5 font-normal transition-opacity duration-300 ${visibleErrorMessage ? 'opacity-100' : 'opacity-0'}`}>{visibleErrorMessage}</span>
      )}
      <div>
        <label htmlFor="" className='text-sm '>City Name</label>
        <input
          type="text"
          name='username'
          id='username'
          value={post.city}
          onChange={(e) => setPost({ ...post, city: e.target.value })}
          placeholder='City name'
          className='ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-primary border text-primary'
          required
          autoFocus />
      </div>

      <button
        type='submit'
        className={`bg-secondary inline-flex items-center gap-3 self-start text-white font-bold rounded-lg py-2 px-6 uppercase text-sm transition-all ${sending ? 'opacity-50 cursor-not-allowed' : ''} hover:bg-blue-500`}
        disabled={sending}>
        {sending ? (
          <>Adding <div class="loader"></div></>
        ) : (
          <>{type} City</>
        )}
      </button>
    </form>
  )
}

export default AddCityForm
