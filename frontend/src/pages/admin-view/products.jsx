import ProductImageUpload from '@/components/admin-view/image-upload';
import Pagination from '@/components/admin-view/pagination';
import AdminProductTile from '@/components/admin-view/product-tile';
import CommonForm from '@/components/common/form';
import { addProductFormElements } from '@/components/config';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from '@/store/admin/products-slice';
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const initialFormData = {
  image: null,
  title: '',
  description: '',
  publisher: '',
  category: '',
  author: '',
  price: '',
  salePrice: '',
  totalStock: ''
}
const AdminProduct = () => {
  const dispatch = useDispatch();
  const { productList, currentPage, totalPages } = useSelector(state => state.adminProducts);
  const [openCreateProductDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currnentEditId, setCurrentEditedId] = useState(null);
  const { toast } = useToast();
  function onSubmit(event) {
    event.preventDefault();
    currnentEditId !== null
      ? (dispatch(editProduct({ id: currnentEditId, formData: { ...formData, image: uploadedImageUrl } }))
        .then((data) => {
          if (data?.payload.success) {
            dispatch(fetchAllProducts({ page: currentPage, limit: 5 }));
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null)
          }
        }))
      : (dispatch(addNewProduct({ ...formData, image: uploadedImageUrl }))
        .then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts({ page: currentPage, limit: 5 }));
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast({
              title: "Product add successfully"
            })
          }
        })
      )
  }
  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts({ page: currentPage, limit: 5 }));
      }
    })
  }
  function isFormValid() {
    return Object.keys(formData).map(key => formData[key] !== '').every(item => item);
  }
  useEffect(() => {
    dispatch(fetchAllProducts({ page: currentPage, limit: 5 }))
  }, [dispatch, currentPage])
  const handlePageChange = (pageNumber) => {
    dispatch(fetchAllProducts({ page: pageNumber, limit: 5 }));
  }
  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
        {
          productList && productList.length > 0
            ? productList.map((productItem) => (
              <AdminProductTile
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
            : null
        }
      </div>
      <Sheet open={openCreateProductDialog} onOpenChange={() => {
        setOpenCreateProductsDialog(false)
        setCurrentEditedId(null)
        setFormData(initialFormData)
        setImageFile(null)
      }}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>{currnentEditId !== null ? "Edit Product" : "Add Product"}</SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            currnentEditId={currnentEditId}
            isEditMode={currnentEditId !== null}
          />
          <div className='py-6'>
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currnentEditId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Fragment>
  )
}

export default AdminProduct;