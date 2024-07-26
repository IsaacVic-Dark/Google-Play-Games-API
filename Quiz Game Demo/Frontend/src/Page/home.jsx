import React, { useEffect } from 'react';
import Joystick from '../assets/Joystick.gif';
import puzzle from '../assets/puzzle.gif';
import archer from '../assets/archer.gif';
import rugby_ball from '../assets/rugby-ball.gif';
import '../styles/home.css';

export default function Home() {
  // Function to set random positions for the GIFs
  const setRandomPositions = () => {
    const gifs = document.querySelectorAll('.gif');
    gifs.forEach(gif => {
      const randomX = Math.floor(Math.random() * (window.innerWidth - 60));
      const randomY = Math.floor(Math.random() * (window.innerHeight - 60));
      gif.style.left = `${randomX}px`;
      gif.style.top = `${randomY}px`;
    });
  };

  useEffect(() => {
    setRandomPositions();
    window.addEventListener('resize', setRandomPositions); // Reposition on window resize

    return () => {
      window.removeEventListener('resize', setRandomPositions);
    };
  }, []);

  return (
    <>
      <h1 className='title'>Welcome to <span style={{color: '#2fc078'}}>Quiz</span> Game</h1>
      <img src={Joystick} alt="GIF" className='gif' />
      <img src={archer} alt="GIF" className='gif' />
      <img src={puzzle} alt="GIF" className='gif' />
      <img src={rugby_ball} alt="GIF" className='gif' />
    </>
  );
}
