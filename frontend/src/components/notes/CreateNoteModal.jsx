import { useState } from 'react';
import { Modal } from '../common/Modal.jsx';
import { Input } from '../common/Input.jsx';
import { Button } from '../common/Button.jsx';

export const CreateNoteModal = ({ isOpen, onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() && content.trim()) {
            onSubmit(title, content);
            setTitle('');
            setContent('');
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Note" size="lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Note Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter note title"
                    required
                />
                <div className="space-y-1">
                    <label className="block text-sm font-medium text-[#E2E8F0]">
                        Content
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your note here..."
                        rows={8}
                        className="w-full px-3 py-2 bg-[#0F172A] border border-[#334155] rounded-lg text-[#E2E8F0] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent resize-none"
                        required
                    />
                </div>
                <div className="flex justify-end space-x-3">
                    <Button variant="ghost" onClick={onClose} type="button">
                        Cancel
                    </Button>
                    <Button type="submit">Create Note</Button>
                </div>
            </form>
        </Modal>
    );
};
