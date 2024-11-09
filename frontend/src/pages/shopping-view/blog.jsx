import PostCard from '@/components/admin-view/postcard';
import CallToAction from '@/components/shopping-view/calltoaction';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ShoppingBlog = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`http://localhost:5000/api/admin/post/getPosts`);
            const data = await res.json();
            setPosts(data.posts);
        }
        fetchPosts();
    }, [])
    return (
        <div>
            <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
                <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
                <p>
                    Here you'll find a variety of articles and books on topics such as Math, literatual, Physis, Chemist, Technology
                </p>
                <Link
                    to='/search'
                    className='text-sx sm:text-sm text-teal-500 font-bold hover:underline'
                >
                    View all posts
                </Link>
            </div>
            <div className='p-3 bg-amber-100 dark:bg-slate-700'>
                <CallToAction />
            </div>
            <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
                {
                    posts && posts.length > 0 && (
                        <div className='flex flex-col gap-6'>
                            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
                            <div className='flex flex-wrap gap-4'>
                                {
                                    posts.map((post) => (
                                        <PostCard key={post._id} post={post} />
                                    ))
                                }
                            </div>
                            <Link
                                to='/search'
                                className='text-sx sm:text-sm text-teal-500 font-bold hover:underline'
                            >
                                View all posts
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ShoppingBlog