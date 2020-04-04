import React from "react"

function MessageList(props) {
    const styles = {
        senderUsername: {
            fontWeight: 'bold',
        },
        message: { fontSize: 15 },
    }

    return <div className="message-list">
        <ul >
            {props.messages.map((message, index) => (
                <li key={index} style={styles.li}>
                    <div>
                        <span style={styles.senderUsername}>{message.senderId}</span>{' '}
                    </div>
                    <p style={styles.message}>{message.text}</p>
                </li>
            ))}
        </ul>
    </div>
}

export default MessageList