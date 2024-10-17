import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import adminProductsSlice from './admin/products-slice';
import adminOrderSlice from './admin/order-slice';
import commonFeatureSlice from './common-slice';
import shopProductsSlice from './shop/products-slice';
import adminCategorySlice from './admin/category-slice';
import shopCartSlice from './shop/cart-slice';
import shopAddressSlice from './shop/address-slice';
import shopSearchSlice from './shop/search-slice';
import shopOrderSlice from './shop/order-slice';
import shopReviewSlice from './shop/review-slice';
import adminPublisherSlice from './admin/publisher-slice';
import adminUserSlice from './admin/user-slice';

const store = configureStore({
    reducer:{
        auth: authReducer,
        adminProducts: adminProductsSlice,
        adminOrder: adminOrderSlice,
        adminCategory: adminCategorySlice,
        commonFeature: commonFeatureSlice,
        shopProducts: shopProductsSlice,
        shopCart: shopCartSlice,
        shopAddress: shopAddressSlice,
        shopSearch: shopSearchSlice,
        shopOrder: shopOrderSlice,
        shopReview: shopReviewSlice,
        adminPublisher: adminPublisherSlice,
        adminUser: adminUserSlice
    }
})
export default store;