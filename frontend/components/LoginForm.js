import React, { useState } from 'react'
import axios from 'axios'
import PT from 'prop-types'
import { useNavigate } from 'react-router-dom'

const initialFormValues = {
  username: '',
  password: '',
}
export default function LoginForm(props) {
  const [values, setValues] = useState(initialFormValues)
  const navigate = useNavigate()

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    axios.post('http://localhost:9000/api/login', values)
      .then(res => {
        localStorage.setItem('token', res.data.token)
        navigate('/articles')
      })
      .catch(err => console.log(err))
    
  }

  const isDisabled = () => {
    const trimmedUsername = values.username.trim()
    const trimmedPassword = values.password.trim()
    return trimmedUsername.length < 3 || trimmedPassword.length < 8
  }

  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        maxLength={20}
        value={values.username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
      />
      <input
        maxLength={20}
        value={values.password}
        onChange={onChange}
        placeholder="Enter password"
        id="password"
      />
      <button disabled={isDisabled()} id="submitCredentials">Submit credentials</button>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
LoginForm.propTypes = {
  login: PT.func.isRequired,
}
