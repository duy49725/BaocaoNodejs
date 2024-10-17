import ProductImageUpload from '@/components/admin-view/image-upload'
import { Button } from '@/components/ui/button';
import { addFeatureImages, deleteFeatureImages, getFeatureImages } from '@/store/common-slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const AdminFeature = () => {
    const [imageFile, setImageFile] = useState(null);
    const [upLoadedImageUrl, setUpLoadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const dispatch = useDispatch();
    const {featureImageList} = useSelector((state) => state.commonFeature);
    function handleUpLoadFeatureImage(){
      dispatch(addFeatureImages(upLoadedImageUrl))
        .then((data) => {
          if(data?.payLoad?.success){
            dispatch(getFeatureImages());
            setUpLoadedImageUrl("");
            setImageFile(null);
          }
        })
    }
    useEffect(() => {
      dispatch(getFeatureImages());
    }, [dispatch])
  return (
    <div>
    <ProductImageUpload 
      imageFile={imageFile}
      setImageFile={setImageFile}
      uploadedImageUrl={upLoadedImageUrl}
      setUploadedImageUrl={setUpLoadedImageUrl}
      setImageLoadingState={setImageLoadingState}
      imageLoadingState={imageLoadingState}
      isCustomStyling={true}
    />
    <Button onClick={handleUpLoadFeatureImage} className='mt-5 w-full'>
      Upload
    </Button>
    <div className='flex flex-col gap-4 mt-5'>
        {
          featureImageList && featureImageList.length > 0
            ? featureImageList.map((featureImageList) => (
                <div className='relative'>
                    <img src={featureImageList.image} alt="" className='w-full h-[300px] object-cover rounded-t-lg'/>
                    <Button
                      className='mt-2'
                      onClick={() => dispatch(deleteFeatureImages(featureImageList._id)).then((data) => dispatch(getFeatureImages()))}
                    >
                      Delete
                    </Button>
                </div>
            ))
            :null
        }
    </div>
  </div>
  )
}

export default AdminFeature