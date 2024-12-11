'use client'

import { useEffect, useState } from 'react'

import * as api from '@/utils/api'

import styles from './page.module.css'

export default function Chat() {
  const [newMessage, setNewMessage] = useState('')
  const [userSelect, setUserSelect] = useState('')

  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    (async () => {
      const response = await api.get('/message')

      if (response.errors)
        return router.push('/')

      setMessages(response)
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const response = await api.get('/user')

      if (response.errors)
        return router.push('/')

      setUsers(response)
    })()
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    const response = await api.post('/message', { message: newMessage, userId: userSelect })

    if (response.errors)
      setErrorMessage(response.errors[0])
    else {
      const response = await api.get('/message')

      if (response.errors)
        return router.push('/')

      setMessages(response)
    }
  }

  return (<>
    <div className={styles.chatPage}>

      {messages.map((message) => (
        <div key={message.id} className={styles.message}>
          <span>{message.message}</span>
          <br />
          <span>{message.user}</span>
          <br />
          <span>{message.createdAt}</span>
        </div>
      ))}

      <div>
        <form onSubmit={onSubmit}>
          <div className={styles.inputContainer}>
            <select name='user' value={userSelect} onChange={(e) => setUserSelect(e.target.value)}>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.nickName}
                </option>
              ))}
            </select>
            <input name='message' placeholder='Message' onChange={(e) => setNewMessage(e.target.value)} />
          </div>

          <div className={styles.buttonContainer}>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  </>)
}