import React, { useRef, useEffect, useState } from 'react';
import bgvideo from '../../obj/video.mp4';

function VideoBackground() {
    const videoRef = useRef(null);
    const [opacity, setOpacity] = useState(1);

    return (
        <div className="relative w-full h-screen overflow-hidden flex justify-center items-center">
        
            <video
                ref={videoRef}
                src={bgvideo}
                autoPlay
                muted
                loop
                className='object-cover h-full w-full'
                style={{overflow:'hidden'}}
                
            ></video>
        </div>
    );
}

export default VideoBackground;
