import React,{useEffect,useState} from "react";
import {Container,PostForm} from '../components'
import storageService from "../appwrite/ConfigDatabase";
import { useNavigate,useParams } from "react-router-dom";
import Loaderv from "../components/Loaderv";



function EditPost() {
    const [post,setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    const [loader,setLoader]= useState(true)
     useEffect(()=>{
        if(slug)
        {
            storageService.getPost(slug).then((post)=>{
                if(post)
                {
                    setPosts(post)
                    setLoader(false)
                }

            })
        } else{
            navigate('/')
        }

     },[slug,navigate])
     return post ?(
        <div className="py-8">
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
     ):<Loaderv/>
  
}

export default EditPost