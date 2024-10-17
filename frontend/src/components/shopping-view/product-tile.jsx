import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { useNavigate } from 'react-router-dom'
import { Badge } from '../ui/badge';
import { categoryOptionsMap, publisherOptionsMap } from '../config';
import { Button } from '../ui/button';

const ShoppingProductTile = ({product, handleGetProductDetails, handleAddtoCart}) => {
    const navigate = useNavigate();
  return (
    <div>
        <Card className='w-full max-w-sm mx-auto flex flex-col justify-between'>
            <div className='flex flex-col' onClick={() => handleGetProductDetails(product?._id)}>
                <div className='relative'>
                    <img src={product?.image} alt={product?.title} className='w-full h-[300px] object-cover rounded-t-lg'/>
                    {
                        product?.totalStock === 0
                            ? <Badge className='absolute top-2 left-2 bg-red-500 hover:bg-red-600'>
                                Out Of Stock
                            </Badge>
                            : product?.totalStock < 10
                                ? <Badge className='absolute top-2 left-2 bg-red-500 hover:bg-red-600'>
                                    {`Only ${product?.totalStock} items left`}
                                </Badge>
                                : product?.salePrice > 0 
                                    ? <Badge className='absolute top-2 left-2 bg-red-500 hover:bg-red-600'>
                                        Sale
                                      </Badge>
                                    : null
                    }
                </div>
                <CardContent className="p-4">
                    <h2 className='text-xl font-bold mb-2'>{product?.title}</h2>
                    <div className='flex justify-between items-center mb-2'>
                        <span className='text-sm text-muted-foreground'>{categoryOptionsMap[product?.category]}</span>
                        <span className='text-sm text-muted-foreground'>{publisherOptionsMap[product?.publisher]}</span>
                    </div>
                    <div className='flex justify-between items-center mb-2'>
                        <span className={`${product?.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>${product?.price}</span>
                        {
                            product?.salePrice > 0 ? <span className='text-lg font-semibold text-primary'>${product?.salePrice}</span> : null
                        }
                    </div>
                </CardContent>
            </div>
            <CardFooter>
                <Button className='w-full mr-2' onClick={() => navigate(`/shop/product/${product?._id}`)}>
                    View Details
                </Button>
                {
                    product?.totalStock === 0
                        ? <Button className='w-full opacity-65 cursor-not-allowed'>
                            Out Of Stock
                          </Button>
                        : <Button 
                            onClick={()=>{
                                handleAddtoCart(product?._id, product?.totalStock)
                            }}
                            className='w-full bg-red-400'>
                            Add to cart
                          </Button>
                }
            </CardFooter>
        </Card>
    </div>
  )
}

export default ShoppingProductTile;