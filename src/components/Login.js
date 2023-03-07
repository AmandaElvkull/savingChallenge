import React, { useState } from 'react';
import { batch, useDispatch /* , useSelector  */ } from 'react-redux';
import userSlice from 'reducers/userSlice';
import styled from 'styled-components';

const Login = () => {
  const [password, setPassword] = useState('');
  const [userName, setUsername] = useState('');
  /* const [catchError, setCatchError] = useState('') */
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userName, password })
    };
    fetch('http://localhost:8080/register', options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(userSlice.actions.addUsername(data.response.username))
            dispatch(userSlice.actions.addUserId(data.response.userId))
            dispatch(userSlice.actions.addAccessToken(data.response.accessToken))
          /*   dispatch(userSlice.actions.catchError(null))
            setCatchError(null) */
          })
        } else {
          batch(() => {
            dispatch(userSlice.actions.addUsername(null))
            dispatch(userSlice.actions.addUserId(null))
            dispatch(userSlice.actions.addAccessToken(null))
            /* dispatch(userSlice.actions.catchError(data.response)) */
            /* setCatchError(data.response) */
          })
        }
      })
  }

  return (
    <Container>
      <Form
        onSubmit={handleLogin}>
        <InputuserName
          type="text"
          id="userName"
          value={userName}
          onChange={(event) => setUsername(event.target.value)} />

        <InputPassword
          type="text"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)} />

        <button type="submit"> let´s go </button>
      </Form>
    </Container>

  )
}

const Container = styled.section`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr; 
align-items: center; 
align-content: center; 
border: solid black 5px; 
`

const Form = styled.form`
display: flex; 
flex-direction: column; 
grid-column: 2 / 4; 
justify-items: center; 
margin-top: 4em; 
height: auto; 
margin-bottom: 4em; 
padding: 5em; 
border: solid black 5px; 
 `

const InputPassword = styled.input`
margin: 10px;
grid-column: 2 /3; `

const InputuserName = styled.input`
margin: 10px; 
grid-column: 2 /3 ;`

export default Login