import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'

const AdminProductTile = ({product, setFormData, setOpenCreateProductsDialog, setCurrentEditedId, handleDelete}) => {
  return (
    <Card className='w-full max-w-sm mx-auto flex flex-col justify-between'>
        <div className='relative'>
             <img src={product?.image} alt={product?.title} className='w-full h-[200px] object-cover rounded-t' />
        </div>
        <CardContent className='flex-1 flex flex-col'>
            <h2 className='text-xl font-bold mb-2 mt-2'>{product?.title}</h2>
            <div className='flex justify-between items-center mt-auto'>
                <span className={`${product?.salePrice > 0 ? "line-through" : ""} text-lg font-semibold text-primary`}>
                    ${product?.price}
                </span>
                {
                    product?.salePrice > 0 ? (
                        <span className='text-lg font-bold'>${product.salePrice}</span>
                    ) : null
                }
            </div>
        </CardContent>
        <CardFooter className='flex justify-between items-center mt-auto'>
            <Button
                onClick={() => {
                    setOpenCreateProductsDialog(true);
                    setCurrentEditedId(product?._id);
                    setFormData(product);
                }}
            >
                Edit
            </Button>
            <Button onClick={() => handleDelete(product?._id)}>
                Delete
            </Button>
        </CardFooter>
    </Card>
  )
}

export default AdminProductTile