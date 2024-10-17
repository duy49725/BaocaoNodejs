// src/components/Overview.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [data, setData] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalProducts: 0,
        totalUsers: 0,
        orderStatusCounts: {
            pending: 0,
            inProcess: 0,
            inShipping: 0,
            delivered: 0,
            rejected: 0
        }
    });

    useEffect(() => {
        // Lấy dữ liệu từ API
        const fetchOverviewData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/dashboard/get');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching overview data', error);
            }
        };

        fetchOverviewData();
    }, []);

    return (
        <div className="p-6 bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">Tổng quan</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Tổng doanh thu */}
                <div className="bg-white p-4 shadow rounded-lg">
                    <h2 className="text-lg font-semibold">Tổng doanh thu</h2>
                    <p className="mt-2 text-xl text-green-500">${data.totalRevenue}</p>
                </div>
                
                {/* Tổng đơn hàng */}
                <div className="bg-white p-4 shadow rounded-lg">
                    <h2 className="text-lg font-semibold">Tổng đơn hàng</h2>
                    <p className="mt-2 text-xl">{data.totalOrders}</p>
                </div>

                {/* Tổng sản phẩm */}
                <div className="bg-white p-4 shadow rounded-lg">
                    <h2 className="text-lg font-semibold">Tổng sản phẩm</h2>
                    <p className="mt-2 text-xl">{data.totalProducts}</p>
                </div>
                
                {/* Tổng người dùng */}
                <div className="bg-white p-4 shadow rounded-lg">
                    <h2 className="text-lg font-semibold">Tổng người dùng</h2>
                    <p className="mt-2 text-xl">{data.totalUsers}</p>
                </div>
            </div>

            {/* Trạng thái đơn hàng */}
            <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">Trạng thái đơn hàng</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <div className="bg-white p-4 shadow rounded-lg">
                        <h3 className="text-md font-semibold">Pending</h3>
                        <p className="mt-2 text-xl">{data.orderStatusCounts.pending}</p>
                    </div>
                    <div className="bg-white p-4 shadow rounded-lg">
                        <h3 className="text-md font-semibold">In Process</h3>
                        <p className="mt-2 text-xl">{data.orderStatusCounts.inProcess}</p>
                    </div>
                    <div className="bg-white p-4 shadow rounded-lg">
                        <h3 className="text-md font-semibold">In Shipping</h3>
                        <p className="mt-2 text-xl">{data.orderStatusCounts.inShipping}</p>
                    </div>
                    <div className="bg-white p-4 shadow rounded-lg">
                        <h3 className="text-md font-semibold">Delivered</h3>
                        <p className="mt-2 text-xl">{data.orderStatusCounts.delivered}</p>
                    </div>
                    <div className="bg-white p-4 shadow rounded-lg">
                        <h3 className="text-md font-semibold">Rejected</h3>
                        <p className="mt-2 text-xl">{data.orderStatusCounts.rejected}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

