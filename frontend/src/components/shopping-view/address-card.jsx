import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'

const AddressCard = ({addressInfo, handleDeleteAddress, handleEditAddress, setCurrentSelectedAddress, selectedId}) => {
  return (
    <Card
        onClick={
            setCurrentSelectedAddress
                ? () => setCurrentSelectedAddress(addressInfo)
                : null
        }
        className={`cursor-pointer border-red-700 ${
            selectedId?._id === addressInfo?._id
                ? "border-red-900 border-[4px]"
                : "border-black"
        }`}
    >
        <CardContent className="grid p-4 gap-4">
            <label>Address: {addressInfo?.address}</label>
            <label>City: {addressInfo?.city}</label>
            <label>Pincode: {addressInfo?.pincode}</label>
            <label>Phone: {addressInfo?.phone}</label>
            <label>Notes: {addressInfo?.notes}</label>
        </CardContent>
        <CardFooter className='p-3 flex justify-between'>
            <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
            <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
        </CardFooter>
    </Card>
  )
}

export default AddressCard