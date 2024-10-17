import { addNewCategory, deleteCategory, editCategory, fetchAllCategory } from '@/store/admin/category-slice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import EditCategoryForm from '@/components/admin-view/category-edit';
import AddCategoryForm from '@/components/admin-view/category-add';
import CategoryList from '@/components/admin-view/category-list';
import Pagination from '@/components/admin-view/pagination';

const AdminCategoryPage = () => {
  const dispatch = useDispatch();
  const { categoryList, isLoading, currentPage, totalPages } = useSelector((state) => state.adminCategory);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchAllCategory({ page: currentPage, limit: 5 })); // Cập nhật limit nếu cần
  }, [dispatch, currentPage]);

  const handleAddCategory = (formData) => {
    dispatch(addNewCategory(formData)).then(() => {
      dispatch(fetchAllCategory({ page: currentPage, limit: 5 })); // Cập nhật lại danh sách
      setOpenDialog(false); // Đóng dialog sau khi thêm thành công
    });
  };

  const handleEditCategory = (id, formData) => {
    dispatch(editCategory({ id, formData })).then(() => {
      dispatch(fetchAllCategory({ page: currentPage, limit: 5 })); // Cập nhật lại danh sách
      setEditingCategory(null); // Đặt lại trạng thái sau khi chỉnh sửa thành công
      setOpenDialog(false); // Đóng dialog
    });
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id)).then(() => {
      dispatch(fetchAllCategory({ page: currentPage, limit: 5 })); // Cập nhật lại danh sách
    });
  };

  const handlePageChange = (pageNumber) => {
    dispatch(fetchAllCategory({ page: pageNumber, limit: 5 })); // Gọi API với trang mới
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>

      {/* Button để mở dialog thêm danh mục */}
      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-blue-500 text-white py-2 px-4 rounded mb-4">Add New Category</button>
        </DialogTrigger>
        <DialogContent>
          <h2 className="text-xl font-bold mb-4">Add New Category</h2>
          <AddCategoryForm onAdd={handleAddCategory} />
          <DialogClose asChild>
            <button className="bg-red-500 text-white py-1 px-2 mt-2 rounded">Close</button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Dialog để chỉnh sửa danh mục */}
      {editingCategory && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <h2 className="text-xl font-bold mb-4">Edit Category</h2>
            <EditCategoryForm
              category={editingCategory}
              onSave={handleEditCategory}
              onCancel={() => setOpenDialog(false)} // Đóng dialog khi hủy
            />
            <DialogClose asChild>
              <button className="bg-red-500 text-white py-1 px-2 mt-2 rounded">Close</button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      )}

      {isLoading ? (
        <p>Loading categories...</p>
      ) : (
        <div>
          <CategoryList
            categories={categoryList}
            onEdit={(category) => {
              setEditingCategory(category);
              setOpenDialog(true); // Mở dialog khi nhấn chỉnh sửa
            }}
            onDelete={handleDeleteCategory}
          />

          {/* Phân trang */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default AdminCategoryPage;
