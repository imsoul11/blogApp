import React ,{useState,useEffect}from 'react'
import { Container,PostCard } from '../components'
import storageService from '../appwrite/ConfigDatabase'
import { useSelector } from 'react-redux'
import Loaderv from '../components/Loaderv'
function AllPosts() {
    const [posts,setPosts] = useState([])
    const userData = useSelector((state) => state.auth.userData);
    const stat = useSelector(state => state.auth.status);
    const [loader,setloader] = useState(true)
    useEffect(()=>{
        console.log(userData.$id)
        storageService.getPosts([]).then((posts)=>{
            const pp=posts.documents.filter(p => p.userId == userData.$id )
            if(pp)
            {
            setPosts(pp)
            setloader(false)
            }
        })
    },[stat])
    
    // console.log(posts.length)
  if(loader)
  return <Loaderv/>
  else
  {
    if (!posts.length) {
        return (
            <div className='h-full flex flex-col items-center justify-center text-center'>
            <p className='text-gray-500 mt-56 mb-96 text-2xl font-semibold animate-pulse '>You haven't posted yet.
            </p>
            
            
        </div>
        );
    }
    

  return (
    <div className='w-full flex flex-wrap py-8'>
        <Container>
            <div className='flex flex-wrap justify-center'>
            {posts.map((post)=>(
                <div key={post.$id} className='p-2 w-81'>
                <PostCard {...post}/>
                </div>
            ))}
            </div>
        </Container>
    </div>
  )
}
}

export default AllPosts