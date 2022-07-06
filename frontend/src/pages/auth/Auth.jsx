import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './Auth.css'
import Logo from '../../img/donkey.png'
import { signUp, logIn } from '../../actions/authAction'

const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [confirmPass, setConfirmPass] = useState(true)
  const [data, setData] = useState(initialState)

  const dispatch = useDispatch()
  const loading = useSelector((state) => state.authReducer.loading)
  // const navigate = useNavigate()
  console.log(loading)

  const resetForm = () => {
    setData(initialState)
    setConfirmPass(true)
  }

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setConfirmPass(true)

    if (isSignUp) {
      data.password === data.confirmPassword
        ? dispatch(signUp(data))
        : setConfirmPass(false)
    } else {
      dispatch(logIn(data))
    }
  }

  return (
    <div className="auth">
      {/* Left Side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="webname">
          <h1>G9-Social-Media</h1>
          <h6>Explore the ideas throughout the world!</h6>
        </div>
      </div>
      {/* Right Side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? 'Sign Up' : 'Sign In'}</h3>
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
              />
            </div>
          )}
          <div>
            <input
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="infoInput"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="infoInput"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="infoInput"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
              />
            )}
          </div>
          <span
            style={{
              display: confirmPass ? 'none' : 'block',
              color: 'red',
              fontSize: '15px',
            }}
          >
            Password and Confirm Password don't match!
          </span>
          <div>
            <span
              style={{ fontSize: '14px', cursor: 'pointer' }}
              onClick={() => {
                resetForm()
                setIsSignUp((prev) => !prev)
              }}
            >
              {isSignUp
                ? 'Already have an account? Sign In!'
                : "Don't have an account? Sign up!"}
            </span>
          </div>
          <button className="btn infoBtn" type="submit" disabled={loading}>
            {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Auth
