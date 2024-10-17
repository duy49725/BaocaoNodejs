const Category = require("../../models/Category");

const addCategory = async (req, res) => {
    try {
        const { id, label } = req.body;
        if (!id || !label) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided",
            });
        }
        const newCategory = new Category({ id, label });
        await newCategory.save();
        res.status(201).json({
            success: true,
            data: newCategory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};

const fetchAllCategory = async (req, res) => {
    try {
        // Lấy giá trị page và limit từ query string, với giá trị mặc định là 1 và 10
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        // Tính toán số tài liệu cần bỏ qua (skip)
        const skip = (page - 1) * limit;

        // Lấy tổng số lượng category để tính tổng số trang
        const totalCategories = await Category.countDocuments();

        // Lấy danh sách category với phân trang
        const categoryList = await Category.find({})
            .skip(skip) // Bỏ qua các category của các trang trước
            .limit(limit); // Giới hạn số category lấy về trong mỗi trang

        // Trả về dữ liệu cùng với thông tin phân trang
        res.status(200).json({
            success: true,
            data: categoryList,
            pagination: {
                totalCategories, // Tổng số category
                currentPage: page, // Trang hiện tại
                totalPages: Math.ceil(totalCategories / limit), // Tổng số trang
                pageSize: limit, // Số lượng category mỗi trang
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};

const fetchCategory = async (req, res) => {
    try {
        const category = await Category.find({});
        res.status(200).json({
            success: true,
            data: category,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
}


const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const formData = req.body;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided",
            });
        }
        const category = await Category.findByIdAndUpdate(id, formData, {
            new: true,
        });
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        res.status(200).json({
            success: true,
            data: category,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided",
            });
        }
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};

module.exports = { addCategory, fetchCategory, fetchAllCategory, editCategory, deleteCategory };
