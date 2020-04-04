import React, { useState } from 'react'
import UserForm from "./components/UserForm"
import ChatScreen from './components/ChatScreen'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [display, setDisplay] = useState({
    currentUsername: '',
    currentScreen: 'UserForm'
  })

  function onUserSubmit(username) {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username }),
    })
      .then(response => {
        setDisplay({
          currentUsername: username,
          currentScreen: 'ChatScreen'
        })
      })
      .catch(error => console.error('error', error))
  }

    return (display.currentScreen === "UserForm")?
       <UserForm onSubmit={onUserSubmit} /> :
      <ChatScreen currentUsername={display.currentUsername}/>
    
}

export default App
