import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import storageService from '../appwrite/ConfigDatabase'
import blurimg from '../../obj/blurimg.png'

function Postcard({ $id, title, featuredImage, content }) {
  const imageSrc = storageService.getFilePreview(featuredImage);

  return (
    <Link to={`/post/${$id}`}>
      <div className=' flex flex-col justify-center text-center items-center bg-gray-200 shadow-xl rounded-lg p-4  transition-all hover:shadow-2xl h-50'>
        <div className=' rounded-lg' style={{ backgroundImage: `url(${blurimg})`, backgroundPosition: 'center', backgroundSize: 'cover', transition: 'opacity 200ms ease-in-out' }}>
          {imageSrc && (
            <img
              src={imageSrc}
              alt={title}
              className='object-cover w-full h-48 rounded-lg'
              loading='lazy'
              style={{ transition: 'opacity 200ms' }}
            />
          )}
        </div>
        <div className='flex flex-col items-center justify-center m-2'>
          <h2 className='text-xl font-semibold text-gray-700  '>{title}</h2>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </Link>
  );
}

export default Postcard;