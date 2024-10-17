import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const EditPublisherForm = ({publisher, onSave, onCancel}) => {
    const [publisherId, setPublisherId] = useState(publisher.id);
    const [publisherLabel, setPublisherLabel] = useState(publisher.label);
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(publisher._id, {id: publisherId, label: publisherLabel});
    }
    useEffect(() => {
        setPublisherId(publisher.id)
        setPublisherLabel(publisher.label)
    }, [publisher])
  return (
    <form onSubmit={handleSubmit} className='mb-6'>
        <Input
            type='text'
            value={publisherId}
            onChange={(e) => setPublisherId(e.target.value)}
            placeholder="Publisher ID"
            className='mb-4'
        />
        <Input
            type='text'
            value={publisherLabel}
            onChange={(e) => setPublisherLabel(e.target.value)}
            placeholder="Publisher Label"
            className='mb-4'
        />
        <Button type="submit" className="bg-green-500 text-white mr-2">
            Save
        </Button>
        <Button onClick={() => onCancel()} type="submit" className="bg-red-500 text-white mr-2">
            Cancel
        </Button>
    </form>
  )
}

export default EditPublisherForm