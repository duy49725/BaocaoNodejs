import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import Comment from './comment';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"

const CommentSection = ({ postId }) => {
    const { user } = useSelector((state) => state.auth);
    console.log(user)
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > 200) {
            return;
        }
        try {
            const res = await fetch('http://localhost:5000/api/admin/comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: comment,
                    postId,
                    userId: user.id
                }),
                credentials: 'include'
            })
            const data = await res.json();
            if (res.ok) {
                setComment('');
                setCommentError(null);
                setComments([data, ...comments]);
            }
        } catch (error) {
            setCommentError(error.message);
        }
    }
    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/admin/comment/getPostComments/${postId}`);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        getComments();
    }, [postId]);

    const handleLike = async (commentId) => {
        try {
            if (!user) {
                navigate('/signin');
                return;
            }
            const res = await fetch(`http://localhost:5000/api/admin/comment/likeComment/${commentId}`, {
                method: 'PUT',
                credentials: 'include'
            })
            if (res.ok) {
                const data = await res.json();
                setComments(
                    comments.map((comment) => comment._id === commentId
                        ? {
                            ...comment,
                            likes: data.likes,
                            numberOfLikes: data.likes.length
                        }
                        : comment
                    )
                )
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleEdit = async (comment, editedComment) => {
        setComments(
            comments.map((c) => c._id === comment._id ? { ...c, content: editedComment } : c)
        )
    }

    const handleDelete = async (commentId) => {
        setShowModal(false);
        try {
            if (!user) {
                navigate('/auth/login');
                return;
            }
            const res = await fetch(`http://localhost:5000/api/admin/comment/deleteComment/${commentId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (res.ok) {
                const data = await res.json();
                setComments(comments.filter((comment) => comment._id !== commentId));
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className='max-w-2xl mx-auto w-full p-3'>
            {
                user ? (
                    <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                        <p>Signed in as: </p>
                        <img className='h-5 w-5 object-cover rounded-full' src={user.profilePircture} alt="" />
                        <Link to={'/admin/dashboard'}>
                            @{user.userName}
                        </Link>
                    </div>
                ) : (
                    <div className='text-sm text-teal-500 my-5 flex gap-5'>
                        You must be signed in comment.
                        <Link className='text-blue-500 hover:underline' to={'/auth/login'}>
                            Sign in
                        </Link>
                    </div>
                )
            }
            {
                user && (
                    <form
                        onSubmit={handleSubmit}
                        className='border border-teal-500 rounded-md p-3'
                    >
                        <Textarea
                            placeholder='Add a comment...'
                            maxLength='200'
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                        />
                        <div className='flex justify-between items-center mt-5'>
                            <p className='text-gray-500 text-xs'>
                                {200 - comment.length} character remaining
                            </p>
                            <Button type='submit'>
                                Submit
                            </Button>
                        </div>
                    </form>
                )
            }
            {
                comments.length === 0 ? (
                    <p className='text-sm my-5'>No comments yet!</p>
                ) : (
                    <>
                        <div className='text-sm my-5 flex items-center gap-1'>
                            <p>Comments</p>
                            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                                <p>{comments.length}</p>
                            </div>
                        </div>
                        {
                            comments.map((comment) => (
                                <Comment
                                    key={comment._id}
                                    comment={comment}
                                    onLike={handleLike}
                                    onEdit={handleEdit}
                                    onDelete={(commentId) => {
                                        setShowModal(true);
                                        setCommentToDelete(commentId)
                                    }}
                                />
                            ))
                        }
                    </>
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
                            <Button color='failure' onClick={() => handleDelete(commentToDelete)}>
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
    )
}

export default CommentSection