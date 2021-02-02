import React, { useState, useEffect } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import API from '../../utils/API'
import './index.css'

export default function Header() {
    const location = useLocation();
    let history = useHistory();

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
        } else {
            setLoggedInUser(false)
        }

        // hide pop up when page changes
        setShowPopUp(false)
    }, [location])

    const handlePopUpToggle = () => {
        setShowPopUp(!showPopUp)
    }

    const handleLogout = () => {
        // remove jwt from local storage and redirect to home page
        localStorage.removeItem('token')

        // if current page is home page, refresh page
        if (location.pathname === '/') history.go(0)
        else history.push('/')
    }

    return (
        <header>
            <div className='header-items-left'>
                <Link to='/' className='header-logo'><i className='fad fa-comment-lines'></i> Instablog</Link>
            </div>
            <div className='header-items-right'>
                <i className='fas fa-user' onClick={handlePopUpToggle}></i>
                {loggedInUser ?
                    <div className={`header-user-pop-up${showPopUp ? ' active' : ''}`}>
                        <p className='user-name'>{loggedInUser.name}</p>
                        <Link className='dashboard-link' to={`dashboard/user/${loggedInUser.id}`}>My Dashboard</Link>
                        <button className='logout-btn btn btn-primary' onClick={handleLogout}>Log Out</button>
                    </div> :
                    <div className={`header-user-pop-up${showPopUp ? ' active' : ''}`}>
                        <div className='flex-wrapper'>
                            <Link className='login-btn btn btn-dark' to='/login'>Log in</Link>
                            <Link className='signup-btn btn btn-dark' to='/signup'>Sign Up</Link>
                        </div>
                    </div>
                }
            </div>
        </header>
    )
}
