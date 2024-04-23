import React,{useEffect, useState} from 'react'
import storageService from '../appwrite/ConfigDatabase'
import { Container,PostCard } from '../components'
import { useSelector } from 'react-redux'
import VideoBackground from '../components/VideoBackground';
import Loaderv from '../components/Loaderv';

function Home() {
    const stat = useSelector(state => state.auth.status);
    const [loader,setloader] = useState(true)
    const [posts,setPosts] = useState([])
    useEffect(()=>{
        storageService.getPosts([]).then((posts)=>{
            if(posts)
            {
            setPosts(posts.documents)
            setloader(false)
            }
        })
    },[])
    
    console.log(posts.length)
    if (!stat) {
        console.log(posts.length, 'is not zero')
        return (
            // <div className="w-full py-8 mt-40 mb-64 text-center">
            //     <Container>
            //         <div className="flex flex-wrap">
            //             <div className="p-2 w-full">
            //                 <h1 className="text-2xl font-bold hover:text-gray-500">
            //                     Login to read posts
            //                 </h1>
            //             </div>
            //         </div>
            //     </Container>
            // </div>
            <>
            <div className="relative w-full h-screen overflow-hidden flex justify-center items-center">
    <p className="absolute top-72 mr-56 text-white font-bold text-4xl animate-pulse z-10">
        Login to see posts
    </p>
    <VideoBackground/>
</div>
</>
        )
    }
    else {
        return loader ? (
            <Loaderv />
        ) :
        
         (
            
            <div className='w-full flex flex-wrap py-8'>
                <Container>
                    <div className='flex flex-wrap justify-center' style={{ transition: 'opacity 1s', opacity: 1 , transitionDuration: 1}}>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-81' >
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        );
    }
}

export default Home