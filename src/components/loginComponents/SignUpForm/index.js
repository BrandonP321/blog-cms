import React from 'react'
import './index.css'

export default function SignUpForm(props) {
    const { toggleForm, 
        handleSignUpAttempt, 
        handleSignUpTextinputChange,
        signUpPasswordsMatch
    } = props

    return (
        <div className='signup-form-container'>
            <h1>Sign Up</h1>

            <form onSubmit={handleSignUpAttempt}>
                <div className="form-group">
                    <label for="signup-name-input">Name</label>
                    <input type="text" className="form-control" id="signup-name-input" name='name' onChange={handleSignUpTextinputChange} required/>
                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group">
                    <label for="signup-email-input">Email address</label>
                    <input type="email" className="form-control" id="signup-email-input" name='email' onChange={handleSignUpTextinputChange} required/>
                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group">
                    <label for="signup-password-input">Password</label>
                    <input type="password" className="form-control" id="signup-password-input" name='password' onChange={handleSignUpTextinputChange} required/>
                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group">
                    <label for="signup-password-second-input">Re-Enter Password</label>
                    <input type="password" className="form-control" id="signup-password-second-input" name='passwordReEnter' onChange={handleSignUpTextinputChange} required/>
                    <small id="emailHelp" className="form-text text-muted text-danger">{signUpPasswordsMatch ? '' : 'Passwords must match'}</small>
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>

            <p>Already have an account? <a href='#' onClick={toggleForm}>Login</a></p>
        </div>
    )
}
