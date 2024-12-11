import Link from 'next/link';

import styles from './page.module.css'

export default function Menu() {
  return (
    <div className={styles.menuPage}>
      <h1>Menu</h1>

      <Link href={'/user'} className={styles.button}>
        <div>User sign up</div>
      </Link>
      <Link href={'/chat'} className={styles.button}>
        <div>Chat</div>
      </Link>
    </div>
  )
}