import React from 'react';
import loadervid from '../../obj/loadervideo.mp4';

function Loaderv() {
    return (
        <div className=''>
            <video src={loadervid} autoPlay loop muted playsInline className='pt-12 pb-20'> 
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default Loaderv;
