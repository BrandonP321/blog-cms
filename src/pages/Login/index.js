import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import LoginForm from '../../components/loginComponents/LoginForm'
import SignUpForm from '../../components/loginComponents/SignUpForm'
import API from '../../utils/API'
import './index.css'

export default function Login(props) {
    let history = useHistory();

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
            .then(response => {
                const token = response.headers['auth-token']
                const userId = response.data
                // store token in local storage
                localStorage.setItem('token', token)

                // redirect to user's dashboard
                history.push('/dashboard/user/' + userId)
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
            .then(response => {
                // if successfully signed up, store jwt and redirect to dashboard
                const jwt = response.headers['auth-token']
                localStorage.setItem('token', jwt)

                history.push(`/dashboard/user/${response.data}`)
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
