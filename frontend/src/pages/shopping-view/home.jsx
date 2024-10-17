import ProductDetailsDialog from '@/components/shopping-view/product-details';
import ShoppingProductTile from '@/components/shopping-view/product-tile';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { getFeatureImages } from '@/store/common-slice';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/products-slice';
import { BookIcon, BookmarkIcon, BookOpenIcon, CalendarIcon, ChevronLeftIcon, ChevronsRightIcon, EditIcon, FeatherIcon, FlaskRoundIcon, GlobeIcon, GraduationCapIcon, MoonIcon, PenToolIcon, SmileIcon, UserIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const categoriesWithIcon = [
  { id: "fiction", label: "Fiction", icon: BookIcon },
  { id: "science", label: "Science", icon: FlaskRoundIcon },
  { id: "history", label: "History", icon: CalendarIcon },
  { id: "comics", label: "Comics", icon: SmileIcon },
  { id: "fantasy", label: "Fantasy", icon: MoonIcon },
  { id: "biography", label: "Biography", icon: UserIcon },
];

const publishersWithIcon = [
  { id: "penguin", label: "Penguin Random House", icon: FeatherIcon },
  { id: "harpercollins", label: "HarperCollins", icon: BookmarkIcon },
  { id: "simon-schuster", label: "Simon & Schuster", icon: PenToolIcon },
  { id: "macmillan", label: "Macmillan", icon: EditIcon },
  { id: "hachette", label: "Hachette", icon: GlobeIcon },
  { id: "oxford", label: "Oxford University Press", icon: GraduationCapIcon },
];


const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector(state => state.shopCart)
  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: 'price-lowtohigh' }))
  }, [dispatch])
  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000)
    return () => clearInterval(timer)
  }, [featureImageList])
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true)
  }, [productDetails])
  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }
  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive"
          })
          return;
        }
      }
    }
    dispatch(addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 }))
      .then(data => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast({
            title: "Product is added to cart"
          })
        }
      })
  }
  useEffect(() => {
    if (!productDetails) {
      setOpenDetailsDialog(false); // Đóng dialog nếu không có productDetails
    }
  }, [productDetails]);
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='relative w-full h-[600px] overflow-hidden'>
        {
          featureImageList && featureImageList.length > 0
            ? featureImageList.map((slide, index) => (
              <img src={slide?.image} key={index} className={`${index === currentSlide ? "opacity-100" : "opacity-0"} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`} />
            ))
            : null
        }
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white-80"
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + featureImageList.length) % featureImageList.length)}
        >
          <ChevronLeftIcon className='w-4 h-4' />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white-80'
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)}
        >
          <ChevronsRightIcon className='w-4 h-4' />
        </Button>
      </div>
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Shop by category</h2>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mx-24'>
          {
            categoriesWithIcon.map((categoryItem) => <Card>
              <CardContent className='flex flex-col items-center justify-center p-6'>
                <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                <span className='font-bold'>{categoryItem.label}</span>
              </CardContent>
            </Card>)
          }
        </div>
      </section>
      <section className='py-12'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Shop by publisher</h2>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mx-24'>
          {
            publishersWithIcon.map((publisherItem) => (
              <Card>
                <CardContent className='flex flex-col justify-center items-center p-6'>
                  <publisherItem.icon className='w-12 h-12 mb-4 text-primary' />
                  <span className='font-bold'>{publisherItem.label}</span>
                </CardContent>
              </Card>
            ))
          }
        </div>
      </section>
      <section className='py-12'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>
            Feature Products
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {
              productList && productList.length > 0
                ? productList.map((productItem) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
                : null
            }
          </div>
        </div>
      </section>
      <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
    </div>
  )
}

export default Home;