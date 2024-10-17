import { useToast } from '@/hooks/use-toast';
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from '@/store/admin/order-slice';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DialogContent } from '../ui/dialog';
import CommonForm from '../common/form';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';

const initalFormData = {
    status: ''
}

const AdminOrderDetailView = ({ orderDetails }) => {
    const [formData, setFormData] = useState(initalFormData);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { toast } = useToast();
    function handleUpdateStatus(event) {
        event.preventDefault();
        const { status } = formData;
        dispatch(
            updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
        ).then((data) => {
            if (data?.payload?.success) {
                dispatch(getOrderDetailsForAdmin(orderDetails?._id));
                dispatch(getAllOrdersForAdmin());
                setFormData(initalFormData);
                toast({
                    title: data?.payload?.message
                })
            }
        })
    }
    return (
        <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-screen">
            <div className='grid gap-6'>
                <div className='grid gap -2'>
                    <div className='flex mt-4 items-center justify-between'>
                        <p className='font-medium'>Order Id</p>
                        <label>{orderDetails?._id}</label>
                    </div>
                    <div className='flex mt-2 items-center justify-between'>
                        <p className='font-medium'>Order Date</p>
                        <label>{orderDetails?.orderDate.split("T")[0]}</label>
                    </div>
                    <div className='flex mt-2 items-center justify-between'>
                        <p className='font-medium'>Price</p>
                        <label>${orderDetails?.totalAmount}</label>
                    </div>
                    <div className='flex mt-2 items-center justify-between'>
                        <p className='font-medium'>Payment method</p>
                        <label>{orderDetails?.paymentMethod}</label>
                    </div>
                    <div className='flex mt-2 items-center justify-between'>
                        <p className='font-medium'>Payment Status</p>
                        <label>{orderDetails?.paymentStatus}</label>
                    </div>
                    <div className='flex mt-2 items-center justify-between'>
                        <p className='font-medium'>Order Status</p>
                        <label>
                            <Badge
                                className={`py-1 px-3 ${orderDetails?.orderStatus === "confirmed"
                                    ? "bg-green-500"
                                    : orderDetails?.orderStatus === "rejected"
                                        ? "bg-red-600"
                                        : "bg-black"
                                    }`}
                            >
                                {orderDetails?.orderStatus}
                            </Badge>
                        </label>
                    </div>
                </div>
                <Separator />
                <div className='grid gap-4'>
                    <div className='grid gap-2'>
                        <div className='font-medium'>Order Details</div>
                        <ul className='grid gap-3'>
                            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                                ? orderDetails?.cartItems.map((item) => (
                                    <li className="flex items-center justify-between">
                                        <span>Title: {item.title}</span>
                                        <span>Quantity: {item.quantity}</span>
                                        <span>Price: ${item.price}</span>
                                    </li>
                                ))
                                : null}
                        </ul>
                    </div>
                </div>
                <Separator />
                <div className='grid gap-4'>
                    <div className='grid gap-2'>
                        <div className='font-medium'>Shipping Info</div>
                        <ul className='grid gap-3'>
                            <li className='grid gap-0.5 text-muted-foreground'>
                                <span>{user.userName}</span>
                                <span>{orderDetails?.addressInfo?.address}</span>
                                <span>{orderDetails?.addressInfo?.city}</span>
                                <span>{orderDetails?.addressInfo?.pincode}</span>
                                <span>{orderDetails?.addressInfo?.phone}</span>
                                <span>{orderDetails?.addressInfo?.notes}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <CommonForm
                        formControls={[
                            {
                                label: "Order Status",
                                name: "status",
                                componentType: "select",
                                options: [
                                    { id: "pending", label: "Pending" },
                                    { id: "inProcess", label: "In Process" },
                                    { id: "inShipping", label: "In Shipping" },
                                    { id: "delivered", label: "Delivered" },
                                    { id: "rejected", label: "Rejected" },
                                ]
                            }
                        ]}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText={"Update Order Status"}
                        onSubmit={handleUpdateStatus}
                    />
                </div>
            </div>
        </DialogContent>
    )
}

export default AdminOrderDetailView