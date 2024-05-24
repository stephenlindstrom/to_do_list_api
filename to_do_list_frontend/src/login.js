import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import Cookies from 'js-cookie';

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const onButtonClick = () => {
    logIn();
  }

  const logIn = () => {
    fetch('http://localhost:8000/login/', {
        method: 'POST',
        body: {'username': email, 'password': password}
    })
    .then(r => {
        if (r) {
            console.log(r)
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