import ShoppingProductTile from '@/components/shopping-view/product-tile';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { getSearchResults, resetSearchResults } from '@/store/shop/search-slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const SearchProduct = () => {
    const [keyword, setKeyword] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {searchResults} = useSelector((state) => state.shopSearch);
    const {toast} = useToast();
    useEffect(() => {
        if(keyword && keyword.trim() !== "" && keyword.trim().length > 3){
            setTimeout(() => {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
                dispatch(getSearchResults(keyword))
            }, 1000)
        }else{
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
            dispatch(resetSearchResults())
        }
    }, [keyword])
  return (
    <div className='container mx-auto md:px-6 px-4 py-8'>
        <div className='flex justify-center mb-8'>
            <div className='w-full flex items-center'>
                <Input
                    value={keyword}
                    name="keyword"
                    onChange={(event) => setKeyword(event.target.value)}
                    className="py-6"
                    placeholder="Search Product...."
                />
            </div>
        </div>
        {
            !searchResults.length
                ? <h1>No result found!</h1>
                : null
        }
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {
                searchResults.map((item) => (
                    <ShoppingProductTile
                        product={item}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default SearchProduct