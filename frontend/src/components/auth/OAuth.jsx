import React from 'react'
import { Button } from '../ui/button'
import { app } from '../../firebase';
import { GoalIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { loginGoogle } from '@/store/auth-slice';
import { useDispatch } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import { AiFillGoogleCircle } from 'react-icons/ai';
const OAuth = () => {
    const auth = getAuth(app);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {toast} = useToast();
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultsFormGoogle = await signInWithPopup(auth, provider)
            dispatch(loginGoogle({
                userName: resultsFormGoogle.user.displayName,
                email: resultsFormGoogle.user.email,
                googlePhotoUrl: resultsFormGoogle.user.photoURL
            })).then((data) => {
                if (data?.payload?.success) {
                    toast({
                        title: data?.payload?.message,
                    });
                } else {
                    toast({
                        title: data?.payload?.message,
                        variant: "destructive"
                    })
                }
            })
            const data = await res.json()
            if (res.ok) {
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Button type='button' onClick={handleGoogleClick} className='w-full hover:bg-slate-500 hover:text-slate-900'>
             <AiFillGoogleCircle className='w-6 h-6 mr-2' />
            Continue with Google
        </Button>
    )
}

export default OAuth;