import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import styles from '../styles/Register.module.css'
import {faUserAlt} from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Router from 'next/router'
import { api } from '../api'

const Register = () => {
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const data = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      confirmPassword: event.target.confirmPassword.value,
    }

    try {
      const response = await api.post('auth/signup', data)
      localStorage.setItem('token', response.data.access_token)
      Router.push('/list-books')
    } catch (error) {
      console.log(error)
    }
  }

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
        <form onSubmit={handleSubmit} className={styles.inputs}>
          <div className={styles.innerInput}>
            <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />
            <input type='email'  placeholder='email' name='email' />
          </div>
          <div className={styles.innerInput}>
            <FontAwesomeIcon className={styles.icon} icon={faUserAlt} />
            <input type='name'  placeholder='name' name='name'/>
          </div>        
          <div className={styles.innerInput}>
            <FontAwesomeIcon className={styles.icon} icon={faLock} />
            <input type='text' placeholder='password' name='password' />
          </div>
          <div className={styles.innerInput}>
            <FontAwesomeIcon className={styles.icon} icon={faLock} />
            <input type='text' placeholder='Retype password' name='confirmPassword' />
          </div>

          <button type='submit'>Register</button>
          <Link href="/">I have an account already</Link>
        </form>
      </div>
    </div>
  )
}

export default Register;
