import React, { useState, useEffect } from 'react'
import LoginForm from '../../components/loginComponents/LoginForm'
import SignUpForm from '../../components/loginComponents/SignUpForm'
import API from '../../utils/API'
import './index.css'

export default function Login(props) {
    const { isMakingNewAccount } = props

    // boolean to show login or sign up form
    const [showLoginForm, setShowLoginForm] = useState(!isMakingNewAccount)

    const [signUpPasswordsMatch, setSignUpPasswordsMatch] = useState(true)

    const [signUpFormInput, setSignUpFormInput] = useState({
        name: '',
        email: '',
        password: '',
        passwordReEnter: '',
    })

    const [loginFormInput, setLoginFormInput] = useState({
        email: '',
        password: '',
    })

    useEffect(() => {
        // when sign up form is updated, check if passwords match
        const { password, passwordReEnter } = signUpFormInput;
        setSignUpPasswordsMatch(password === passwordReEnter)
    }, [signUpFormInput])

    const handleLoginTextInputChange = event => {
        // get name and value of input changed
        const name = event.target.name;
        const value = event.target.value;

        // update state with new value
        setLoginFormInput({ ...loginFormInput, [name]: value})
    }

    const handleSignUpTextinputChange = event => {
        // get name and value of input changed
        const name = event.target.name
        const value = event.target.value

        // update state with new value
        setSignUpFormInput({ ...signUpFormInput, [name]: value })
    }

    const toggleForm = () => {
        // toggle boolean in state
        setShowLoginForm(!showLoginForm)
    }

    const handleLoginAttempt = (event) => {
        event.preventDefault();

        // send request to server to attempt login
        API.login(loginFormInput)
            .then(({ data: user }) => {
                console.log(user)
                // redirect to user's dashboard
                window.location.href = '/dashboard/user/' + user._id
            })
            .catch(err => {
                switch(err.response.status) {
                    case 401:
                        // email or password were incorrect
                        break;
                }
            })
    }

    const handleSignUpAttempt = (event) => {
        event.preventDefault();

        const { name, email, password } = signUpFormInput

        const userObj = {
            name: name,
            email: email,
            password: password
        }

        // send request to server to create account
        API.createNewAccount(userObj)
            .then(user => {

            })
            .catch(err => {
                switch(err.response.status) {
                    case 409:
                        // user with same email address alreay exists
                        break;
                }
            })
    }

    return (
        <>
            {showLoginForm ? 
                <LoginForm 
                    toggleForm={toggleForm}
                    handleLoginAttempt={handleLoginAttempt}
                    handleLoginTextInputChange={handleLoginTextInputChange}
                /> :
                <SignUpForm 
                    toggleForm={toggleForm}
                    signUpPasswordsMatch={signUpPasswordsMatch}
                    handleSignUpAttempt={handleSignUpAttempt}
                    handleSignUpTextinputChange={handleSignUpTextinputChange}
                />
            }  
        </>
    )
}
