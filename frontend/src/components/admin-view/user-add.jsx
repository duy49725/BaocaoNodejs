import { createUser, fetchUsers } from '@/store/admin/user-slice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select'; // Sửa lại Select import
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';

const AddUserDialog = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');  // Default role
    const [isActive, setIsActive] = useState(true);
    const [error, setError] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.adminUser.loading);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            userName,
            email,
            password,
            role,
            isActive,
        };

        try {
            await dispatch(createUser(userData)).unwrap().then((data) =>
                dispatch(fetchUsers())
            );
            setUserName('');
            setEmail('');
            setPassword('');
            setRole('user'); // Reset role after submit
            setIsActive(true);
            setDialogOpen(false);
        } catch (err) {
            setError('Failed to add user. Please try again.');
        }
        
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-500 text-white p-2 mb-4">Add New User</Button>
            </DialogTrigger>

            <DialogContent className="max-w-lg">
                <DialogTitle className="text-xl font-bold">Add New User</DialogTitle>
                <DialogDescription className="text-sm text-gray-600 mb-4">
                    Please fill in the details of the new user.
                </DialogDescription>

                {error && <p className="text-red-500">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4" autoComplete='off'>
                    <div>
                        <Label htmlFor="userName" className="block text-sm font-medium mb-4">User Name</Label>
                        <Input
                            type="text"
                            id="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="border p-2 w-full"
                            required
                            autoComplete='off'
                        />
                    </div>

                    <div>
                        <Label htmlFor="email" className="block text-sm font-medium mb-4">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border p-2 w-full"
                            required
                            autoComplete="off"
                        />
                    </div>

                    <div>
                        <Label htmlFor="password" className="block text-sm font-medium mb-4">Password</Label>
                        <Input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border p-2 w-full"
                            required
                            autoComplete="off"
                        />
                    </div>

                    <div>
                        <Label htmlFor="role" className="block text-sm font-medium mb-4">Role</Label>
                        <Select
                            id="role"
                            value={role}
                            onValueChange={setRole} // Dùng onValueChange thay cho onChange
                            className="border p-2 w-full"
                        >
                            <SelectTrigger className="w-full border p-2">
                                {role}  {/* Hiển thị giá trị role đã chọn */}
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="isActive" className="block text-sm font-medium mb-4">Active</Label>
                        <Checkbox
                            id="isActive"
                            checked={isActive}
                            onCheckedChange={(checked) => setIsActive(checked)} 
                            className="rounded-md"
                        />
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className={`p-2 w-full ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white`}
                            disabled={loading}
                        >
                            {loading ? 'Adding User...' : 'Add User'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddUserDialog;
