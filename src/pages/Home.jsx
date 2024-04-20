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
            <VideoBackground/>
        )
    }
    else {
        return loader ? (
            <Loaderv />
        ) :
        
         (
            
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap' style={{ transition: 'opacity 1s', opacity: 1 , transitionDuration: 1}}>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-full' >
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