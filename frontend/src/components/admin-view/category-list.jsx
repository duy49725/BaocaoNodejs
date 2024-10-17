import React from 'react';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableRow } from '../ui/table';

const CategoryList = ({ categories, onEdit, onDelete }) => {
  return (
    <div className="overflow-auto">
      <Table className="min-w-full bg-white shadow-md rounded-lg">
        <TableBody>
          <TableRow className="bg-gray-100">
            <TableCell className="px-6 py-3 text-left font-bold">ID</TableCell>
            <TableCell className="px-6 py-3 text-left font-bold">Label</TableCell>
            <TableCell className="px-6 py-3 text-left font-bold">Actions</TableCell>
          </TableRow>
          {categories.map((category) => (
            <TableRow key={category._id} className="border-t border-gray-200">
              <TableCell className="px-6 py-4 whitespace-nowrap">{category.id}</TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">{category.label}</TableCell>
              <TableCell className="px-6 py-4 flex space-x-2">
                <Button
                  className="bg-yellow-500 text-white py-1 px-4 rounded"
                  onClick={() => onEdit(category)}
                >
                  Edit
                </Button>
                <Button
                  className="bg-red-500 text-white py-1 px-4 rounded"
                  onClick={() => onDelete(category._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default CategoryList;
