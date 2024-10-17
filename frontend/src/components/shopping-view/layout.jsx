import React from 'react';
import ShoppingHeader from './header';
import ShoppingFooter from './footer'; // Import footer
import { Outlet } from 'react-router-dom';

const ShoppingLayout = () => {
  return (
    <div className='flex flex-col bg-white overflow-hidden min-h-screen'>
        <ShoppingHeader />
        <main className='flex flex-col w-full flex-grow'>
            <Outlet />
        </main>
        <ShoppingFooter /> {/* Thêm Footer ở đây */}
    </div>
  )
}

export default ShoppingLayout;
