import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import AdminLayout from './components/admin-view/layout';
import AdminDashboard from './pages/admin-view/dashboard';
import AdminProduct from './pages/admin-view/products';
import Home from './pages/shopping-view/home';
import AdminCategoryPage from './pages/admin-view/category';
import ShoppingLayout from './components/shopping-view/layout';
import AuthLayout from './components/auth/layout';
import AuthRegister from './pages/auth/register';
import AuthLogin from './pages/auth/login';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/auth-slice';
import { Skeleton } from './components/ui/skeleton';
import CheckAuth from './components/common/check-auth';
import ShoppingListing from './pages/shopping-view/listing';
import ShoppingAccount from './pages/shopping-view/account';
import ShoppingCheckout from './pages/shopping-view/checkout';
import SearchProduct from './pages/shopping-view/search';
import PaymentSuccess from './pages/shopping-view/payment-success';
import PaypalReturnPage from './pages/shopping-view/paypal-return';
import AdminOrderView from './pages/admin-view/orders';
import ProductDetailScreen from './pages/shopping-view/product-details';
import AdminPublisherPage from './pages/admin-view/publisher';
import UserManagement from './pages/admin-view/user';
import AdminFeature from './pages/admin-view/feature';
import CreatePost from './components/admin-view/createpost';
import AdminPost from './pages/admin-view/post';
import UpdatePost from './components/admin-view/updatepost';
import ShoppingBlog from './pages/shopping-view/blog';
import ShoppingPost from './pages/shopping-view/postpage';

const App = () => {
  const { user, isAuthenticated, isLoading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  console.log(user)
  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])
  if (isLoading) return <Skeleton className="w-[800] bg-black h-[800px]" />;
  return (  
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
        <Route path='/' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          </CheckAuth>
        } />
        <Route
          path='/auth' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path='register' element={<AuthRegister />} />
          <Route path='login' element={<AuthLogin />} />
        </Route>
        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path='home' element={<Home />} />
          <Route path='listing' element={<ShoppingListing />} />
          <Route path='account' element={<ShoppingAccount/>} />
          <Route path='blog' element={<ShoppingBlog/>} />
          <Route path='checkout' element={<ShoppingCheckout/>} />
          <Route path='search' element={<SearchProduct />} />
          <Route path="product/:productId" element={<ProductDetailScreen />} /> 
          <Route path='payment-success' element={<PaymentSuccess />}/> 
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path='shoppingpost/:postSlug' element={<ShoppingPost /> } />    
        </Route>
        <Route
          path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>}
        >
          <Route path='createpost' element={<CreatePost />} />
          <Route path='updatepost/:postId' element={<UpdatePost />} />
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='products' element={<AdminProduct />} />
          <Route path='orders' element={<AdminOrderView />} />
          <Route path='category' element={<AdminCategoryPage />} /> 
          <Route path='publisher' element={<AdminPublisherPage />} />
          <Route path='user' element={<UserManagement />} />     
          <Route path='feature' element={<AdminFeature />} />   
          <Route path='post' element={<AdminPost /> } />    
        </Route>
      </Routes>
    </div>
  )
}

export default App;