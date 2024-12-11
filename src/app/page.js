'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useCookies } from 'react-cookie'

import * as api from '@/utils/api'

import styles from './page.module.css';

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['sessionId']);

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const response = await api.post('/login', { username, password })

    if (response.errors)
      setErrorMessage(response.errors[0])
    else {
      setCookie('sessionId', undefined, { path: '/' })
      router.push('/menu')
    }
    setLoading(false)
  }

  return (
    <div className={styles.loginPage}>
      <form className={styles.card} onSubmit={onSubmit}>
        <div className={styles.inputContainer}>
          <input name='username' placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
          <input name='password' type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
          <span className={styles.errorMessage} style={{ display: errorMessage ? 'block' : 'none' }}>
            {errorMessage}
          </span>
        </div>

        <div className={styles.buttonContainer}>
          <button type='submit' disabled={loading}>Submit</button>
        </div>
      </form>
    </div>
  );
}
