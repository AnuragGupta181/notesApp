
import { memo, useEffect, useState } from 'react';

const NoteModal = ({closeModal, addNote, editNote, currentNote}) => {
    const [title, setTitle] = useState(currentNote?.title || '');
    const [description, setDescription] = useState(currentNote?.description || '');

    useEffect(() => {
        if (currentNote) {
            setTitle(currentNote.title);
            setDescription(currentNote.description);
        }
    }, [currentNote]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentNote) {
            editNote(currentNote._id, { title, description });
        } else {
            addNote(title, description);
        }
    };

  return (
    <>
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className='bg-white p-8 rounded'>
      <h2 className='text-xl font-bold mb-4'>{currentNote ? "Edit Note" : "Add New Note"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          className=" border p-2 mb-4 w-full"
        />
      <textarea
        placeholder="Description"
        value={description}
        required
        onChange={(e) => setDescription(e.target.value)}
        className=" border p-2 mb-4 w-full"
      />
      <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded">{currentNote ? "Update Note" : "Add Note"}</button>
      </form>
      <button onClick={closeModal} className='mt-4 text-red-500'>Cancel</button>
      </div>
    </div>
    </>
  );
};

export default memo(NoteModal);