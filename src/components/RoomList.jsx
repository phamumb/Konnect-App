import React from "react"
import { Dropdown } from "react-bootstrap"
function RoomList(props) {
    function onClick(event){
        console.log(event.target.name)
    }
    return (<Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Rooms
        </Dropdown.Toggle>
        <Dropdown.Menu>
            {props.rooms &&
                props.rooms.map(room=>{
                    return <Dropdown.Item onClick={onClick} key={room.id}>{room.name}</Dropdown.Item>
                })}
        </Dropdown.Menu>
    </Dropdown>)
}

export default RoomList