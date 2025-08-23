import { memo, useState } from 'react';
import NoteModal from '../components/NoteModal';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addNote = async (title, description, setLoading) => {
    setLoading(true);
    toast.promise(
        axios.post(`${import.meta.env.VITE_URL}api/notes/add-note`, { title, description }, { 
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }),
        {
            loading: 'Adding note...',
            success: () => {
                window.location.href = "/dashboard";
                closeModal();
                return <b>Note added successfully!</b>;
            },
            error: (error) => {
                console.error(error);
                return <b>{error.response?.data?.message || "Note addition failed"}</b>;
            },
        }
    ).finally(() => setLoading(false));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <><Toaster/>
    <div className="bg-gray-100 min-h-screen">
      <button onClick={() => setIsModalOpen(true)} className='fixed right-4 bottom-4 font-bold text-2xl bg-blue-500 text-white px-4 py-2 rounded-full'>+</button>

      {isModalOpen && <NoteModal closeModal={closeModal} addNote={addNote} />}
    </div>
    </>
  );
};

export default memo(Dashboard);