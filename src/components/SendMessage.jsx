import React, { useState } from 'react';
import { Smile } from 'react-feather';
import Fab from "@material-ui/core/Fab";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

function SendMessage(props) {
    const [text, setText] = useState('')

    function onSubmit(e) {
        e.preventDefault()
        props.onSubmit(text)
        setText('')
    }

    function onChange(e) {
        setText(e.target.value)
        if (props.onChange) {
            props.onChange()
        }
    }


    const styles = {
        container: {
            padding: 20,
            borderTop: '1px #4C758F solid',
            marginBottom: 20,
        },
        form: {
            display: 'flex',
        },
        input: {
            color: 'inherit',
            background: 'none',
            outline: 'none',
            border: 'none',
            flex: 1,
            fontSize: 16,
        },
    }

    return (
        <div style={styles.container}>
            <div>
                <form onSubmit={onSubmit} style={styles.form}>
                    <Fab onClick={props.onToggleEmoji} className="toggle-emoji">
                        <Smile />
                    </Fab>
                    <input
                        type="text"
                        placeholder="Send a message"
                        onChange={onChange}
                        value={text}
                        style={styles.input}
                    />
                </form>
            </div>
        </div>
    )

}

export default SendMessage