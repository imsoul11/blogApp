import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import storageService from '../appwrite/ConfigDatabase'
import blurimg from '../../obj/blurimg.png'

function Postcard({ $id, title, featuredImage, content }) {
  const imageSrc = storageService.getFilePreview(featuredImage);

  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full flex bg-gray-200 justify-between shadow-xl rounded-lg p-4  transition-all hover:shadow-2xl'>
        <div className='w-56 justify-center mr-4 rounded-lg' style={{ backgroundImage: `url(${blurimg})`, backgroundPosition: 'center', backgroundSize: 'cover', transition: 'opacity 200ms ease-in-out' }}>
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
        <div className='flex flex-col w-full ml-4'>
          <h2 className='text-xl font-semibold text-gray-700 w-3/4 '>{title}</h2>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </Link>
  );
}

export default Postcard;