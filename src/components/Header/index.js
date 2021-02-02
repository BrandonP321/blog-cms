import React, { useState, useEffect } from 'react'
import API from '../../utils/API'
import './index.css'

export default function Header() {
    const [loggedInUser, setLoggedInUser] = useState(null)

    const [showPopUp, setShowPopUp] = useState(false)

    useEffect(() => {
        // on load, validate web token in storage (if exists)
        const token = localStorage.getItem('token')

        if (token) {
            API.validateToken(token)
                .then(user => {
                    // if user is found, set their info in the state
                    setLoggedInUser(user.data)
                })
                .catch(err => {
                    // if token was invalid, set user state to null
                    setLoggedInUser(null)
                })
        }
    }, [])

    const handlePopUpToggle = () => {
        setShowPopUp(!showPopUp)
    }

    const handleLogout = () => {
        // remove jwt from local storage and redirect to home page
        localStorage.removeItem('token')
        window.location.href = '/'
    }

    return (
        <header>
            <div className='header-items-left'>
                <a href='/' className='header-logo'><i className='fad fa-comment-lines'></i> Instablog</a>
            </div>
            <div className='header-items-right'>
                <i className='fas fa-user' onClick={handlePopUpToggle}></i>
                {loggedInUser ?
                    <div className={`header-user-pop-up${showPopUp ? ' active' : ''}`}>
                        <p className='user-name'>{loggedInUser.name}</p>
                        <a className='dashboard-link' href={`dashboard/user/${loggedInUser.id}`}>My Dashboard</a>
                        <button className='logout-btn btn btn-primary' onClick={handleLogout}>Log Out</button>
                    </div> :
                    <div className={`header-user-pop-up${showPopUp ? ' active' : ''}`}>
                        <div className='flex-wrapper'>
                            <button className='login-btn btn btn-dark' onClick={() => window.location.href='/login'}>Log in</button>
                            <button className='signup-btn btn btn-dark' onClick={() => window.location.href='/signup'}>Sign Up</button>
                        </div>
                    </div>
                }
            </div>
        </header>
    )
}
