import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import styles from '../styles/Register.module.css'
import {faUserAlt} from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Register</span>
        <Image
          src="/login.svg"
          alt="Picture of the author"
          width={300}
          height={300}
        />
      </div>

      <div className={styles.main}>
        <div className={styles.inputs}>
          <div className={styles.innerInput}>
            <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />
            <input type='email'  placeholder='email'/>
          </div>
          <div className={styles.innerInput}>
            <FontAwesomeIcon className={styles.icon} icon={faUserAlt} />
            <input type='name'  placeholder='name'/>
          </div>        
          <div className={styles.innerInput}>
            <FontAwesomeIcon className={styles.icon} icon={faLock} />
            <input type='text' placeholder='password'/>
          </div>
          <div className={styles.innerInput}>
            <FontAwesomeIcon className={styles.icon} icon={faLock} />
            <input type='text' placeholder='Retype password'/>
          </div>
        </div>

        <button>Register</button>
        <Link href="/">I have an account already</Link>
      </div>
    </div>
  )
}
