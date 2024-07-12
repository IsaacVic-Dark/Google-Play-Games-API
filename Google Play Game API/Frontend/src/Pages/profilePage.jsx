import React from 'react'
import '../styles/profile.css'

function Profile() {
  return (
    <>
      <h1>profilePage</h1>
      <div className='main'>
        <div className='Profile-pic'>
          <img src="/game-console.png" alt="No Photo" />
          <h2>Name</h2>
          <h3>Role</h3>
        </div>
        <div className='details'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, necessitatibus hic. In beatae perferendis vero pariatur fugit eaque ipsa ducimus quod minus inventore, nisi laborum, optio, harum quae quas incidunt.</p>
        </div>
      </div>
    </>
  )
}
export default Profile