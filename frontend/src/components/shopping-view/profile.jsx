import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { app } from '../../firebase';
import { Link } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { checkAuth, updateCurrentUser } from '@/store/auth-slice';
import { useToast } from '@/hooks/use-toast';

const ShoppingProfile = () => {
    const { user, isLoading, error } = useSelector((state) => state.auth);
    const initialState = {
        userName: user?.userName,
        email: user?.email,
        password: user?.password,
        profilePicture: user?.profilePircture
    
    }
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const filePickerRef = useRef();
    const { toast } = useToast();
    const dispatch = useDispatch();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    }
    console.log(formData);
    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile])
    const uploadImage = async () => {
        setImageFileUploading(true);
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError('Could not upload image (File must be less than 2 MB)');
                setImageFileUploadProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
                setImageFileUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setFormData({ ...formData, profilePicture: downloadURL });
                    setImageFileUploading(false);
                })
            }
        )
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateUserError(null);
        setUpdateUserSuccess(null);
        if (Object.keys(formData).length === 0) {
            setUpdateUserError('No changes made');
            return;
        }
        if (imageFileUploading) {
            setUpdateUserError('Please wait for image to upload');
            return;
        }
        try {
            /*const res = await fetch(`http://localhost:5000/api/admin/user/update/${user.id}`, {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            })
            const data = await res.json();
            if(!res.ok){
                setUpdateUserError(data.message);
            }else{
                dispatch(checkAuth());
                setUpdateUserSuccess("User's profile updated successfully");
            }*/
            dispatch(updateCurrentUser({
                formData: formData,
                userId: user?.id,
            })).then((data) => {
                if (data?.payload?.success) {
                    toast({
                        title: data?.payload?.message,
                    });
                } else {
                    toast({
                        title: error,
                        variant: "destructive"
                    })
                }
            });
        } catch (error) {
            setUpdateUserError(error.message);
        }
    }
    console.log(error);
    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input ref={filePickerRef} hidden onChange={handleImageChange} type='file' accept='image/*' />
                <div onClick={() => filePickerRef.current.click()} className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
                    {
                        imageFileUploadProgress && (
                            <CircularProgressbar
                                value={imageFileUploadProgress || 0}
                                text={`${imageFileUploadProgress}%`}
                                strokeWidth={5}
                                styles={{
                                    root: {
                                        width: '100%',
                                        height: '100%',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0
                                    },
                                    path: {
                                        stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`
                                    }
                                }}
                            />
                        )
                    }
                    <img src={imageFileUrl || user.profilePircture} alt="user" className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`} />
                </div>
                {
                    imageFileUploadError && (
                        <p>{imageFileUploadError}</p>
                    )
                }
                <Input type='userName' id='userName' placeholder='User Name' defaultValue={user.userName} onChange={handleChange} />
                <Input type='email' id='email' placeholder='email' defaultValue={user.email} onChange={handleChange} />
                <Input type='password' id='password' placeholder='password' onChange={handleChange} />
                <Button
                    type='submit'
                    disabled={isLoading}
                >
                    {isLoading ? 'loading...' : 'Update'}
                </Button>
            </form>
        </div>
    )
}

export default ShoppingProfile