import Pagination from '@/components/admin-view/pagination';
import AddPublisherForm from '@/components/admin-view/publisher-add';
import EditPublisherForm from '@/components/admin-view/publisher-edit';
import PublisherLish from '@/components/admin-view/publisher-list';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { addNewPublisher, deletePublisher, editPublisher, fetchAllPublisher } from '@/store/admin/publisher-slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AdminPublisherPage = () => {
    const dispatch = useDispatch();
    const { publisherList, isLoading, currentPage, totalPages } = useSelector((state) => state.adminPublisher);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingPublisher, setEditingPublisher] = useState(null);
    useEffect(() => {
        dispatch(fetchAllPublisher({ page: currentPage, limit: 5 }));
    }, [dispatch, currentPage])
    const handleAddPublisher = (formData) => {
        dispatch(addNewPublisher(formData)).then(() => {
            dispatch(fetchAllPublisher({ page: currentPage, limit: 5 }))
            setOpenDialog(false);
        })
    }

    const handleEditPublisher = (id, formData) => {
        dispatch(editPublisher({ id, formData })).then(() => {
            dispatch(fetchAllPublisher({ page: currentPage, limit: 5 }));
            setEditingPublisher(null);
            setOpenDialog(false);
        })
    }
    const handleDeletePublisher = (id) => {
        dispatch(deletePublisher(id)).then(() => {
            dispatch(fetchAllPublisher({ page: currentPage, limit: 5 }))
        })
    }
    const handlePageChange = (pageNumber) => {
        dispatch(fetchAllPublisher({ page: pageNumber, limit: 5 }));
    }
    return (
        <div className='p-6'>
            <h1 className='text-2xl font-bold mb-4'>Manage Publisher</h1>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='bg-blue-500 text-white py-2 px-4 rounded mb-4'>Add New Publisher</Button>
                </DialogTrigger>
                <DialogContent>
                    <h2 className='text-xl font-bold mb-4'>Add New Publisher</h2>
                    <AddPublisherForm onAdd={handleAddPublisher} />
                    <DialogClose asChild>
                        <Button className="bg-red-500 text-white py-1 px-2 mt-2 rounded">Close</Button>
                    </DialogClose>
                </DialogContent>
            </Dialog>
            {
                editingPublisher && <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent>
                        <h2 className='text-xl font-bold mb-4'>Edit Publisher</h2>
                        <EditPublisherForm
                            publisher={editingPublisher}
                            onSave={handleEditPublisher}
                            onCancel={() => setOpenDialog(false)}
                        />
                    </DialogContent>
                </Dialog>
            }
            {
                isLoading
                    ? (<p>Loading publisher....</p>)
                    : (
                        <div>
                            <PublisherLish
                                publishers={publisherList}
                                onEdit={(publisher) => {
                                    setEditingPublisher(publisher);
                                    setOpenDialog(true);
                                }}
                                onDelete={handleDeletePublisher}
                            />
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )
            }
        </div>
    )
}

export default AdminPublisherPage;