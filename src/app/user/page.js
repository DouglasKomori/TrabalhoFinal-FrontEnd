'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import * as api from '@/utils/api'

import styles from './page.module.css'

export default function User() {
  const [name, setName] = useState('')
  const [nickName, setNickName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [users, setUsers] = useState([]);

  const router = useRouter()

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
    const response = await api.post('/user', { name, nickName, birthDate })

    if (response.errors)
      setErrorMessage(response.errors[0])
    else {
      const response = await api.get('/user')

      if (response.errors)
        return router.push('/')

      setUsers(response)
    }
  }

  return (<>
    <div className={styles.backContainer}>
      <Link href={'/menu'}> {'←'} Back</Link>
    </div>
    <div className={styles.userPage}>
      <div className={styles.card}>
        <h2 style={{ margin: 0, marginBottom: 10 }}>User Sign up</h2>

        <form onSubmit={onSubmit}>
          <div className={styles.inputContainer}>
            <input name='name' placeholder='Name' onChange={(e) => setName(e.target.value)} />
            <input name='nickName' placeholder='Nickname' onChange={(e) => setNickName(e.target.value)} />
            <input name='birthDate' placeholder='Birth Date' onChange={(e) => setBirthDate(e.target.value)} />
          </div>

          <div className={styles.buttonContainer}>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>

      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.name}>Name</div>
          <div className={styles.nickName}>Nickname</div>
          <div className={styles.birthDate}>Birth Date</div>
        </div>

        {users.map((user) => {
          return (
            <div key={user.id} className={styles.row}>
              <div className={styles.name}>{user.name}</div>
              <div className={styles.nickName}>{user.nickName}</div>
              <div className={styles.birthDate}>{user.birthDate}</div>
            </div>
          )
        })}
      </div>
    </div>
  </>)
}