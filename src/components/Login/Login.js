import React, {useState} from 'react'

const Login = (props) => {
  const [email, changeEmail] = useState('')
  const [password, changePassword] = useState('')
  return (
    <div>
      <form action="" onSubmit={e => {
        e.preventDefault()
        props.createUser(email, password)
      }}>
        email:<input type="text" value={email} onChange={e => changeEmail(e.target.value)}/>
        <input type="text" value={password} onChange={e => changePassword(e.target.value)}/>
        <button type="submit">Sub</button>
      </form>
    </div>
  )
}

export default Login
