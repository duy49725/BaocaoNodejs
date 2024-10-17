import React, { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const EditCategoryForm = ({ category, onSave }) => {
    const [categoryId, setCategoryId] = useState(category.id);
    const [categoryLabel, setCategoryLabel] = useState(category.label);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(category._id, { id: categoryId, label: categoryLabel });
    };
  
    useEffect(() => {
      setCategoryId(category.id);
      setCategoryLabel(category.label);
    }, [category]);
  
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
        <Button type="submit" className="bg-green-500 text-white mr-2">
          Save
        </Button>
      </form>
    );
  };
  
  export default EditCategoryForm;