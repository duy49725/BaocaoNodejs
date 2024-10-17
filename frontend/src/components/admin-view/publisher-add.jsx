import React, { useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const AddPublisherForm = ({onAdd}) => {
    const [publisherId, setPublisherId] = useState('');
    const [publisherLabel, setPublisherLabel] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd({id: publisherId, label: publisherLabel});
        setPublisherId('');
        setPublisherLabel('');
    }
  return (
    <form onSubmit={handleSubmit} className='mb-6'>
        <Input
            type="text"
            value={publisherId}
            onChange={(e) => setPublisherId(e.target.value)}
            placeholder="Publisher ID"
            className="mb-4"
        />
        <Input
            type="text"
            value={publisherLabel}
            onChange={(e) => setPublisherLabel(e.target.value)}
            placeholder="Publisher Label"
            className="mb-4"
        />
        <Button type="submit" className="bg-blue-500 text-white">
            Add Publisher
        </Button>
    </form>
  )
}

export default AddPublisherForm;