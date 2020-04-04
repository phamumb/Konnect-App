import React, { useState } from "react"
import { Button } from 'react-bootstrap';

function UserForm(props) {
    const [user, setUser] = useState({ username: "" })

    function onChange(event) {
        setUser({ username: event.target.value })
    }

    function onSubmit(event) {
        event.preventDefault()
        props.onSubmit(user.username)
    }

    return (
        <div class="container">
            <div class="row">
                <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div class="card card-signin my-5">
                        <div class="card-bodyr">
                            <h2 className="text-center">Konnect</h2>
                            <h5 className="card-title text-center">Sign In</h5>
                            <form className="form-signin text-center" onSubmit={onSubmit}>
                                <div class="form-label-group">
                                    <input type="text" placeholder="Enter your username" onChange={onChange} />
                                </div>
                                <Button as="input" type="submit" value="Submit" onClick={onSubmit} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default UserForm