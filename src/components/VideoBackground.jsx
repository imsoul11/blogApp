import React, { useRef, useEffect, useState } from 'react';
import bgvideo from '../../obj/video.mp4';

function VideoBackground() {
    const videoRef = useRef(null);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const video = videoRef.current;

        const handleTimeUpdate = () => {
            if (video.currentTime >= 10) {
                video.currentTime = 0; // Reset to the beginning
            }

            // Calculate opacity based on current time
            const newOpacity = 0.6 + Math.sin(video.currentTime * Math.PI) * 0.3;
            setOpacity(newOpacity);
        };

        video.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden flex justify-center items-center">
            <p className="absolute text-white font-bold text-4xl transform -translate-x-1/2 -translate-y-1/2 rounded-md py-2 px-4 transition duration-700 z-3" style={{ opacity }}>
                Login to see posts
            </p>
            <video
                ref={videoRef}
                src={bgvideo}
                autoPlay
                muted
                loop
                className='object-cover'
                
            ></video>
        </div>
    );
}

export default VideoBackground;
