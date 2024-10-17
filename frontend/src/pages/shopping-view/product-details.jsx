
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, setProductDetails } from '@/store/shop/products-slice';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { addReview, getReviews } from '@/store/shop/review-slice';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import StarRatingComponent from '@/components/common/star-rating';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ProductDetailScreen = () => {
  const dispatch = useDispatch();
  const { productId } = useParams(); // Lấy productId từ URL
  const { productDetails } = useSelector(state => state.shopProducts);
  const { reviews } = useSelector((state) => state.shopReview);
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector(state => state.shopCart)
  const { toast } = useToast();
  const location = useLocation();
  /*if(location.pathname !== `/product/${productDetails?._id}`){
      dispatch(setProductDetails());
  }*/
  function handleRatingChange(getRating) {
    setRating(getRating);
  }
  function handleAddReview() {
    dispatch(addReview({
      productId: productDetails?._id, userId: user?.id, userName: user?.userName, reviewMessage: reviewMsg, reviewValue: rating
    }))
      .then((data) => {
        if (data.payload.success) {
          setRating(0);
          setReviewMsg("");
          dispatch(getReviews(productDetails?._id));
          toast({
            title: "Review added successfully"
          })
        } else {
          setRating(0);
          setReviewMsg("");
          dispatch(getReviews(productDetails?._id));
          toast({
            title: data.payload,
            variant: "destructive"
          })
        }
      })
  }
  const averageReview = reviews && reviews.length > 0
    ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / reviews.length
    : 0;
  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    console.log(getCurrentProductId, 'dsdsd');
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
          console.log('dads');
        }
      }
      )
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetails(productId));
    }
    return () => {
      // Set productDetails to null when unmounting
      dispatch(setProductDetails());
    };
  }, [dispatch, productId]);
  return (
    <div>
      <div className='flex gap-20 m-10'>
        <div className='overflow-hidden rounded-lg w-1/3'>
          <img src={productDetails?.image} alt={productDetails?.title} width={600} height={600} className='aspect-square w-full object-cover' />
        </div>
        <div className='flex flex-col gap-10 w-2/3'>
          <div>
            <h1 className='text-3xl font-extrabold'>{productDetails?.title}</h1>
            <p className='text-muted-foreground text-2xl mb-5 mt-4'>{productDetails?.description}</p>
          </div>
          <div className='flex items-center justify-between'>
            <p className={`text-3xl font-bold text-primary ${productDetails?.salePrice > 0 ? "line-through" : ""}`}>${productDetails?.price}</p>
            {
              productDetails?.salePrice > 0 ? (
                <p className='text-2xl font-bold text-muted-foreground'>
                  ${productDetails?.salePrice}
                </p>
              ) : null
            }
          </div>
          <div className='flex items-center gap-2 mt-2'>
            <div className='flex items-center gap-0.5'>
              <StarRatingComponent rating={averageReview} />
            </div>
            <span className='text-muted-foreground'>({averageReview.toFixed(2)})</span>
          </div>
          <div className='mt-5 mb-5zzzz'>
            {
              productDetails?.totalStock === 0
                ? <Button className='w-full opacity-60 cursor-not-allowed'>
                  Out Of Stock
                </Button>
                : <Button className='w-full' onClick={() => handleAddtoCart(productDetails?._id, productDetails?.totalStock)}>
                  Add to Cart
                </Button>
            }
          </div>
        </div>
      </div>
      <div className='m-10 border p-10 rounded'>
        <h2 className='text-xl font-bold mb-4'>
          Reviews
        </h2>
        <div className='grid gap-6'>
          {
            reviews && reviews.length > 0
              ? reviews.map((reviewItem) => (
                <div className='flex gap-4'>
                  <Avatar className='w-10 h-10 border'>
                    <AvatarFallback>
                      {reviewItem?.userName[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className='grid gap-1'>
                    <div className='flex items-center gap-2'>
                      <h3 className='font-bold'>{reviewItem?.userName}</h3>
                    </div>
                    <div className='flex items-center gap-0.5'>
                      <StarRatingComponent rating={reviewItem?.reviewValue} />
                    </div>
                    <p className='text-muted-foreground'>
                      {reviewItem.reviewMessage}
                    </p>
                  </div>
                </div>
              ))
              : <h1>No Reviews</h1>
          }
        </div>
        <div className='mt-10 flex-col flex gap-2'>
          <label>Write a review</label>
          <div className='flex gap-1'>
            <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange} />
          </div>
          <Input
            name="reviewMsg"
            value={reviewMsg}
            onChange={(event) => setReviewMsg(event.target.value)}
            placeholder="Write a review...."
          />
          <Button
            onClick={handleAddReview}
            disabled={reviewMsg.trim() === ""}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailScreen;
