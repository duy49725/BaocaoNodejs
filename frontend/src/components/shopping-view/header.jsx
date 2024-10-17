import { BookOpenIcon, HousePlug, LogOut, Menu, ShoppingCart, UserCog2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { shoppingViewHeaderMenuItems } from '../config'
import { Label } from '../ui/label'
import { useDispatch, useSelector } from 'react-redux'
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Avatar,AvatarFallback } from '../ui/avatar'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu'
import { logoutUser } from '@/store/auth-slice'
import { fetchCartItems } from '@/store/shop/cart-slice'
import UserCartWrapper from './cart-wrapper'

function MenuItems() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    function handleNavigate(getCurrentMenuItem) {
        sessionStorage.removeItem("filters");
        const currentFilter = getCurrentMenuItem.id !== "home" &&
            getCurrentMenuItem.id !== "products" &&
            getCurrentMenuItem.id !== "search"
                ? {category: [getCurrentMenuItem.id]} : null
        sessionStorage.setItem("filters", JSON.stringify(currentFilter));
        location.pathname.includes("listing") && currentFilter !== null
            ? setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`))
            : navigate(getCurrentMenuItem.path)
    }
    return (
        <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
            {
                shoppingViewHeaderMenuItems.map((menuItem) => (
                    <Label
                        onClick={() => handleNavigate(menuItem)}
                        className="text-sm font-medium cursor-pointer"
                        key={menuItem.id}
                    >
                        {menuItem.label}
                    </Label>
                ))
            }
        </nav>
    )
}

function HeaderRightContent(){
    const {user} = useSelector((state) => state.auth);
    const {cartItems} = useSelector(state => state.shopCart);
    const [openCartSheet, setOpenCartSheet] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function handleLogout(){
        dispatch(logoutUser());
    }
    useEffect(() => {
        dispatch(fetchCartItems(user?.id))
    }, [dispatch])
    return (
        <div className='flex lg:items-center lg:flex-row flex-col gap-4'>
            <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
                <Button onClick={() => setOpenCartSheet(true)} className='w-32 h-8 flex justify-center items-center relative'>
                    <ShoppingCart className='w-6 h-6 mr-2' />
                    <span className='absolute top-[-15px] right-[-2px] font-bold text-sm bg-red-500 rounded-full py-0.5 px-2 mt-1'>{cartItems?.items?.length || 0}</span>
                    <span>User Cart</span>
                </Button>
                <UserCartWrapper setOpenCartSheet={setOpenCartSheet} cartItems={cartItems &&  cartItems.items && cartItems.items.length > 0 ? cartItems.items : []} />
            </Sheet>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar>
                        <AvatarFallback className='bg-black text-white font-extralight'>
                            {user?.userName[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className='w-56'>
                    <DropdownMenuLabel>Logged in as {user?.useName}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/shop/account')}>
                        <UserCog2 className='mr-2 h-4 w-4'/>
                        Account
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className='mr-2 h-4 w-4' />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

const ShoppingHeader = () => {
    const { isAuthenticated } = useSelector(state => state.auth);

    return (
        <header className='sticky top-0 z-40 w-full border-b bg-background'>
            <div className='flex h-16 items-center justify-between px-4 md:px-16'>
                <Link className='flex items-center gap-2'>
                    <BookOpenIcon className='h-6 w-6' />
                    <span className='font-bold'>Book Store</span>
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden">
                            <Menu className='w-6 h-6' />
                            <span className='sr-only'>Toggle header menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side='left' className='w-full max-w-sm'>
                        <MenuItems />
                        <HeaderRightContent />
                    </SheetContent>
                </Sheet>
                <div className='hidden lg:block'>
                    <MenuItems />
                </div>
                <div>
                    {
                        isAuthenticated
                            ? <div className='hidden lg:block'>
                               <HeaderRightContent />
                            </div>
                            : <div className='flex gap-4'>
                                <Button>
                                    <Link to='/auth/register '>Register</Link>
                                </Button>
                                <Button>
                                    <Link to='/auth/login'>Login</Link>
                                </Button>
                            </div>
                    }
                </div>
            </div>
        </header>
    )
}

export default ShoppingHeader