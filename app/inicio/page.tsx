"use client"
import Feed from '@/app/components/Feed/Feed';
import { useState } from 'react';

const Home = () => {
  return (
    <>
        <div className='flex flex-col items-center'>
            <h1 className='font-Staatliches'>MEMEPAGE!</h1>
            <Feed />
        </div>
    </>
  );
};

export default Home;