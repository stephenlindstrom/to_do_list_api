import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' 

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const onButtonClick = () => {
    logIn();
  }

  const checkAccountExists = (callback) => {
    fetch('http://localhost:3000/check-account', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
    })
    .then(r => r.json())
    .then(r => {
        callback(r?.userExists)
    })
  }

  const logIn = () => {
    fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"username": email, "password": password})
    })
    .then(r => r.json())
    .then(r => {
        if (r.access) {
            localStorage.setItem('user', JSON.stringify({email, token: r.token}))
            props.setLoggedIn(true)
            props.setEmail(email)
            navigate('/')
        } else {
            window.alert('Wrong email or password')
        }
    })
  }

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type='password'
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
    </div>
  )
}

export default Login