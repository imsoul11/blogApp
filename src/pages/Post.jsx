import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import storageService from "../appwrite/ConfigDatabase";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import blurimg from '../../obj/blurimg.png'
import Loaderv from "../components/Loaderv";
export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();
    const stat = useSelector(state => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    let isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            storageService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    setLoading(false);
                } else {
                    navigate("/");
                }
            }).catch((error) => {
                setLoading(false);
                // Handle error (e.g., show error message)
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    useEffect(() => {
        isAuthor = post && userData ? post.userId === userData.$id : false;
        console.log(stat, 'this is why');
    }, [post, userData, stat]);

    const deletePost = () => {
        storageService.deletePost(post.$id).then((status) => {
            if (status) {
                storageService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return post ? (
        <div className="py-8 relative">
            <Container>
                {loading && <Loaderv />}
                {!loading && (
                    <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                        {storageService.getFilePreview(post.featuredImage) && (
                            <img
                                src={storageService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className={`rounded-xl ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                onLoad={handleImageLoad}
                            />
                        )}

                        {(isAuthor && stat) && (
                            <div className="absolute right-6 top-6 z-10">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="mr-3">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}

                        {/* Background image */}
                        <div
                            className="absolute inset-0 rounded-xl"
                            style={{
                                background: `url(${blurimg}) center/cover`,
                                opacity: imageLoaded ? 0 : 1,
                                transition: 'opacity 200ms ease-in-out',
                            }}
                        ></div>
                    </div>
                )}
                {!loading && (
                    <div className="w-full mb-6">
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                    </div>
                )}
                {!loading && (
                    <div className="browser-css">
                        {parse(post.content)}
                    </div>
                )}
            </Container>
        </div>
    ) : <Loaderv />;
}
