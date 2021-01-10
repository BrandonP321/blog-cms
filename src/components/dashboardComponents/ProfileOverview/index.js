import React from 'react'
import './index.css'

export default function ProfileOverview() {
    return (
        <div className='profile-container'>
            <h2>My Profile</h2>
            <div className='profile-info-group'>
                <p className='info-heading'><strong>Name</strong></p>
                <p className='info'>Brandon</p>
            </div>
            <div className='profile-info-group'>
                <p className='info-heading'><strong>Email</strong></p>
                <p className='info'>email@email.com</p>
            </div>
            <div className='profile-info-group'>
                <p className='info-heading'><strong>Bio</strong></p>
                <p className='info'>This is my bio</p>
            </div>
        </div>
    )
}
