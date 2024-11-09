import React from 'react'
import { Button } from '../ui/button'
import bookImage from '../../assets/bookimage.jpg';

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className='flex-1 justify-center flex flex-col'>
            <h2 className='text-5xl'>Want to read more books</h2>
            <p className='text-gray-500 my-2'>Check these resources with 1000 book</p>
            <Button className='text-2xl p-3'>
                <a href="http://localhost:5173/" target='_blank' rel='noopener noreferrer'>
                    1000 Books
                </a>
            </Button>
        </div>
        <div className='p-7 flex-1'>
            <img src={bookImage} alt="Book" className='w-[600px]'/>
        </div>
    </div>
  )
}

export default CallToAction;