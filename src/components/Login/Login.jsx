import React, { useState } from 'react'
import { ACTIONS } from '../../context/types'
import './login.css'

function Login({dispatch}) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
    
  return (
    <form className='form' onSubmit={() => dispatch({ type: ACTIONS.LOGIN, payload: {username, password} })}>
      <div className='form-heading'>Login</div>
      <input type="text" name='username' placeholder='Enter username' value={username} onChange={e => onChange(e)} required />
      <input type="password" name='password' placeholder='Enter password' value={password} onChange={e => onChange(e)} required />
      <input type="submit" value="Submit" />
    </form>
  )
}

export default Login