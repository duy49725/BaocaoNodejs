import Pagination from '@/components/admin-view/pagination';
import AddUserDialog from '@/components/admin-view/user-add';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { deleteUser, fetchUsers, updateUserActiveStatus } from '@/store/admin/user-slice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const UserManagement = () => {
    const dispatch = useDispatch();
    const { users, loading, currentPage, totalPages } = useSelector(state => state.adminUser);
    const { toast } = useToast()
    useEffect(() => {
        dispatch(fetchUsers({ page: currentPage, limit: 5 }));
    }, [dispatch, currentPage]);

    const handleDeleteUser = (id) => {
        dispatch(deleteUser(id)).then((data) => {
            if (data.payload.success) {
                dispatch(fetchUsers({ page: currentPage, limit: 5 }));
                toast({
                    title: "Delete successfully"
                })
            }
        }
        );
    };

    const handleToggleActive = (id, isActive) => {
        console.log(id, isActive)
        dispatch(updateUserActiveStatus({ id, isActive })).then((data) => {
            dispatch(fetchUsers({ page: currentPage, limit: 5 }));
        });
    };
    const handlePageChange = (pageNumber) => {
        console.log(pageNumber)
        dispatch(fetchUsers({ page: pageNumber, limit: 5 }));
    }

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <AddUserDialog />
            <table className="w-full bg-white rounded-lg shadow-md">
                <thead className="bg-gray-100">
                    <tr>
                        <td className="py-2 px-4 font-bold">Username</td>
                        <td className="py-2 px-4 font-bold">Email</td>
                        <td className="py-2 px-4 font-bold">Role</td>
                        <td className="py-2 px-4 font-bold">Active</td>
                        <td className="py-2 px-4 font-bold">Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        users && users.length > 0
                            ? users.map((user) => (
                                <tr key={user._id} className="border-b">
                                    <td className="py-2 px-4">{user.userName}</td>
                                    <td className="py-2 px-4">{user.email}</td>
                                    <td className="py-2 px-4">{user.role}</td>
                                    <td className="py-2 px-4">
                                        <Checkbox
                                            checked={user.isActive}
                                            onCheckedChange={(checked) => handleToggleActive(user._id, checked)}
                                            className="rounded-md"
                                        />
                                    </td>
                                    <td className="py-2 px-4">
                                        <button
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-all">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                            : null
                    }
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default UserManagement;

