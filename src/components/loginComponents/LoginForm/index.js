import React from 'react'
import './index.css'

export default function LoginForm(props) {
    const { handleLoginAttempt, toggleForm, handleLoginTextInputChange } = props

    return (
        <div className='login-form-container'>
            <h1>Login</h1>

            <form onSubmit={handleLoginAttempt}>
                <div class="form-group">
                    <label for="login-email-input">Email address</label>
                    <input type="email" class="form-control" id="login-email-input" name='email' onChange={handleLoginTextInputChange} required />
                    {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div class="form-group">
                    <label for="login-password-input">Password</label>
                    <input type="password" class="form-control" id="login-password-input" name='password' onChange={handleLoginTextInputChange} required />
                    {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>

            <p>Don't have an account? <a href='#' onClick={toggleForm}>Sign Up</a></p>
        </div>
    )
}
