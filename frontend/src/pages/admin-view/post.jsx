import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const AdminPost = () => {
    const { user } = useSelector(state => state.auth);
    const [userPosts, setUserPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/admin/post/getposts?userId=${user.id}`);
                const data = await res.json();
                if (res.ok) {
                    setUserPosts(data.posts);
                    if (data.posts.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        if (user.role === 'admin') {
            fetchPost();
        }
    }, [user.id]);

    const handleShowMore = async () => {
        const startIndex = userPosts.length;
        try {
            const res = await fetch(`http://localhost:5000/api/admin/post/getposts?userId=${user.id}&startIndex=${startIndex}`, { credentials: 'include' });
            const data = await res.json();
            if (res.ok) {
                setUserPosts((prev) => [...prev, ...data.posts]);
                if (data.posts.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleDeletePost = async () => {
        setShowModal(false);
        try {
            const res = await fetch(`http://localhost:5000/api/admin/post/deletepost/${postIdToDelete}/${user.id}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete))
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <>
            <div className='mb-4'>
                <Link to='/admin/createpost'>
                    <Button>Add Post</Button>
                </Link>
            </div>
            <div className='border border-2'>
                {
                    user.role === 'admin' && userPosts.length > 0 ?
                        (
                            <>
                                <Table>
                                    <TableHeader className='bg-slate-200'>
                                        <TableRow>
                                            <TableHead>Date updated</TableHead>
                                            <TableHead>Post image</TableHead>
                                            <TableHead>Post title</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Delete</TableHead>
                                            <TableHead><span>Edit</span></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {userPosts.map((post) => (
                                            <TableRow key={post._id}>
                                                <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
                                                <TableCell>
                                                    <Link to={`/post/${post.slug}`}>
                                                        <img src={post.image} alt={post.title} className='w-20 h-10 object-cover bg-gray-500' />
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>
                                                        {post.title}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>{post.category}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        onClick={() => {
                                                            setShowModal(true)
                                                            setPostIdToDelete(post._id)
                                                        }}
                                                        className='font-medium text-red-500 hover:underline cursor-pointer'
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Link className='text-teal-500 hover:underline' to={`/admin/updatepost/${post._id}`}>
                                                        <Button>
                                                            Edit
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                {
                                    showMore && (
                                        <button
                                            onClick={handleShowMore}
                                            className='w-full text-teal-500 self-center text-sm py-7'
                                        >
                                            Show more
                                        </button>
                                    )
                                }
                            </>
                        ) : (
                            <p>
                                You have no posts yet!
                            </p>
                        )
                }
                <Dialog open={showModal} onOpenChange={() => setShowModal(false)}>
                    <DialogContent>
                        <div className='text-center'>
                            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                                Are you sure you want to delete this post?
                            </h3>
                            <div className='flex justify-center gap-4'>
                                <Button color='failure' onClick={handleDeletePost}>
                                    Yes, I'm sure
                                </Button>
                                <Button color='gray' onClick={() => setShowModal(false)}>
                                    No, cancel
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}

export default AdminPost