import PostCard from '@/components/admin-view/postcard';
import CallToAction from '@/components/shopping-view/calltoaction';
import CommentSection from '@/components/shopping-view/comment-section';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const ShoppingPost = () => {
    const {postSlug} = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);
    const [ recentPosts, setRecentPosts] = useState(null);
    
    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:5000/api/admin/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                if(!res.ok){
                    setError(true);
                    setLoading(false);
                    return
                }
                if(res.ok){
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        fetchPost();
    }, [postSlug]);

    useEffect(() => {
        try {
            const fetchRecentPosts = async () => {
                const res = await fetch('http://localhost:5000/api/admin/post/getposts?limit=3');
                const data = await res.json();
                if(res.ok){
                    setRecentPosts(data.posts)
                }
            }
            fetchRecentPosts();
        } catch (error){
            console.log(error.message);
        }
    },[])

  if(loading){
    return (
        <div className='flex justify-center items-center min-h-screen'>
            Loading....
        </div>
    )
  }
  console.log(post)
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
        <h1 className='text-3xl mt-10 p-3 text-center max-w-2xl mx-auto lg:text-4xl'>
            {post && post.title}
        </h1>
        <Link
            className='self-center mt-5'
        >
            <Button color='gray'>
                {post && post.category}
            </Button>
        </Link>
        <img src={post && post.image} alt={post && post.title} className='mt-10 p-3 max-h-[600px] w-full object-cover'/>
        <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
            <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
            <span className='italic'>{post && (post.content.length/1000).toFixed(0)} mins read</span>
        </div>
        <div
            className='p-3 max-w-2xl mx-auto w-full post-content'
            dangerouslySetInnerHTML={{__html: post && post.content}}
        ></div>
        <div className='max-w-4xl mx-auto w-full'>
            <CallToAction />
        </div>
        <CommentSection postId={post._id} />
        <div className='flex flex-col justify-center items-center mb-5'>
            <h1 className='text-xl mt-5'>Recent article</h1>
            <div className='flex flex-wrap gap-5 mt-5 justify-center'>
                {
                    recentPosts && recentPosts.map((post) => <PostCard key={post._id} post={post} />)
                }
            </div>
        </div>
    </main>
  )
}

export default ShoppingPost