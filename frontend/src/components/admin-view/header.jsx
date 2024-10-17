import React from 'react'
import { Button } from '../ui/button'
import { AlignJustify, LogOut } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/store/auth-slice'

const AdminHeader = ({setOpen}) => {
  const dispatch = useDispatch();
  return (
    <div className='flex items-center justify-between px-4 py-3 bg-background border-collapse'>
        <Button onClick={() => setOpen(true)} className='lg:hidden sm:block'>
            <AlignJustify />
            <span className='sr-only'>Toggle Menu</span>
        </Button>
        <div className='flex flex-1 justify-end'>
            <Button onClick={() => {dispatch(logoutUser())}} className='inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow'>
                <LogOut/>
                Logout
            </Button>
        </div>
    </div>
  )
}

export default AdminHeader