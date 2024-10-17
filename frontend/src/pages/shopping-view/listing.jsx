import React, { useEffect, useState } from 'react'
import { ArrowUpDown, ArrowUpDownIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import ProductFilter from '@/components/shopping-view/filter'
import { sortOptions } from '@/components/config'
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/products-slice'
import ShoppingProductTile from '@/components/shopping-view/product-tile'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import ProductDetailsDialog from '@/components/shopping-view/product-details'

function createSearchParamsHelper(filterParams){
    const queryParams = [];
    for(const [key,value] of Object.entries(filterParams)){
        if(Array.isArray(value) && value.length > 0){
            const paramValue = value.join(',')
            queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
        }
    }
    return queryParams.join('&')
}

const ShoppingListing = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {productList, productDetails} = useSelector(state => state.shopProducts);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState(null);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const {user} = useSelector((state) => state.auth);
    const categorySearchParam = searchParams.get("category")
    function handleSort(value){
        setSort(value);
    }
    useEffect(() => {
        if (!productDetails) {
          setOpenDetailsDialog(false); // Đóng dialog nếu không có productDetails
        }
      }, [productDetails]);
    function handleFilter(getSectionId, getCurrentOption){
        let cpyFilters = {...filters};
        const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
        if(indexOfCurrentSection === -1){
            cpyFilters = {
                ...cpyFilters,
                [getSectionId]: [getCurrentOption]
            }
        }else{
            const indexOfCurrentSection = cpyFilters[getSectionId].indexOf(getCurrentOption);
            if(indexOfCurrentSection === -1)
                cpyFilters[getSectionId].push(getCurrentOption);
            else cpyFilters[getSectionId].splice(indexOfCurrentSection, 1);
        }
        setFilters(cpyFilters);
        sessionStorage.setItem('filters', JSON.stringify(cpyFilters))
    }
    function handleGetProductDetails(getCurrentProductId){
        dispatch(fetchProductDetails(getCurrentProductId))
    }
    useEffect(()=>{
        if(productDetails !== null) setOpenDetailsDialog(true)
      }, [productDetails])
      function handleAddtoCart(getCurrentProductId, getTotalStock){
        console.log(cartItems, 'dsdsd');
        let getCartItems = cartItems.items || [];
        if(getCartItems.length){
          const indexOfCurrentItem = getCartItems.findIndex(
            (item) => item.productId === getCurrentProductId
          );
          if(indexOfCurrentItem > -1){
            const getQuantity = getCartItems[indexOfCurrentItem].quantity;
            if(getQuantity + 1 > getTotalStock){
              toast({
                title: `Only ${getQuantity} quantity can be added for this item`,
                variant: "destructive"
              })
              return;
            }
          }
        }
        dispatch(addToCart({userId: user?.id, productId: getCurrentProductId, quantity: 1}))
          .then(data => 
           {
            if(data?.payload?.success){
                dispatch(fetchCartItems(user?.id));
                toast({
                  title: "Product is added to cart"
                })
            }
           }
          )
      }
    useEffect(() => {
        setSort('price-lowtohigh');
        setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
    }, [categorySearchParam])
    useEffect(() => {
        if(filters && Object.keys(filters).length > 0){
            const createQueryString = createSearchParamsHelper(filters);
            setSearchParams(new URLSearchParams(createQueryString))
        }
    }, [filters])
    useEffect(() => {
        if(filters !== null && sort !== null)
            dispatch(fetchAllFilteredProducts({filterParams: filters, sortParams: sort}))
    }, [dispatch, sort, filters])
  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6'>
        <ProductFilter filters={filters} handleFilter={handleFilter}  />
        <div className='bg-background w-full rounded-lg shadow-sm'>
            <div className='p-4 border-b flex items-center justify-between'>
                <h2 className='text-lg font-extrabold'>All Product</h2>
                <div className='flex items-center gap-3'>
                    <span className='text-muted-foreground'>10 product</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className='flex items-center gap-1'>
                                <ArrowUpDownIcon className='h4 w-4' />
                                <span>Sort by</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className='w-[200px]'>
                            <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                                { 
                                    sortOptions.map((sortItem) => <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>{sortItem.label}</DropdownMenuRadioItem>)
                                }
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                {
                    productList && productList.length > 0 ?
                    productList.map((productItem) => <ShoppingProductTile product={productItem} handleGetProductDetails={handleGetProductDetails}/>) 
                    : null
                }
            </div>
        </div>
        <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails}/>
    </div>
  )
}

export default ShoppingListing