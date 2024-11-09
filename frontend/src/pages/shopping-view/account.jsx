import React from 'react'
import accImg from '../../assets/906_generated.jpg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AddressCard from '@/components/shopping-view/address-card'
import Address from '@/components/shopping-view/address'
import ShoppingOrders from '@/components/shopping-view/orders'
import ShoppingProfile from '@/components/shopping-view/profile'
const ShoppingAccount = () => {
  return (
    <div className='flex flex-col'>
        <div className='relative h-[300px] w-full overflow-hidden'>
            <img src={accImg} alt="" className='h-full w-full object-cover object-center'/>
        </div>
        <div className='container mx-auto grid grid-cols-1 gap-8 py-8'>
            <div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm'>
                <Tabs defaultValue='orders'>
                    <TabsList>
                        <TabsTrigger value='orders'>Orders</TabsTrigger>
                        <TabsTrigger value='address'>Address</TabsTrigger>
                        <TabsTrigger value='profile'>Profile</TabsTrigger>
                    </TabsList>
                    <TabsContent value="orders">
                      <ShoppingOrders />
                    </TabsContent>
                    <TabsContent value="address">
                      <Address />
                    </TabsContent>
                    <TabsContent value="profile">
                      <ShoppingProfile />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    </div>  
  )
}

export default ShoppingAccount