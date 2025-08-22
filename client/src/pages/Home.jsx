import { memo } from 'react';

const Home = () => {
  return (
    <div className='text-center flex-box align-center justify-center min-h-screen bg-beige items-center flex'>
      <h2 className='text-center text-5xl font-bold text-black'> Welcome to our Notes App </h2>
    </div>
  );
};

export default memo(Home); 