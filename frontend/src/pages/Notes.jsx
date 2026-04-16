import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  StickyNote, 
  Search, 
  Plus, 
  Grid, 
  List,
  MoreHorizontal
} from 'lucide-react';
import { Card } from '../components/molecules/Card';
import { Button } from '../components/atoms/Button';
import { Badge } from '../components/atoms/Badge';

import { useNoteStore } from '../context/noteStore';
import { useEffect } from 'react';
import { Modal } from '../components/organisms/Modal';

/**
 * Notes page with grid/list toggles and backend persistence.
 */
const Notes = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { notes, isLoading, fetchNotes, createNote, deleteNote } = useNoteStore();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleCreateNote = async () => {
    if (!noteTitle.trim()) return;
    try {
      await createNote({
        title: noteTitle,
        content: noteContent,
        tag: 'General',
        date: new Date().toLocaleDateString()
      });
      setIsModalOpen(false);
      setNoteTitle('');
      setNoteContent('');
    } catch (error) {
      console.error(error);
    }
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-accent-emerald/10 text-accent-emerald shadow-sm">
            <StickyNote className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-surface-100 tracking-tight">Personal Notes</h1>
            <p className="text-surface-600 mt-1 font-semibold">Capture ideas and documentation.</p>
          </div>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-5 h-5" />}
          size="lg"
          className="shadow-xl"
        >
          New Note
        </Button>
      </header>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-surface-800 text-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all shadow-sm"
          />
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-surface-800 self-end md:self-auto shadow-sm">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-primary-500/10 text-primary-700 shadow-sm' : 'text-surface-500 hover:text-primary-500'}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-primary-500/10 text-primary-700 shadow-sm' : 'text-surface-500 hover:text-primary-500'}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Notes Content */}
      <motion.div 
        layout
        className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }
      >
        {filteredNotes.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-surface-800">
            <p className="text-surface-500 font-bold">No notes found matching your search.</p>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <motion.div layout key={note.id}>
              <Card 
                className="h-full hover:shadow-primary-500/5 group"
                footer={
                  <div className="flex justify-between items-center text-xs text-surface-600 font-bold">
                    <span>Last edited {note.date}</span>
                    <Badge variant="default">{note.tag}</Badge>
                  </div>
                }
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-black text-xl text-surface-100 group-hover:text-primary-600 transition-colors">{note.title}</h3>
                  <button 
                    onClick={() => deleteNote(note.id)}
                    className="p-1.5 text-surface-400 hover:text-accent-rose transition-colors rounded-lg hover:bg-red-50"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-surface-600 text-sm line-clamp-4 leading-relaxed font-semibold">
                  {note.content}
                </p>
              </Card>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Create Note Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Note"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateNote}>Save Note</Button>
          </>
        }
      >
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-black text-surface-600 uppercase tracking-wider mb-2">Note Title</label>
            <input 
              type="text" 
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="e.g., Project Brainstorming"
              className="w-full px-5 py-4 rounded-xl bg-surface-50 border border-surface-800 text-surface-100 focus:ring-2 focus:ring-primary-500/50 focus:outline-none transition-all" 
            />
          </div>
          <div>
            <label className="block text-sm font-black text-surface-600 uppercase tracking-wider mb-2">Content</label>
            <textarea 
              rows={6}
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Start typing your thoughts..."
              className="w-full px-5 py-4 rounded-xl bg-surface-50 border border-surface-800 text-surface-100 focus:ring-2 focus:ring-primary-500/50 focus:outline-none transition-all resize-none" 
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Notes;
