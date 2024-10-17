import AdminOrderDetailView from '@/components/admin-view/orderDetail';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from '@/store/admin/order-slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const AdminOrderView = () => {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
    const dispatch = useDispatch();
    function handleFetchOrderDetails(getId) {
        dispatch(getOrderDetailsForAdmin(getId))
    }
    useEffect(() => {
        dispatch(getAllOrdersForAdmin());
    }, [dispatch])
    useEffect(() => {
        if (orderDetails !== null) setOpenDetailsDialog(true)
      }, [orderDetails])
    console.log(orderList)
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>
                        All Order
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Order Date</TableHead>
                                <TableHead>Order Status</TableHead>
                                <TableHead>Order Prices</TableHead>
                                <TableHead>
                                    <span className='sr-only'>Details</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                orderList && orderList.length > 0
                                    ? orderList.map((orderItem) => (
                                        <TableRow>
                                            <TableCell>{orderItem?._id}</TableCell>
                                            <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={`py-1 px-3 ${orderItem?.orderStatus === "confirmed"
                                                        ? "bg-green-500"
                                                        : orderItem?.orderStatus === "rejected"
                                                            ? "bg-red-600"
                                                            : "bg-black"
                                                        }`}
                                                >
                                                    {orderItem?.orderStatus}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>${orderItem?.totalAmount}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleFetchOrderDetails(orderItem?._id)}>View Details</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    : null
                            }
                        </TableBody>
                    </Table>
                    <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                            setOpenDetailsDialog(false)
                            dispatch(resetOrderDetails());
                        }}
                    >
                        <AdminOrderDetailView orderDetails={orderDetails}/>
                    </Dialog>
                </CardContent>
            </Card>
        </div>
    )
}

export default AdminOrderView