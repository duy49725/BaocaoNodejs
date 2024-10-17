import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const AddCategoryForm = ({ onAdd }) => {
  const [categoryId, setCategoryId] = useState('');
  const [categoryLabel, setCategoryLabel] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ id: categoryId, label: categoryLabel });
    setCategoryId('');
    setCategoryLabel('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <Input
        type="text"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        placeholder="Category ID"
        className="mb-4"
      />
      <Input
        type="text"
        value={categoryLabel}
        onChange={(e) => setCategoryLabel(e.target.value)}
        placeholder="Category Label"
        className="mb-4"
      />
      <Button type="submit" className="bg-blue-500 text-white">
        Add Category
      </Button>
    </form>
  );
};

export default AddCategoryForm;