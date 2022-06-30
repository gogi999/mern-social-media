import React from 'react'
import './Auth.css'
import Logo from '../../img/logo.png'

const Auth = () => {
  return (
    <div className="auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="webname">
          <h1>G9-Media</h1>
          <h6>Explore the ideas throughout the world!</h6>
        </div>
      </div>
      <Signup />
      {/* <Signin /> */}
    </div>
  )
}

const Signup = () => (
  <div className="a-right">
    <form className="infoForm authForm">
      <h3>Sign Up</h3>
      <div>
        <input
          type="text"
          placeholder="First Name"
          className="infoInput"
          name="firstName"
        />
        <input
          type="text"
          placeholder="Last Name"
          className="infoInput"
          name="lastName"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Username"
          className="infoInput"
          name="username"
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          className="infoInput"
          name="password"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="infoInput"
          name="confirmPassword"
        />
      </div>
      <div>
        <span style={{ fontSize: '14px' }}>
          Already have an account? <b>Login!</b>
        </span>
      </div>
      <button className="btn infoBtn" type="submit">
        Signup
      </button>
    </form>
  </div>
)

const Signin = () => (
  <div className="a-right">
    <form className="infoForm authForm">
      <h3>Sign In</h3>
      <div>
        <input
          type="text"
          placeholder="Username"
          className="infoInput"
          name="username"
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          className="infoInput"
          name="password"
        />
      </div>
      <div>
        <span style={{ fontSize: '14px' }}>
          Don't have an account? <b>Register!</b>
        </span>
      </div>
      <button className="btn infoBtn" type="submit">
        Signin
      </button>
    </form>
  </div>
)

export default Auth
