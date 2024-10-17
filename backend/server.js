const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/auth-routes');
const adminProductRouter = require('./routes/admin/products-routes');
const adminCategoryRouter = require('./routes/admin/category-routes');
const adminPublisherRouter = require('./routes/admin/publisher-routes');
const commonFeatureRouter = require('./routes/common/feature-routes');
const shopProductsRouter = require('./routes/shop/product-routes');
const shopCartRouter = require('./routes/shop/cart-routes');
const shopAddressRouter = require('./routes/shop/address-routes');
const shopSearchRouter = require('./routes/shop/search-routes');
const shopOrderRouter = require('./routes/shop/order-routes');
const adminOrderRouter = require('./routes/admin/order-routes');
const shopReviewRouter = require('./routes/shop/review-routes');
const adminUserRoutes = require('./routes/admin/user-routes');
const adminDashboardRoutes = require('./routes/admin/dashboard-routes');

mongoose.connect('mongodb+srv://duy49725:hZENb3CXpNcL4x2s@cluster0.nrc2f.mongodb.net/mern')
    .then()
    .catch((error) => console.log(error));


const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials: true
    })
);


app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductRouter);
app.use('/api/admin/category', adminCategoryRouter);
app.use('/api/admin/orders', adminOrderRouter);
app.use('/api/common/feature', commonFeatureRouter);
app.use('/api/shop/products', shopProductsRouter);
app.use('/api/shop/cart', shopCartRouter);
app.use('/api/shop/address', shopAddressRouter);
app.use('/api/shop/search', shopSearchRouter);
app.use('/api/shop/order', shopOrderRouter);
app.use('/api/shop/review', shopReviewRouter)
app.use('/api/admin/publisher', adminPublisherRouter);
app.use('/api/admin/user', adminUserRoutes);
app.use('/api/admin/dashboard', adminDashboardRoutes);

app.listen(PORT, () => console.log(`Server is now running on ${PORT}`))