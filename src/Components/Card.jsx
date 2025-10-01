import React, { use, useEffect, useState } from 'react'

const Card = ({MovieName,MovieDis}) =>{
  const [Liked, setLiked] = React.useState(false);
  const [Count,setCount] = useState(0);
  useEffect(() => {
    setCount(Count+1)
  }, [Liked]);

  return(
    <>
      <div className='max-w-sm rounded overflow-hidden shadow-lg m-4'>
        <img className='w-full' src='https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' alt='Sunset in the mountains'/>
          <div className='px-6 py-4'>
              <div className='font-bold text-purple-500 text-xl mb-2'>{MovieName}</div>
                <p className='text-gray-700 text-base'>
                  {MovieDis}
                  {(Count>0) ? ` This card is clicked ${Count} times` : null}
                </p>
                <button className={`px-4 py-2 mt-4 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm ${Liked ? 'bg-red-500' : 'bg-cyan-500'}`} onClick={() => setLiked(!Liked)}>
                  {Liked ? 'Liked' : 'Like'}
                </button>
          </div>
        </div>
      </>
  )
}

export default Card