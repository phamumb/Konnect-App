import React, {useState} from "react"
import { Button } from 'react-bootstrap';

function AddUserRoom(props) {
    const[user,setUser] = useState({username: ""})

    function onChange(event){
        setUser({username:event.target.value})
    }

    function onSubmit(event){
        event.preventDefault()
        props.onAddUser(user.username)
    }

    return <div className="add-user-room">
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Enter a username to join" onChange={onChange} />
            <Button as="input" type="submit" value="Add" onClick={onSubmit} />
        </form>
    </div>
}

export default AddUserRoom