import { memo } from 'react';

const NoteCard = ({note, deleteNote, onEdit}) => {
  return (
    <div className="bg-gray-200 p-4 rounded shadow">

      <h2 className='text-4xl font-bold'>{note.title}</h2>
      <p className='text-gray-800 p-2'>{note.description}</p>
      <p className='text-gray-600'>{new Date(note.createdAt).toLocaleString()}</p>

      <button className='mt-2 mx-3 p-2 text-blue-500' onClick={() => onEdit(note)}>Edit</button>
      <button className='mt-2 text-red-500' onClick={() => deleteNote(note._id)}>Delete</button>

    </div>
  );
};

export default memo(NoteCard);