import { memo, useEffect, useState } from 'react';
import NoteModal from '../components/NoteModal';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import NoteCard from '../components/NoteCard';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}api/notes/get-notes`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setNotes(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch notes.');
    }
  };

  const addNote = async (title, description) => {
    return toast.promise(
      axios.post(
        `${import.meta.env.VITE_URL}api/notes/add-note`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      ),
      {
        loading: 'Adding note...',
        success: () => {
          closeModal();
          fetchNotes();
          return <b>Note added successfully!</b>;
        },
        error: (error) => (
          <b>{error.response?.data?.message || 'Note addition failed'}</b>
        ),
      }
    );
  };

  const editNote = async (id, title, description) => {
    return toast.promise(
      axios.put(
        `${import.meta.env.VITE_URL}api/notes/update-note/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      ),
      {
        loading: 'Updating note...',
        success: () => {
          closeModal();
          fetchNotes();
          return <b>Note updated successfully!</b>;
        },
        error: (error) => (
          <b>{error.response?.data?.message || 'Note update failed'}</b>
        ),
      }
    );
  };

  const deleteNote = async (id) => {
    return toast.promise(
      axios.delete(
        `${import.meta.env.VITE_URL}api/notes/delete-note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      ),
      {
        loading: 'Deleting note...',
        success: () => {
          fetchNotes();
          return <b>Note deleted successfully!</b>;
        },
        error: (error) => (
          <b>{error.response?.data?.message || 'Note deletion failed'}</b>
        ),
      }
    );
  };

  const onEdit = (note) => {
    setCurrentNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentNote(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Toaster />

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-8 py-4">
        {notes.length === 0 ? (
          <div className="col-span-full text-2xl text-center text-gray-500 font-semibold">
            No notes exist.
          </div>
        ) : (
          notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={onEdit}
              deleteNote={deleteNote}
            />
          ))
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed right-4 bottom-4 font-bold text-2xl bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600"
      >
        +
      </button>

      {/* Modal */}
      {isModalOpen && (
        <NoteModal
          closeModal={closeModal}
          addNote={addNote}
          editNote={editNote}
          deleteNote={deleteNote}
          currentNote={currentNote}
        />
      )}
    </div>
  );
};

export default memo(Dashboard);
