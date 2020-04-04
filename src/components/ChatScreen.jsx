import React, { useEffect, useState } from 'react'
import Chatkit from '@pusher/chatkit-client'
import MessageList from './MessageList'
import SendMessage from "./SendMessage"
import TypingIndicator from './TypeIndicator'
import OnlineList from './OnlineList'
import RoomList from './RoomList'
import AddUserRoom from './AddUserRoom'
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

function ChatScreen(props) {
    const [state, setState] = useState({
        messageList: [],
        currentUser: {},
        currentRoom: {},
        usersTyping: []
    })

    const [showEmojiPicker, setShow] = useState(false)

    const chatManager = new Chatkit.ChatManager({
        instanceLocator: "v1:us1:b1d83a20-08ad-4ca4-baa6-8863f6748c2a",
        userId: props.currentUsername,
        tokenProvider: new Chatkit.TokenProvider({
            url: 'http://localhost:3001/auth',
        }),
    })

    useEffect(() => {
        chatManager
            .connect()
            .then(currentUser => {
                setState(prev => { return { ...prev, currentUser: currentUser } })
                return currentUser.subscribeToRoom({
                    roomId: currentUser.rooms[0].id,
                    messageLimit: 100,
                    hooks: {
                        onMessage: message => {
                            setState(prev => { return { ...prev, messageList: [...prev.messageList, message] } })
                        },
                        onUserStartedTyping: user => {
                            setState(prev => { return { ...prev, usersTyping: [...prev.usersTyping, user.name] } })
                        },
                        onUserStoppedTyping: user => {
                            setState(prev => {
                                return { ...prev, usersTyping: state.usersTyping.filter(u => u !== user.name) }
                            })
                        },
                        onPresenceChange: () => this.forceUpdate(),
                    }
                })
            })
            .then(currentRoom => { setState(prev => { return { ...prev, currentRoom: currentRoom } }) })
            .catch(error => console.error('error', error))
    }, [])

    function sendMessage(text) {
        state.currentUser.sendMessage({
            roomId: state.currentRoom.id,
            text: text
        })
    }

    function sendTypingEvent() {
        state.currentUser
            .isTypingIn({ roomId: state.currentRoom.id })
            .catch(error => console.error('error', error))
    }

    function changeRoom(id) {
        state.currentUser
    }

    function addUserToRoom(userId) {
        alert(userId)
        state.currentUser.addUserToRoom({
            userId: userId,
            roomId: state.currentRoom.id
        })
            .then(() => {
                console.log('Added ' + userId + " to the room")
            })
            .catch(err => {
                console.log('Failing to add')
            })
    }

    function addEmoji(emoji) {
        const newtext = `${emoji.native}`;
        sendMessage(newtext)
        setShow(false)
    }

    function toggleEmojiPicker() {
        setShow(!showEmojiPicker)

    }

    const styles = {
        container: {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
        },
        chatContainer: {
            display: 'flex',
            flex: 1,
        },
        OnlineListContainer: {
            width: '300px',
            flex: 'none',
            padding: 20,
            backgroundColor: '#2c303b',
            color: 'white',
        },
        chatListContainer: {
            padding: 20,
            width: '85%',
            display: 'flex',
            flexDirection: 'column',
        },
    }
    return (
        <div style={styles.container}>
            <div style={styles.chatContainer}>
                <aside style={styles.OnlineListContainer}>
                    <h2>Konnect</h2>
                    <RoomList rooms={state.currentUser.rooms} />
                    <OnlineList
                        currentUser={state.currentUser}
                        users={state.currentRoom.users}
                    />
                    <AddUserRoom onAddUser={addUserToRoom} />
                </aside>
                <section style={styles.chatListContainer}>
                    <TypingIndicator usersWhoAreTyping={state.usersTyping} />
                    <MessageList
                        messages={state.messageList}
                        style={styles.chatList}
                    />
                    {showEmojiPicker ? (
                        <Picker set="emojione" onSelect={addEmoji} />
                    ) : null}
                    <SendMessage onSubmit={sendMessage} onChange={sendTypingEvent} onToggleEmoji={toggleEmojiPicker} />
                </section>
            </div>
        </div>
    )
}

export default ChatScreen