const Order = require('../../models/Order');
const Product = require("../../models/Product");
const User = require('../../models/User');
exports.getOverviewData = async (req, res) => {
    try {
        // Tổng doanh thu từ các đơn hàng đã giao
        const totalRevenue = await Order.aggregate([
            { $match: { orderStatus: "delivered" } },
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]);

        // Tổng số lượng đơn hàng theo trạng thái
        const totalOrders = await Order.countDocuments();
        const pendingOrders = await Order.countDocuments({ orderStatus: "pending" });
        const inProcessOrders = await Order.countDocuments({ orderStatus: "inProcess" });
        const inShippingOrders = await Order.countDocuments({ orderStatus: "inShipping" });
        const deliveredOrders = await Order.countDocuments({ orderStatus: "delivered" });
        const rejectedOrders = await Order.countDocuments({ orderStatus: "rejected" });

        // Tổng số lượng sản phẩm và người dùng
        const totalProducts = await Product.countDocuments();
        const totalUsers = await User.countDocuments();

        // Trả về dữ liệu cho frontend
        res.json({
            totalRevenue: totalRevenue[0]?.total || 0,
            totalOrders,
            totalProducts,
            totalUsers,
            orderStatusCounts: {
                pending: pendingOrders,
                inProcess: inProcessOrders,
                inShipping: inShippingOrders,
                delivered: deliveredOrders,
                rejected: rejectedOrders
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching overview data' });
    }
};
